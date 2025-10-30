package com.krawl.backend.service.impl;

import com.krawl.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Example service demonstrating async processing
 * Methods annotated with @Async will run in a separate thread pool
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    
    @Override
    @Async("taskExecutor")
    public void sendEmailAsync(String to, String subject, String body) {
        log.info("Sending email to {} with subject: {}", to, subject);
        // Simulate email sending work
        try {
            Thread.sleep(100); // Simulate network delay
            log.debug("Email sent successfully to {}", to);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Email sending interrupted", e);
        }
    }
    
    @Override
    @Async("taskExecutor")
    public void sendNotificationAsync(UUID userId, String message) {
        log.info("Sending notification to user {}: {}", userId, message);
        // Simulate notification work
        try {
            Thread.sleep(50); // Simulate processing delay
            log.debug("Notification sent successfully to user {}", userId);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Notification sending interrupted", e);
        }
    }
}

