package com.krawl.backend.service;

import java.util.UUID;

public interface NotificationService {
    void sendEmailAsync(String to, String subject, String body);
    void sendNotificationAsync(UUID userId, String message);
}

