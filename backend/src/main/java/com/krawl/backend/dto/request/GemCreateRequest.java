package com.krawl.backend.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class GemCreateRequest {
    
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
    private String name;
    
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;
    
    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;
    
    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;
    
    @Size(max = 10, message = "Cannot have more than 10 tags")
    private List<@Size(min = 1, max = 100, message = "Each tag must be between 1 and 100 characters") String> tags;
    
    /**
     * Flag to override duplicate detection.
     * When true, allows creation even if duplicates are found within the radius.
     */
    private Boolean overrideDuplicate = false;
    
    /**
     * Optional reason provided when overriding duplicate detection.
     */
    @Size(max = 500, message = "Override reason must not exceed 500 characters")
    private String overrideReason;
}

