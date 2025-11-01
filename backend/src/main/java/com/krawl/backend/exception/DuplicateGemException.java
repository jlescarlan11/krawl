package com.krawl.backend.exception;

import com.krawl.backend.dto.response.DuplicateGemResponse;

import java.util.List;

/**
 * Exception thrown when a duplicate Gem is detected during creation.
 * Extends ConflictException to return 409 status code.
 */
public class DuplicateGemException extends ConflictException {
    
    private final List<DuplicateGemResponse> duplicates;
    
    public DuplicateGemException(String message, List<DuplicateGemResponse> duplicates) {
        super(message);
        this.duplicates = duplicates;
    }
    
    public List<DuplicateGemResponse> getDuplicates() {
        return duplicates;
    }
}

