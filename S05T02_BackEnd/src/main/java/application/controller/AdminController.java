package application.controller;

import application.model.Pet;
import application.repo.PetRepo;
import application.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private PetService petService;

    @Autowired
    private PetRepo petRepo;

    @GetMapping("/pets")
    public ResponseEntity<List<Pet>> getAllPets() {
        return petService.getAllPets();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/pets/delete/{petId}")
    public ResponseEntity<String> deletePet(@PathVariable Long petId) {
        return petService.adminDeletePet(petId);
    }
}
