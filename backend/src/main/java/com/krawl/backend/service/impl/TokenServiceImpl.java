package com.krawl.backend.service.impl;

import com.krawl.backend.config.properties.JwtProperties;
import com.krawl.backend.entity.BlacklistedToken;
import com.krawl.backend.entity.RefreshToken;
import com.krawl.backend.entity.User;
import com.krawl.backend.repository.BlacklistedTokenRepository;
import com.krawl.backend.repository.RefreshTokenRepository;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.security.JwtTokenProvider;
import com.krawl.backend.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
    
    private final RefreshTokenRepository refreshTokenRepository;
    private final BlacklistedTokenRepository blacklistedTokenRepository;
    private final UserRepository userRepository;
    private final JwtProperties jwtProperties;
    private final JwtTokenProvider tokenProvider;
    private final SecureRandom secureRandom = new SecureRandom();
    
    /**
     * Generate a cryptographically secure random token
     */
    private String generateSecureToken() {
        // Combine UUID with secure random for extra entropy
        String uuid = UUID.randomUUID().toString().replace("-", "");
        long randomLong = secureRandom.nextLong();
        return uuid + Long.toHexString(randomLong);
    }
    
    /**
     * Hash a token using SHA-256 for secure storage
     */
    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }
    
    @Override
    @Transactional
    public String generateRefreshToken(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        // Generate secure token
        String token = generateSecureToken();
        String tokenHash = hashToken(token);
        
        // Create and save refresh token entity
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setTokenHash(tokenHash);
        refreshToken.setExpiresAt(LocalDateTime.now().plusSeconds(jwtProperties.getRefreshExpiration() / 1000));
        refreshToken.setCreatedAt(LocalDateTime.now());
        refreshToken.setLastUsedAt(LocalDateTime.now());
        
        refreshTokenRepository.save(refreshToken);
        
        log.debug("Generated refresh token for user: {}", userId);
        return token; // Return plain token (to be stored in HttpOnly cookie)
    }
    
    @Override
    @Transactional
    public Optional<String> validateAndRotateRefreshToken(String refreshToken) {
        String tokenHash = hashToken(refreshToken);
        
        Optional<RefreshToken> storedTokenOpt = refreshTokenRepository.findByTokenHash(tokenHash);
        
        if (storedTokenOpt.isEmpty()) {
            log.warn("Refresh token not found in database");
            return Optional.empty();
        }
        
        RefreshToken storedToken = storedTokenOpt.get();
        
        // Check if token is active
        if (!storedToken.isActive()) {
            log.warn("Refresh token is not active (revoked or expired) for user: {}", 
                    storedToken.getUser().getUserId());
            return Optional.empty();
        }
        
        // Token rotation: delete old token
        refreshTokenRepository.delete(storedToken);
        
        // Generate new refresh token
        UUID userId = storedToken.getUser().getUserId();
        String newToken = generateSecureToken();
        String newTokenHash = hashToken(newToken);
        
        RefreshToken newRefreshToken = new RefreshToken();
        newRefreshToken.setUser(storedToken.getUser());
        newRefreshToken.setTokenHash(newTokenHash);
        newRefreshToken.setExpiresAt(LocalDateTime.now().plusSeconds(jwtProperties.getRefreshExpiration() / 1000));
        newRefreshToken.setCreatedAt(LocalDateTime.now());
        newRefreshToken.setLastUsedAt(LocalDateTime.now());
        
        refreshTokenRepository.save(newRefreshToken);
        
        log.debug("Rotated refresh token for user: {}", userId);
        return Optional.of(newToken);
    }
    
    @Override
    @Transactional
    public void revokeRefreshToken(String refreshToken) {
        String tokenHash = hashToken(refreshToken);
        refreshTokenRepository.findByTokenHash(tokenHash).ifPresent(token -> {
            token.setRevokedAt(LocalDateTime.now());
            refreshTokenRepository.save(token);
            log.debug("Revoked refresh token for user: {}", token.getUser().getUserId());
        });
    }
    
    @Override
    @Transactional
    public void revokeAllUserTokens(UUID userId) {
        List<RefreshToken> tokens = refreshTokenRepository.findByUser_UserIdAndRevokedAtIsNull(userId);
        
        LocalDateTime now = LocalDateTime.now();
        tokens.forEach(token -> token.setRevokedAt(now));
        refreshTokenRepository.saveAll(tokens);
        
        log.info("Revoked all {} refresh token(s) for user: {}", tokens.size(), userId);
    }
    
    @Override
    @Transactional
    public void blacklistAccessToken(String accessToken, UUID userId, String reason) {
        try {
            // Extract expiry from JWT token
            Claims claims = Jwts.parser()
                    .verifyWith(tokenProvider.getSigningKey())
                    .build()
                    .parseSignedClaims(accessToken)
                    .getPayload();
            
            Date expiry = claims.getExpiration();
            
            // Create blacklist entry
            BlacklistedToken blacklisted = new BlacklistedToken();
            blacklisted.setTokenHash(hashToken(accessToken));
            blacklisted.setUserId(userId);
            blacklisted.setExpiresAt(expiry.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime());
            blacklisted.setReason(reason);
            blacklisted.setRevokedAt(LocalDateTime.now());
            
            blacklistedTokenRepository.save(blacklisted);
            
            log.debug("Blacklisted access token for user: {} (reason: {})", userId, reason);
        } catch (Exception e) {
            log.warn("Failed to blacklist token (may be expired or invalid): {}", e.getMessage());
        }
    }
    
    @Override
    public boolean isAccessTokenBlacklisted(String accessToken) {
        String tokenHash = hashToken(accessToken);
        return blacklistedTokenRepository.existsByTokenHash(tokenHash);
    }
    
    @Override
    public Optional<UUID> getUserIdFromRefreshToken(String tokenHash) {
        return refreshTokenRepository.findByTokenHash(tokenHash)
                .map(token -> token.getUser().getUserId());
    }
    
    /**
     * Cleanup expired tokens (to be called by scheduled task)
     */
    @Transactional
    public void cleanupExpiredTokens() {
        LocalDateTime now = LocalDateTime.now();
        
        refreshTokenRepository.deleteByExpiresAtBefore(now);
        blacklistedTokenRepository.deleteByExpiresAtBefore(now);
        
        log.info("Cleaned up expired refresh tokens and blacklisted tokens");
    }
}

