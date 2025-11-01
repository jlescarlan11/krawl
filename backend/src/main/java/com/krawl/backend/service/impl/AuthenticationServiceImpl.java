package com.krawl.backend.service.impl;

import com.krawl.backend.dto.request.LoginRequest;
import com.krawl.backend.dto.request.RegisterRequest;
import com.krawl.backend.dto.response.AuthResponse;
import com.krawl.backend.entity.RefreshToken;
import com.krawl.backend.entity.User;
import com.krawl.backend.exception.ConflictException;
import com.krawl.backend.repository.RefreshTokenRepository;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.security.JwtTokenProvider;
import com.krawl.backend.security.UserPrincipal;
import com.krawl.backend.service.AuthenticationService;
import com.krawl.backend.service.TokenService;
import com.krawl.backend.util.CookieHelper;
import com.krawl.backend.util.TokenGenerator;
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

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final TokenService tokenService;
    private final CookieHelper cookieHelper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TokenGenerator tokenGenerator;
    
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
        cookieHelper.setRefreshTokenCookie(response, refreshToken);
        
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
        cookieHelper.setRefreshTokenCookie(response, refreshToken);
        
        return new AuthResponse(
                accessToken,
                "Bearer",
                userPrincipal.getUserId(),
                userPrincipal.getEmail(),
                userPrincipal.getUsername()
        );
    }
    
    @Override
    @Transactional(readOnly = true)
    public Optional<AuthResponse> refreshToken(String refreshToken, HttpServletResponse response) {
        if (refreshToken == null) {
            cookieHelper.clearRefreshTokenCookie(response);
            return Optional.empty();
        }
        
        // Validate and rotate refresh token
        Optional<String> newRefreshTokenOpt = tokenService.validateAndRotateRefreshToken(refreshToken);
        
        if (newRefreshTokenOpt.isEmpty()) {
            cookieHelper.clearRefreshTokenCookie(response);
            return Optional.empty();
        }
        
        // Get user from old refresh token
        String tokenHash = tokenGenerator.hashToken(refreshToken);
        RefreshToken oldToken = refreshTokenRepository.findByTokenHash(tokenHash).orElse(null);
        
        // If token was already rotated, find by new token
        if (oldToken == null) {
            tokenHash = tokenGenerator.hashToken(newRefreshTokenOpt.get());
            oldToken = refreshTokenRepository.findByTokenHash(tokenHash).orElse(null);
        }
        
        if (oldToken == null) {
            cookieHelper.clearRefreshTokenCookie(response);
            return Optional.empty();
        }
        
        User user = oldToken.getUser();
        
        // Generate new access token
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(
                userPrincipal, null, userPrincipal.getAuthorities());
        String accessToken = tokenProvider.generateToken(auth);
        
        // Set new refresh token cookie
        cookieHelper.setRefreshTokenCookie(response, newRefreshTokenOpt.get());
        
        return Optional.of(new AuthResponse(
                accessToken,
                "Bearer",
                user.getUserId(),
                user.getEmail(),
                user.getUsername()
        ));
    }
    
    @Override
    public void logout(String refreshToken, String accessToken, Authentication authentication, HttpServletResponse response) {
        // Revoke refresh token if present
        if (refreshToken != null) {
            tokenService.revokeRefreshToken(refreshToken);
        }
        
        // Blacklist current access token
        if (accessToken != null && authentication != null && authentication.getPrincipal() instanceof UserPrincipal) {
            UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
            tokenService.blacklistAccessToken(accessToken, principal.getUserId(), "logout");
        }
        
        // Clear refresh token cookie
        cookieHelper.clearRefreshTokenCookie(response);
    }
}

