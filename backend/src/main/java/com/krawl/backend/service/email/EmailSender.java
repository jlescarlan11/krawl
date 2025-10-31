package com.krawl.backend.service.email;

public interface EmailSender {
    void sendEmailAsync(String to, String subject, String body);
}


