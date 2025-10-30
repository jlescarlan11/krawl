package com.krawl.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KrawlResponse {
    private UUID krawlId;
    private String title;
    private String description;
    private UUID creatorId;
    private String creatorUsername;
    private BigDecimal creatorScore;
    private String visibility;
    private BigDecimal averageRating;
    private Integer ratingCount;
    private List<KrawlItemResponse> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class KrawlItemResponse {
        private UUID krawlItemId;
        private UUID gemId;
        private String gemName;
        private Integer stepOrder;
        private String creatorNote;
        private String lokalSecret;
    }
}

