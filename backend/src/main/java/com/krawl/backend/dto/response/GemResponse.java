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
public class GemResponse {
    private UUID gemId;
    private String name;
    private String description;
    private Double latitude;
    private Double longitude;
    private UUID founderId;
    private String founderUsername;
    private Integer vouchCount;
    private BigDecimal averageRating;
    private Integer ratingCount;
    private String approvalStatus;
    private String lifecycleStatus;
    private LocalDateTime lastVerifiedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

