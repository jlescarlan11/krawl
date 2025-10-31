package com.krawl.backend.controller;

import com.krawl.backend.dto.request.PasswordResetConfirmRequest;
import com.krawl.backend.dto.request.PasswordResetRequest;
import com.krawl.backend.service.PasswordResetService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/auth/password", "/api/v1/auth/password"})
@RequiredArgsConstructor
public class AuthPasswordController {

    private final PasswordResetService passwordResetService;

    @Operation(summary = "Request password reset link")
    @PostMapping("/reset-request")
    public ResponseEntity<Void> requestReset(@Valid @RequestBody PasswordResetRequest request) {
        passwordResetService.requestReset(request.email());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Reset password with token")
    @PostMapping("/reset")
    public ResponseEntity<Void> reset(@Valid @RequestBody PasswordResetConfirmRequest request) {
        passwordResetService.resetPassword(request.token(), request.newPassword());
        return ResponseEntity.ok().build();
    }
}


