package application.service;

import application.model.Pet;
import application.repo.PetRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import application.DTO.AuthResponse;
import application.DTO.LoginRequest;
import application.DTO.RegisterRequest;
import application.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import application.repo.UserRepo;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PetRepo petRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> registerUser(RegisterRequest registerRequest){
        Map<String, String> response = new HashMap<>();
        if (userRepo.findByUsername(registerRequest.getUsername()) != null) {
            response.put("error", "Username already exists");
           return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            response.put("error", "Password mismatch");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        Users user = new Users();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(encoder.encode(registerRequest.getPassword()));
        user.setUserRole(registerRequest.getRole());
        userRepo.save(user);
        response.put("message", "User created Successfully.");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    public ResponseEntity<AuthResponse> loginUserAuth(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        Users user = userRepo.findByUsername(loginRequest.getUsername());
        if (user == null) {
            System.out.println("❌ User not found in database: " + loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        String token = jwtService.generateToken(user.getUsername());
        System.out.println("🔑 Login Successful: " + user.getUsername() + " | Role: " + user.getUserRole().name());
        return ResponseEntity.ok(new AuthResponse(token, user.getUserRole().name()));
    }

}