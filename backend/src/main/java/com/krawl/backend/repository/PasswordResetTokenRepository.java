package com.krawl.backend.repository;

import com.krawl.backend.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser_UserId(UUID userId);
    
    /**
     * Finds an active (unused and not expired) token for a user
     */
    @Query("SELECT t FROM PasswordResetToken t WHERE t.user.userId = :userId AND t.usedAt IS NULL AND t.expiresAt > CURRENT_TIMESTAMP ORDER BY t.createdAt DESC")
    Optional<PasswordResetToken> findActiveTokenByUserId(@Param("userId") UUID userId);
}


