package com.krawl.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private UUID userId;
    private String username;
    private String email;
    private String bio;
    private BigDecimal creatorScore;
    private String reputationTier;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int gemsCreated;
    private int krawlsCreated;
}

