package com.krawl.backend.dto.response;

import lombok.Value;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Value
public class KrawlSummaryResponse {
    String id;
    String title;
    String description;
    BigDecimal rating;
    int stopCount;
    LocalDateTime createdAt;

    public static KrawlSummaryResponse from(KrawlResponse response) {
        int count = response.getItems() == null ? 0 : response.getItems().size();
        return new KrawlSummaryResponse(
            response.getKrawlId().toString(),
            response.getTitle(),
            response.getDescription(),
            response.getAverageRating(),
            count,
            response.getCreatedAt()
        );
    }
}


