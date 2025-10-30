package com.krawl.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public class ImageFileValidator implements ConstraintValidator<ValidImageFile, MultipartFile> {
    
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/heic"
    );
    
    private long maxSize;
    
    @Override
    public void initialize(ValidImageFile constraintAnnotation) {
        this.maxSize = constraintAnnotation.maxSize();
    }
    
    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null || file.isEmpty()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("File is required and cannot be empty")
                   .addConstraintViolation();
            return false;
        }
        
        // Check file size
        if (file.getSize() > maxSize) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                String.format("File size exceeds maximum allowed size of %dMB", maxSize / (1024 * 1024))
            ).addConstraintViolation();
            return false;
        }
        
        // Check content type
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                "Unsupported image format. Allowed: JPEG, PNG, WebP, HEIC"
            ).addConstraintViolation();
            return false;
        }
        
        return true;
    }
}

