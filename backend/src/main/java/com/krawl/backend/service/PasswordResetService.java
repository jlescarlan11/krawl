package com.krawl.backend.service;

public interface PasswordResetService {
    void requestReset(String email);
    void resetPassword(String token, String newPassword);
}


