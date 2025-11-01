package com.krawl.backend.service;

import com.krawl.backend.dto.request.LoginRequest;
import com.krawl.backend.dto.request.RegisterRequest;
import com.krawl.backend.dto.response.AuthResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {
    AuthResponse register(RegisterRequest request, HttpServletResponse response);
    AuthResponse login(LoginRequest request, HttpServletResponse response);
}

