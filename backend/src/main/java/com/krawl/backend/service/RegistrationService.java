package com.krawl.backend.service;

import com.krawl.backend.dto.response.AuthResponse;

public interface RegistrationService {
    void requestRegistration(String username, String email, String captchaToken, String remoteIp);
    AuthResponse completeRegistration(String token, String password);
}


