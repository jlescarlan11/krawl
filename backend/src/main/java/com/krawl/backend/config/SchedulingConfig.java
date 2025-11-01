package com.krawl.backend.config;

import com.krawl.backend.service.impl.TokenServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * Configuration for scheduled tasks
 */
@Slf4j
@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class SchedulingConfig {
    
    private final TokenServiceImpl tokenService;
    
    /**
     * Cleanup expired refresh tokens and blacklisted tokens daily at 2 AM
     */
    @Scheduled(cron = "0 0 2 * * *") // Run at 2:00 AM every day
    public void cleanupExpiredTokens() {
        log.info("Running scheduled token cleanup...");
        try {
            tokenService.cleanupExpiredTokens();
            log.info("Token cleanup completed successfully");
        } catch (Exception e) {
            log.error("Error during token cleanup", e);
        }
    }
}

