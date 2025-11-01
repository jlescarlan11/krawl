package com.krawl.backend.service;

import com.krawl.backend.dto.response.AuthResponse;
import com.krawl.backend.dto.request.LoginRequest;
import com.krawl.backend.dto.request.RegisterRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public interface AuthenticationService {
    AuthResponse register(RegisterRequest request, HttpServletResponse response);
    AuthResponse login(LoginRequest request, HttpServletResponse response);
    
    /**
     * Refresh access token using refresh token from cookie.
     * Implements token rotation for security.
     * 
     * @param refreshToken The refresh token from cookie
     * @param response HTTP response to set new refresh token cookie
     * @return AuthResponse with new access token and user info, or empty if token invalid
     */
    Optional<AuthResponse> refreshToken(String refreshToken, HttpServletResponse response);
    
    /**
     * Logout user by revoking refresh token and blacklisting access token.
     * 
     * @param refreshToken The refresh token from cookie (optional)
     * @param accessToken The access token from Authorization header (optional)
     * @param authentication The current authentication (optional)
     * @param response HTTP response to clear refresh token cookie
     */
    void logout(String refreshToken, String accessToken, Authentication authentication, HttpServletResponse response);
}

