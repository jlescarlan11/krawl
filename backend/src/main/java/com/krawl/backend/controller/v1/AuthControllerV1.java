package com.krawl.backend.controller.v1;

import com.krawl.backend.dto.request.LoginRequest;
import com.krawl.backend.dto.request.RegisterRequest;
import com.krawl.backend.dto.response.AuthResponse;
import com.krawl.backend.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authenticationService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authenticationService.login(request);
        return ResponseEntity.ok(response);
    }
}

