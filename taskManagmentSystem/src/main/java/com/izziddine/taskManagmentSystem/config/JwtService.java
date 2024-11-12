package com.izziddine.taskManagmentSystem.config;

import com.izziddine.taskManagmentSystem.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final static String SECRET_KEY = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

    public String extractUserName (String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", ((User) userDetails).getRole().name());
        claims.put("userId" , ((User) userDetails).getId());
        return generateToken(claims, userDetails);
    }

    public String generateToken (Map<String, Object> extraClaims , UserDetails user ) { // to generate token with an extra claims

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(getSignInKey())
                .compact();
    }

    public <T> T extractClaim (String token, Function<Claims , T> claimsResolver) {
        return claimsResolver.apply(extractAllClaims(token));
    }

    public boolean isTokenValid (String token , UserDetails user) {

        final String username = extractUserName(token);
        return username.equals(user.getUsername()) && !isTokenExpired(token);
    }

    private  boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private  Date extractExpiration (String token) {
        return extractClaim(token , Claims::getExpiration);
    }

    private Claims extractAllClaims (String token) { // JWTs consist of a payload that holds claims, which are pieces of information (key-value pairs) about a user or entity.

        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private static Key getSignInKey() {

        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes) ;
    }
}

