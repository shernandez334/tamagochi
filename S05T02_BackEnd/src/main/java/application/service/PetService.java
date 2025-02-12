package application.service;

import java.util.*;
import application.model.Pet;
import application.model.UserPrincipal;
import application.model.Users;
import application.repo.PetRepo;
import application.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        return (principal instanceof UserPrincipal userPrincipal) ? userPrincipal.getUser() : null;
    }

    public ResponseEntity<List<Pet>> showUserPets(String token){
        Users user = getAuthenticatedUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        List<Pet> pets = petRepo.findByOwnerId(user.getId());
        return ResponseEntity.ok(pets);
    }
}