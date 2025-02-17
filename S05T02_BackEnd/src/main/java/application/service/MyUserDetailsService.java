package application.service;

import application.model.UserPrincipal;
import application.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import application.repo.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepo.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found: " + username); // ✅ Handle null case
        }

        System.out.println("✅ Loaded User: " + user.getUsername() + " with role: " + user.getUserRole()); // Debugging Line

        return User.withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getUserRole().name()) // ✅ Convert Enum to String
                .build();
    }
}