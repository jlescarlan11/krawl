package com.krawl.backend.dto;

import com.krawl.backend.dto.response.DuplicateGemResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Error response DTO for duplicate Gem conflicts.
 * Extends the standard error structure with duplicates array.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DuplicateGemErrorResponse {
    private String error;
    private String message;
    private int status;
    private LocalDateTime timestamp;
    private String path;
    private List<DuplicateGemResponse> duplicates;
    
    public DuplicateGemErrorResponse(String error, String message, int status, String path, List<DuplicateGemResponse> duplicates) {
        this.error = error;
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
        this.path = path;
        this.duplicates = duplicates;
    }
}

