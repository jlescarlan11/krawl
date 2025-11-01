package com.krawl.backend.util;

import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * Utility class for generating cryptographically secure tokens and hashing tokens.
 * Uses SecureRandom for cryptographic security and Base64 URL-safe encoding.
 */
@Component
public class TokenGenerator {
    
    private static final int DEFAULT_TOKEN_BYTES = 32;
    private final SecureRandom secureRandom = new SecureRandom();
    
    /**
     * Generate a cryptographically secure random token.
     * Uses SecureRandom to generate random bytes and encodes them as Base64 URL-safe string.
     * 
     * @param byteLength Length in bytes (default: 32 bytes = 256 bits)
     * @return Base64 URL-safe encoded token (without padding)
     */
    public String generateSecureToken(int byteLength) {
        byte[] bytes = new byte[byteLength];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
    
    /**
     * Generate a cryptographically secure random token with default length (32 bytes).
     * 
     * @return Base64 URL-safe encoded token (without padding)
     */
    public String generateSecureToken() {
        return generateSecureToken(DEFAULT_TOKEN_BYTES);
    }
    
    /**
     * Hash a token using SHA-256 for secure storage.
     * This is used to store tokens in the database without storing the plain token.
     * 
     * @param token The plain token to hash
     * @return Base64-encoded SHA-256 hash of the token
     * @throws RuntimeException if SHA-256 algorithm is not available (should never happen)
     */
    public String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }
}

