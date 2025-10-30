package com.krawl.backend.exception;

import org.springframework.http.HttpStatus;

public class ImageValidationException extends KrawlException {
    public ImageValidationException(String message) {
        super("VALIDATION_ERROR", message);
    }
    
    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}