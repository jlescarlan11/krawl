package com.krawl.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Response DTO for duplicate Gem detection.
 * Contains information about a potentially duplicate Gem found near the requested location.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DuplicateGemResponse {
    private UUID gemId;
    private String name;
    private Double distanceMeters;
    private String founderUsername;
    private Integer vouchCount;
    private BigDecimal averageRating;
}

