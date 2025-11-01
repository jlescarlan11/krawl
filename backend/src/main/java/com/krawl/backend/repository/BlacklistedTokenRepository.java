package com.krawl.backend.repository;

import com.krawl.backend.entity.BlacklistedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.UUID;

@Repository
public interface BlacklistedTokenRepository extends JpaRepository<BlacklistedToken, UUID> {
    
    /**
     * Check if an access token is blacklisted (revoked)
     */
    boolean existsByTokenHash(String tokenHash);
    
    /**
     * Delete expired blacklisted tokens (for cleanup)
     */
    @Modifying
    @Query("DELETE FROM BlacklistedToken b WHERE b.expiresAt < :now")
    void deleteByExpiresAtBefore(LocalDateTime now);
}

