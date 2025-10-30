package com.krawl.backend.exception;

import org.springframework.http.HttpStatus;

public class ConflictException extends KrawlException {
    public ConflictException(String message) {
        super("CONFLICT", message);
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.CONFLICT;
    }
}


