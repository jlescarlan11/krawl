package com.krawl.backend.controller;

import com.krawl.backend.dto.response.AuthResponse;
import com.krawl.backend.service.RegistrationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/register")
@RequiredArgsConstructor
@Validated
public class AuthRegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("/request")
    public ResponseEntity<Void> request(@jakarta.validation.Valid @RequestBody RegistrationRequest req, HttpServletRequest httpRequest) {
        String remoteIp = httpRequest.getRemoteAddr();
        registrationService.requestRegistration(req.getUsername(), req.getEmail(), req.getCaptchaToken(), remoteIp);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/complete")
    public ResponseEntity<AuthResponse> complete(@jakarta.validation.Valid @RequestBody RegistrationCompleteRequest req) {
        AuthResponse response = registrationService.completeRegistration(req.getToken(), req.getPassword());
        return ResponseEntity.ok(response);
    }

    @Data
    public static class RegistrationRequest {
        @NotBlank
        private String username;
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String captchaToken;
    }

    @Data
    public static class RegistrationCompleteRequest {
        @NotBlank
        private String token;
        @NotBlank
        private String password;
    }
}


