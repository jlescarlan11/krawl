package com.krawl.backend.exception;

import org.springframework.http.HttpStatus;

public abstract class KrawlException extends RuntimeException {
    
    private final String errorCode;
    
    protected KrawlException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
    
    protected KrawlException(String errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }
    
    public String getErrorCode() {
        return errorCode;
    }
    
    public abstract HttpStatus getHttpStatus();
}

