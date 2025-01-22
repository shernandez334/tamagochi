package application.service;

import io.jsonwebtoken.Jwts;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class JWTService {

    public ResponseEntity<String> generateToken() {
        Map<String, Object> claims = new HashMap<>();
        return Jwts
    }
}
