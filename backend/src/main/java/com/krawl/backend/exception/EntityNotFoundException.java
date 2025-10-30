package com.krawl.backend.exception;

import org.springframework.http.HttpStatus;

public class EntityNotFoundException extends KrawlException {
    public EntityNotFoundException(String entityName, Object id) {
        super("ENTITY_NOT_FOUND", String.format("%s with id %s not found", entityName, id));
    }
    
    public EntityNotFoundException(String message) {
        super("ENTITY_NOT_FOUND", message);
    }
    
    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }
}

