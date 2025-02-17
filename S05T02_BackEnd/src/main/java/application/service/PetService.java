package application.service;

import java.util.*;
import application.model.Pet;
import application.model.UserPrincipal;
import application.model.Users;
import application.repo.PetRepo;
import application.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PetRepo petRepo;

    @Autowired
    private JWTService jwtService;

    private static final List<String> COLORS = Arrays.asList("red", "blue", "green", "yellow", "purple");

    private String getRandomColor() {
        Random random = new Random();
        return COLORS.get(random.nextInt(COLORS.size()));
    }

    public ResponseEntity<?> createPet(String petName) {
        Users user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        Pet pet = new Pet();
        pet.setName(petName);
        pet.setColor(getRandomColor());
        pet.setOwnerId(user.getId());
        pet.setEnergy(100);
        petRepo.save(pet);
        return ResponseEntity.ok("Pet created for user: " + user.getUsername());
    }

    private Users getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserPrincipal userPrincipal) {
            return userPrincipal.getUser();
        }

        // 🛑 If SecurityContextHolder is empty, try extracting user from JWT
        return null;
    }


    public ResponseEntity<List<Pet>> showUserPets(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String jwt = token.substring(7); // Remove "Bearer " prefix
        String username = jwtService.extractUsername(jwt); // Extract username from JWT
        Users user = userRepo.findByUsername(username);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        List<Pet> pets = petRepo.findByOwnerId(user.getId());
        return ResponseEntity.ok(pets);
    }

    @Transactional
    public ResponseEntity<String> updatePetEnergy(Long petId, String action) {
        Pet pet = petRepo.findById(petId).orElse(null);
        if (pet == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found");
        }
        switch (action.toLowerCase()) {
            case "sleep":
                pet.setEnergy(100);
                break;
            case "play":
                pet.setEnergy(Math.max(0, pet.getEnergy() - 15));
                break;
            case "feed":
                pet.setEnergy(Math.min(100, pet.getEnergy() + 20));
                break;
            default:
                return ResponseEntity.badRequest().body("Invalid action");
        }
        petRepo.save(pet);
        return ResponseEntity.ok("Updated energy: " + pet.getEnergy());
    }

    @Transactional
    public ResponseEntity<String> deletePet(Long petId, String token) {
        Users user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        Pet pet = petRepo.findById(petId).orElse(null);
        if (pet == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found");
        }
        if (!pet.getOwnerId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only delete your own pets.");
        }
        petRepo.deleteById(petId);
        return ResponseEntity.ok("Pet deleted successfully");
    }

    public ResponseEntity<List<Pet>> getAllPets() {
        List<Pet> pets = petRepo.findAll();
        System.out.println("🔥 Fetching all pets from SQL: " + pets);
        return ResponseEntity.ok(pets);
    }

    @Transactional
    public ResponseEntity<String> adminDeletePet(Long petId) {
        if (!petRepo.existsById(petId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found");
        }
        petRepo.deleteById(petId);
        return ResponseEntity.ok("Pet deleted successfully by admin");
    }
}