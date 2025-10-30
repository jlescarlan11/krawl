package com.krawl.backend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class GemUpdateRequest {
    
    @Size(max = 255, message = "Name must not exceed 255 characters")
    private String name;
    
    @Size(max = 5000, message = "Description must not exceed 5000 characters")
    private String description;
    
    private Double latitude;
    
    private Double longitude;
}

