package com.krawl.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageUploadResponse {
    private String url;
    private String message;
    private String publicId; // Useful for tracking
    
    public ImageUploadResponse(String url, String message) {
        this.url = url;
        this.message = message;
    }
}