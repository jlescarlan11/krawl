package com.krawl.backend.controller;

import com.krawl.backend.dto.request.LoginRequest;
import com.krawl.backend.dto.request.RegisterRequest;
import com.krawl.backend.dto.response.AuthResponse;
import com.krawl.backend.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Legacy authentication controller.
 * 
 * @deprecated This controller is deprecated. Please use {@link com.krawl.backend.controller.v1.AuthControllerV1} instead.
 * The legacy endpoints under {@code /api/auth} will be removed in a future release.
 * Migration path: Replace {@code /api/auth} with {@code /api/v1/auth} in your API calls.
 * 
 * @since 1.0.0
 * @see com.krawl.backend.controller.v1.AuthControllerV1
 */
@Deprecated(since = "1.0.0", forRemoval = true)
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication (Legacy)", description = "DEPRECATED: Use /api/v1/auth endpoints instead. Legacy user registration and authentication endpoints.")
public class AuthController {
    
    private final AuthenticationService authenticationService;
    
    @Operation(summary = "Register a new user", description = "Creates a new user account and returns a JWT token")
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletResponse response) {
        AuthResponse authResponse = authenticationService.register(request, response);
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    }
    
    @Operation(summary = "Login", description = "Authenticates a user and returns a JWT token")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) {
        AuthResponse authResponse = authenticationService.login(request, response);
        return ResponseEntity.ok(authResponse);
    }
}

