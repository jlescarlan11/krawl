package com.krawl.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "token_blacklist")
@Data
public class BlacklistedToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "token_id", updatable = false, nullable = false)
    private UUID tokenId;

    @Column(name = "token_hash", nullable = false, unique = true, length = 255)
    private String tokenHash; // SHA-256 hash of the access token

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt; // When the token naturally expires

    @Column(name = "revoked_at", nullable = false)
    private LocalDateTime revokedAt = LocalDateTime.now();

    @Column(name = "reason", length = 50)
    private String reason; // logout, password_change, security_breach
}

