package com.krawl.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class KrawlCreateRequest {
    
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;
    
    @Size(max = 5000, message = "Description must not exceed 5000 characters")
    private String description;
    
    @NotNull(message = "Visibility is required")
    private String visibility; // "public" or "private"
    
    @NotNull(message = "Gem IDs are required")
    @Size(min = 1, message = "At least one gem must be included")
    private List<UUID> gemIds;
    
    private List<String> creatorNotes; // Optional notes for each gem
    private List<String> lokalSecrets; // Optional secrets for each gem
}

