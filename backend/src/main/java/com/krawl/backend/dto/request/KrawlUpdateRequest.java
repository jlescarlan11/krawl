package com.krawl.backend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class KrawlUpdateRequest {
    
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;
    
    @Size(max = 5000, message = "Description must not exceed 5000 characters")
    private String description;
    
    private String visibility; // "public" or "private"
    
    private List<UUID> gemIds;
    
    private List<String> creatorNotes;
    private List<String> lokalSecrets;
}

