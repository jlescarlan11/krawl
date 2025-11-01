package com.krawl.backend.service;

import java.util.Optional;
import java.util.UUID;

/**
 * Service for managing refresh tokens and access token blacklist
 */
public interface TokenService {
    
    /**
     * Generate a new refresh token for a user
     * @param userId The user ID
     * @return The plain refresh token (to be stored in HttpOnly cookie)
     */
    String generateRefreshToken(UUID userId);
    
    /**
     * Validate a refresh token and rotate it (generate a new one)
     * @param refreshToken The plain refresh token
     * @return Optional containing the new refresh token if valid, empty otherwise
     */
    Optional<String> validateAndRotateRefreshToken(String refreshToken);
    
    /**
     * Revoke a specific refresh token
     * @param refreshToken The plain refresh token to revoke
     */
    void revokeRefreshToken(String refreshToken);
    
    /**
     * Revoke all refresh tokens for a user (force logout all sessions)
     * @param userId The user ID
     */
    void revokeAllUserTokens(UUID userId);
    
    /**
     * Blacklist an access token (mark as revoked until natural expiry)
     * @param accessToken The JWT access token
     * @param userId The user ID
     * @param reason The reason for blacklisting (logout, password_change, security_breach)
     */
    void blacklistAccessToken(String accessToken, UUID userId, String reason);
    
    /**
     * Check if an access token is blacklisted
     * @param accessToken The JWT access token
     * @return true if blacklisted, false otherwise
     */
    boolean isAccessTokenBlacklisted(String accessToken);
    
    /**
     * Get user ID from a refresh token hash
     * @param tokenHash The hashed refresh token
     * @return Optional containing the user ID if found
     */
    Optional<UUID> getUserIdFromRefreshToken(String tokenHash);
}

