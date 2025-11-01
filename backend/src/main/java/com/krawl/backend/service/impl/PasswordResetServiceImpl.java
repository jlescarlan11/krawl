package com.krawl.backend.service.impl;

import com.krawl.backend.entity.PasswordResetToken;
import com.krawl.backend.entity.User;
import com.krawl.backend.repository.PasswordResetTokenRepository;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.service.PasswordResetService;
import com.krawl.backend.service.TokenService;
import com.krawl.backend.service.email.EmailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordResetServiceImpl implements PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailSender emailSender;
    private final TokenService tokenService;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

    @Value("${app.password-reset.expiry-minutes:30}")
    private long expiryMinutes;

    private static final SecureRandom secureRandom = new SecureRandom();

    private String generateToken() {
        byte[] bytes = new byte[32]; // 256 bits
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    @Override
    @Transactional
    public void requestReset(String email) {
        if (email == null) return;
        String normalized = email.trim().toLowerCase(Locale.ROOT);
        userRepository.findByEmail(normalized).ifPresent(user -> {
            // Invalidate existing tokens
            tokenRepository.deleteByUser_UserId(user.getUserId());

            PasswordResetToken token = new PasswordResetToken();
            token.setUser(user);
            token.setToken(generateToken());
            token.setExpiresAt(LocalDateTime.now().plusMinutes(expiryMinutes));
            tokenRepository.save(token);

            // Prefer pretty URL path to avoid querystring issues in email clients
            String link = String.format("%s/reset-password/%s", frontendUrl, token.getToken());
            String subject = "Reset your Krawl password";
            String body = ("We received a request to reset your password.\n\n" +
                    "Click the link below to set a new password (valid for %d minutes):\n%s\n\n" +
                    "If you did not request this, you can safely ignore this email.")
                    .formatted(expiryMinutes, link);
            emailSender.sendEmailAsync(user.getEmail(), subject, body);
        });
        // Always return success (generic) to avoid user enumeration
    }

    @Override
    @Transactional
    public void resetPassword(String tokenValue, String newPassword) {
        PasswordResetToken token = tokenRepository.findByToken(tokenValue)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));

        if (token.getUsedAt() != null || LocalDateTime.now().isAfter(token.getExpiresAt())) {
            throw new IllegalStateException("Token expired or used");
        }

        User user = token.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Force logout all sessions (revoke all refresh tokens)
        tokenService.revokeAllUserTokens(user.getUserId());

        // Mark used and invalidate others
        token.setUsedAt(LocalDateTime.now());
        tokenRepository.save(token);
        tokenRepository.deleteByUser_UserId(user.getUserId());
    }
}


