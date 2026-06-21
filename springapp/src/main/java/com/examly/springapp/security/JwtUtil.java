package com.examly.springapp.security;

import java.nio.charset.StandardCharsets;

import java.security.Key;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

import io.jsonwebtoken.security.Keys;

@Component

public class JwtUtil {

    private final String SECRET = "YourVeryLongSecureSecretKeyHere1234567890";

    private Key getSigningKey() {

        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    }

    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    public String generateToken(String email, String role) {

        return Jwts.builder()

                .setSubject(email)

                .claim("role", role)

                .setIssuedAt(new Date())

                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))

                .signWith(getSigningKey(), SignatureAlgorithm.HS256)

                .compact();

    }

    public String extractEmail(String token) {

        return Jwts.parser()

                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

    }
    public String extractRole(String token) {
        return (String) Jwts.parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody()
                .get("role");
    }

    public boolean validateToken(String token) {

        try {

            Jwts.parser().setSigningKey(getSigningKey()).parseClaimsJws(token);

            return true;

        } catch (JwtException | IllegalArgumentException e) {

            return false;

        }

    }

}

// package com.examly.springapp.security;

// import java.nio.charset.StandardCharsets;
// import java.util.Date;

// import org.springframework.stereotype.Component;

// import io.jsonwebtoken.JwtException;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.security.Keys;
// import java.security.*;
// @Component
// public class JwtUtil {
//     // private final String SECRET = "SecretKeyForJWT"; // keep in application.properties
//     private final String SECRET = "YourVeryLongSecureSecretKeyHere12345";
//     private Key getSigningKey() {
//             return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
//     }
//     private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour
//     public String generateToken(String email) {
//         return Jwts.builder()
//                 .setSubject(email)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
//                 .signWith(getSigningKey(), SignatureAlgorithm.HS256)
//                 .compact();
//     }
//     public String extractEmail(String token) {
//         return Jwts.parser()
//             .setSigningKey(getSigningKey())  // use same signing key as generateToken
//             .parseClaimsJws(token)
//             .getBody()
//              .getSubject();
//     }
//     public boolean validateToken(String token) {
//         try {
//             Jwts.parser()
//             .setSigningKey(getSigningKey())   // same fix here
//             .parseClaimsJws(token);
//             return true;
//         } catch (JwtException | IllegalArgumentException e) {
//             return false;
//         }
//     }
// }




