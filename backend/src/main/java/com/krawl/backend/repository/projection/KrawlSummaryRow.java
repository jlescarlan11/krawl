package com.krawl.backend.repository.projection;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public interface KrawlSummaryRow {
    UUID getKrawlId();
    String getTitle();
    String getDescription();
    BigDecimal getAverageRating();
    LocalDateTime getCreatedAt();
    long getItemCount();
}


