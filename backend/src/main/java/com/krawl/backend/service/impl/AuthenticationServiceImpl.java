package com.krawl.backend.service.impl;

import com.krawl.backend.config.properties.JwtProperties;
import com.krawl.backend.dto.request.LoginRequest;
import com.krawl.backend.dto.request.RegisterRequest;
import com.krawl.backend.dto.response.AuthResponse;
import com.krawl.backend.entity.User;
import com.krawl.backend.exception.ConflictException;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.security.JwtTokenProvider;
import com.krawl.backend.security.UserPrincipal;
import com.krawl.backend.service.AuthenticationService;
import com.krawl.backend.service.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final TokenService tokenService;
    private final JwtProperties jwtProperties;
    
    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request, HttpServletResponse response) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email already registered");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ConflictException("Username already taken");
        }
        
        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        
        user = userRepository.save(user);
        
        // Generate JWT token
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userPrincipal, null, userPrincipal.getAuthorities());
        String accessToken = tokenProvider.generateToken(authentication);
        
        // Generate refresh token
        String refreshToken = tokenService.generateRefreshToken(user.getUserId());
        
        // Set HttpOnly cookie with refresh token
        setRefreshTokenCookie(response, refreshToken);
        
        return new AuthResponse(
                accessToken,
                "Bearer",
                user.getUserId(),
                user.getEmail(),
                user.getUsername()
        );
    }
    
    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmailOrUsername(),
                        request.getPassword()
                )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String accessToken = tokenProvider.generateToken(authentication);
        
        // Generate refresh token
        String refreshToken = tokenService.generateRefreshToken(userPrincipal.getUserId());
        
        // Set HttpOnly cookie with refresh token
        setRefreshTokenCookie(response, refreshToken);
        
        return new AuthResponse(
                accessToken,
                "Bearer",
                userPrincipal.getUserId(),
                userPrincipal.getEmail(),
                userPrincipal.getUsername()
        );
    }
    
    /**
     * Set refresh token as HttpOnly cookie
     * Secure flag is controlled by jwt.cookie-secure property (true in production, false in dev)
     */
    private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie("refresh_token", refreshToken);
        cookie.setHttpOnly(true);
        // Use configuration: false for local dev (HTTP), true for production (HTTPS)
        cookie.setSecure(jwtProperties.isCookieSecure());
        cookie.setPath("/api/v1/auth"); // Limit cookie scope to auth endpoints
        cookie.setMaxAge(30 * 24 * 60 * 60); // 30 days in seconds
        cookie.setAttribute("SameSite", "Lax"); // CSRF protection
        response.addCookie(cookie);
    }
}

