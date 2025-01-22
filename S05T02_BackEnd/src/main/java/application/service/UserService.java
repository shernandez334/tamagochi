package application.service;

import application.DTO.LoginRequest;
import application.DTO.RegisterRequest;
import application.model.UserPrincipal;
import application.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import application.repo.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public ResponseEntity<String> registerUser(RegisterRequest registerRequest){
        if (userRepo.findByUsername(registerRequest.getUsername()) != null) {
            throw new IllegalArgumentException("Username already exists");
        }
        Users user = new Users();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(encoder.encode(registerRequest.getPassword()));
        user.setUserRole(registerRequest.getRole());
        userRepo.save(user);
        return ResponseEntity.ok("User created successfully.");
    }

    public ResponseEntity<String> loginUserAuth(LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        if (authentication.isAuthenticated()){
            return ResponseEntity.ok(jwtService.generateToken(loginRequest.getUsername()));
        }
        return ResponseEntity.ok("Login successful");
    }
}