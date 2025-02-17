package application.controller;

import application.DTO.AuthResponse;
import application.DTO.LoginRequest;
import application.DTO.RegisterRequest;
import application.model.Pet;
import application.service.JWTService;
import application.service.PetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import application.service.UserService;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PetService petService;


    @PostMapping("/register")
    public ResponseEntity<?> register( @Valid @RequestBody RegisterRequest registerRequest){
        System.out.println("Received Register Request: " + registerRequest);
        return userService.registerUser(registerRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        return userService.loginUserAuth(loginRequest);
    }
}