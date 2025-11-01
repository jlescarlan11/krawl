package com.krawl.backend.repository;

import com.krawl.backend.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    
    /**
     * Find a refresh token by its hash
     */
    Optional<RefreshToken> findByTokenHash(String tokenHash);
    
    /**
     * Find all active (non-revoked) refresh tokens for a user
     */
    List<RefreshToken> findByUser_UserIdAndRevokedAtIsNull(UUID userId);
    
    /**
     * Delete all refresh tokens for a specific user (for force logout)
     */
    void deleteByUser_UserId(UUID userId);
    
    /**
     * Delete expired refresh tokens (for cleanup)
     */
    @Modifying
    @Query("DELETE FROM RefreshToken r WHERE r.expiresAt < :now")
    void deleteByExpiresAtBefore(LocalDateTime now);
}

