package application.controller;

import application.model.Pet;
import application.service.PetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
public class PetController {
    @Autowired
    private PetService petService;

    @Operation(summary = "Create a new pet")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pet created successfully",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PostMapping("/create")
    public ResponseEntity<?> createPet(@RequestBody Map<String, String> requestBody) {
        String petName = requestBody.get("name");
        return petService.createPet(petName);
    }

    @Operation(summary = "Get user's pets")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of user's pets",
                    content = @Content(schema = @Schema(implementation = Pet.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @GetMapping("/pets")
    public ResponseEntity<List<Pet>> showPets(@RequestHeader("Authorization") String token) {
        return petService.showUserPets(token);
    }

    @Operation(summary = "Update pet energy")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Energy updated successfully",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Invalid action",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PatchMapping("/pets/{petId}/energy")
    public ResponseEntity<String> updatePetEnergy(@PathVariable Long petId, @RequestBody Map<String, String> requestBody) {
        String action = requestBody.get("action");
        return petService.updatePetEnergy(petId, action);
    }

    @Operation(summary = "Delete a pet")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pet deleted successfully",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @DeleteMapping("/pets/{petId}")
    public ResponseEntity<String> deletePet(@PathVariable Long petId, @RequestHeader("Authorization") String token) {
        return petService.deletePet(petId, token);
    }
}