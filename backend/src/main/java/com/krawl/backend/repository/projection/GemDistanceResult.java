package com.krawl.backend.repository.projection;

import java.util.UUID;

/**
 * Projection interface for query results containing Gem data with calculated distance.
 * Used for duplicate detection queries.
 */
public interface GemDistanceResult {
    UUID getGemId();
    String getName();
    Double getDistanceMeters();
    UUID getFounderId();
    String getFounderUsername();
    Integer getVouchCount();
    java.math.BigDecimal getAverageRating();
}

