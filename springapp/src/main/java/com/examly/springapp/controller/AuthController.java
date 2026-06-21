package com.examly.springapp.controller;

import java.util.Map;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.security.JwtUtil;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin("https://8081-ebaffeacfcebafafebfbfcfecadfebceccbf.premiumproject.examly.io")
public class AuthController {
    @Value("${admin.secret.key}")
    private String adminSecretKey;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String username = request.get("username");
        String role = request.get("role"); // "ADMIN" or "USER"
        String adminKey = request.get("adminKey"); // Only required for admin
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        User.Role userRole = User.Role.USER;
        if ("ADMIN".equalsIgnoreCase(role)) {
            if (!adminSecretKey.equals(adminKey)) { 
                return ResponseEntity.status(403).body("Invalid admin key");
            }
        userRole = User.Role.ADMIN;
        }

    User user = new User();
    user.setEmail(email);
    user.setUsername(username);
    user.setPassword(passwordEncoder.encode(password));
    user.setRole(userRole);
    userRepository.save(user);
    return ResponseEntity.ok("User registered successfully");
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        String adminKey = loginData.get("adminKey");
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty())
            return ResponseEntity.status(401).body("User not found");
        User user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword()))
            return ResponseEntity.status(401).body("Invalid credentials");
        if (user.getRole() == User.Role.ADMIN && !adminSecretKey.equals(adminKey))
            return ResponseEntity.status(403).body("Invalid admin key");
        String token = jwtUtil.generateToken(email, user.getRole().name());
        return ResponseEntity.ok(Map.of(
                "token", token,
                "name", user.getUsername(),
                "email", user.getEmail(),
                "role", user.getRole()));
    }
}
