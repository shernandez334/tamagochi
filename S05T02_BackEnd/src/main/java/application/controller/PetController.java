package application.controller;

import application.model.Pet;
import application.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PetController {
    @Autowired
    private PetService petService;

    @PostMapping("/create")
    public ResponseEntity<?> createPet(@RequestBody String petName){
        return petService.createPet(petName);
    }

    @GetMapping("/pets")
    public ResponseEntity<List<Pet>> showPets(@RequestHeader("Authorization") String token) {
        return petService.showUserPets(token);
    }
}
