package application.controller;

import application.model.Pet;
import application.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
public class PetController {
    @Autowired
    private PetService petService;

    @PostMapping("/create")
    public ResponseEntity<?> createPet(@RequestBody Map<String, String> requestBody) {
        String petName = requestBody.get("name");
        return petService.createPet(petName);
    }

    @GetMapping("/pets")
    public ResponseEntity<List<Pet>> showPets(@RequestHeader("Authorization") String token) {
        return petService.showUserPets(token);
    }

    @PatchMapping("/pets/{petId}/energy")
    public ResponseEntity<String> updatePetEnergy(@PathVariable Long petId, @RequestBody Map<String, String> requestBody) {
        String action = requestBody.get("action");
        return petService.updatePetEnergy(petId, action);
    }

    @DeleteMapping("/pets/{petId}")
    public ResponseEntity<String> deletePet(@PathVariable Long petId, @RequestHeader("Authorization") String token) {
        return petService.deletePet(petId, token);
    }
}