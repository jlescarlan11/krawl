package com.krawl.backend.controller.v1;

import com.krawl.backend.config.properties.JwtProperties;
import com.krawl.backend.dto.request.LoginRequest;
import com.krawl.backend.dto.request.RegisterRequest;
import com.krawl.backend.dto.response.AuthResponse;
import com.krawl.backend.entity.RefreshToken;
import com.krawl.backend.entity.User;
import com.krawl.backend.repository.RefreshTokenRepository;
import com.krawl.backend.security.JwtTokenProvider;
import com.krawl.backend.security.UserPrincipal;
import com.krawl.backend.service.AuthenticationService;
import com.krawl.backend.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(
    name = "Authentication V1", 
    description = "User registration and authentication endpoints. " +
                  "Returns JWT tokens for authenticated requests."
)
public class AuthControllerV1 {
    
    private final AuthenticationService authenticationService;
    private final TokenService tokenService;
    private final JwtTokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProperties jwtProperties;
    
    @Operation(
        summary = "Register a new user",
        description = "Creates a new user account with email, username, and password. " +
                     "Returns a JWT token that can be used for authenticated requests. " +
                     "The token expires after 24 hours."
    )
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "User registered successfully",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = AuthResponse.class),
                examples = @ExampleObject(
                    name = "Success Response",
                    value = """
                        {
                          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                          "type": "Bearer",
                          "userId": "123e4567-e89b-12d3-a456-426614174000",
                          "email": "user@example.com",
                          "username": "johndoe"
                        }
                        """
                )
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Bad request - validation error or user already exists",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class),
                examples = {
                    @ExampleObject(
                        name = "Validation Error",
                        value = """
                            {
                              "error": "VALIDATION_ERROR",
                              "message": "Validation failed: Email is required, Password must be at least 8 characters",
                              "status": 400,
                              "timestamp": "2025-01-15T10:30:00",
                              "path": "/api/v1/auth/register"
                            }
                            """
                    ),
                    @ExampleObject(
                        name = "User Exists Error",
                        value = """
                            {
                              "error": "VALIDATION_ERROR",
                              "message": "Email already registered",
                              "status": 400,
                              "timestamp": "2025-01-15T10:30:00",
                              "path": "/api/v1/auth/register"
                            }
                            """
                    )
                }
            )
        )
    })
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletResponse response) {
        AuthResponse authResponse = authenticationService.register(request, response);
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    }
    
    @Operation(
        summary = "Login",
        description = "Authenticates a user with email/username and password. " +
                     "Returns a JWT token that can be used for authenticated requests. " +
                     "The token expires after 24 hours."
    )
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Login successful",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = AuthResponse.class),
                examples = @ExampleObject(
                    name = "Success Response",
                    value = """
                        {
                          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                          "type": "Bearer",
                          "userId": "123e4567-e89b-12d3-a456-426614174000",
                          "email": "user@example.com",
                          "username": "johndoe"
                        }
                        """
                )
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Bad request - validation error",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class)
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description = "Unauthorized - invalid credentials",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class),
                examples = @ExampleObject(
                    name = "Invalid Credentials",
                    value = """
                        {
                          "error": "UNAUTHORIZED",
                          "message": "Bad credentials",
                          "status": 401,
                          "timestamp": "2025-01-15T10:30:00",
                          "path": "/api/v1/auth/login"
                        }
                        """
                )
            )
        )
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) {
        AuthResponse authResponse = authenticationService.login(request, response);
        return ResponseEntity.ok(authResponse);
    }
    
    @Operation(
        summary = "Refresh access token",
        description = "Uses refresh token from HttpOnly cookie to generate a new access token. " +
                     "Implements token rotation for security (old refresh token is invalidated)."
    )
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Token refreshed successfully",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = AuthResponse.class)
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description = "Unauthorized - refresh token invalid or expired",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class)
            )
        )
    })
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(
            @CookieValue(value = "refresh_token", required = false) String refreshToken,
            HttpServletRequest request,
            HttpServletResponse response) {
        
        if (refreshToken == null) {
            clearRefreshTokenCookie(response, request);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        // Validate and rotate refresh token
        Optional<String> newRefreshTokenOpt = tokenService.validateAndRotateRefreshToken(refreshToken);
        
        if (newRefreshTokenOpt.isEmpty()) {
            // Clear invalid cookie
            clearRefreshTokenCookie(response, request);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        // Get user from old refresh token
        String tokenHash = hashToken(refreshToken);
        RefreshToken oldToken = refreshTokenRepository.findByTokenHash(tokenHash).orElse(null);
        
        // If token was already rotated, find by new token
        if (oldToken == null) {
            tokenHash = hashToken(newRefreshTokenOpt.get());
            oldToken = refreshTokenRepository.findByTokenHash(tokenHash).orElse(null);
        }
        
        if (oldToken == null) {
            clearRefreshTokenCookie(response, request);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        User user = oldToken.getUser();
        
        // Generate new access token
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(
                userPrincipal, null, userPrincipal.getAuthorities());
        String accessToken = tokenProvider.generateToken(auth);
        
        // Set new refresh token cookie
        setRefreshTokenCookie(response, request, newRefreshTokenOpt.get());
        
        return ResponseEntity.ok(new AuthResponse(
                accessToken,
                "Bearer",
                user.getUserId(),
                user.getEmail(),
                user.getUsername()
        ));
    }
    
    @Operation(
        summary = "Logout",
        description = "Revokes the refresh token and blacklists the current access token. " +
                     "Clears the refresh token cookie."
    )
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Logged out successfully"
        )
    })
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(value = "refresh_token", required = false) String refreshToken,
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {
        
        // Revoke refresh token if present
        if (refreshToken != null) {
            tokenService.revokeRefreshToken(refreshToken);
        }
        
        // Blacklist current access token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String accessToken = authHeader.substring(7);
            if (authentication != null && authentication.getPrincipal() instanceof UserPrincipal) {
                UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
                tokenService.blacklistAccessToken(accessToken, principal.getUserId(), "logout");
            }
        }
        
        // Clear refresh token cookie
        clearRefreshTokenCookie(response, request);
        
        return ResponseEntity.ok().build();
    }
    
    /**
     * Set refresh token as HttpOnly cookie
     * Secure flag is controlled by jwt.cookie-secure property (true in production, false in dev)
     */
    private void setRefreshTokenCookie(HttpServletResponse response, HttpServletRequest request, String refreshToken) {
        Cookie cookie = new Cookie("refresh_token", refreshToken);
        cookie.setHttpOnly(true);
        // Use configuration: false for local dev (HTTP), true for production (HTTPS)
        cookie.setSecure(jwtProperties.isCookieSecure());
        cookie.setPath("/api/v1/auth");
        cookie.setMaxAge(30 * 24 * 60 * 60); // 30 days in seconds
        cookie.setAttribute("SameSite", "Lax");
        response.addCookie(cookie);
    }
    
    /**
     * Clear refresh token cookie
     */
    private void clearRefreshTokenCookie(HttpServletResponse response, HttpServletRequest request) {
        Cookie cookie = new Cookie("refresh_token", "");
        cookie.setMaxAge(0);
        cookie.setPath("/api/v1/auth");
        cookie.setHttpOnly(true);
        // Match the Secure setting from configuration
        cookie.setSecure(jwtProperties.isCookieSecure());
        response.addCookie(cookie);
    }
    
    /**
     * Hash token using SHA-256
     */
    private String hashToken(String token) {
        try {
            java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            return java.util.Base64.getEncoder().encodeToString(hash);
        } catch (java.security.NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }
}

