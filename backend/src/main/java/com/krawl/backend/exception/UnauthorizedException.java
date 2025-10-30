package com.krawl.backend.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends KrawlException {
    public UnauthorizedException(String message) {
        super("UNAUTHORIZED", message);
    }
    
    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.UNAUTHORIZED;
    }
}

