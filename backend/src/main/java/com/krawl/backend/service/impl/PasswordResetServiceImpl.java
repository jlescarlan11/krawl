package com.krawl.backend.service.impl;

import com.krawl.backend.entity.PasswordResetToken;
import com.krawl.backend.entity.User;
import com.krawl.backend.repository.PasswordResetTokenRepository;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.service.PasswordResetService;
import com.krawl.backend.service.TokenService;
import com.krawl.backend.service.email.EmailSender;
import com.krawl.backend.service.email.EmailTemplates;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Locale;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PasswordResetServiceImpl implements PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailSender emailSender;
    private final TokenService tokenService;
    private final PlatformTransactionManager transactionManager;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

    @Value("${app.password-reset.expiry-minutes:30}")
    private long expiryMinutes;

    @Value("${app.password-reset.resend-cooldown-minutes:5}")
    private long resendCooldownMinutes = 5;

    private static final SecureRandom secureRandom = new SecureRandom();

    private String generateToken() {
        byte[] bytes = new byte[32]; // 256 bits
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    @Override
    public void requestReset(String email) {
        if (email == null) return;
        String normalized = email.trim().toLowerCase(Locale.ROOT);
        userRepository.findByEmail(normalized).ifPresent(user -> {
            TransactionTemplate transactionTemplate = new TransactionTemplate(transactionManager);
            try {
                transactionTemplate.executeWithoutResult(status -> {
                    requestResetInternal(user);
                });
            } catch (DataIntegrityViolationException e) {
                // Race condition: another request created a token between our check and save
                // Query for the existing token in a new transaction
                log.warn("Password reset encountered race condition for user {}. Finding existing token...", user.getEmail());
                TransactionTemplate retryTemplate = new TransactionTemplate(transactionManager);
                retryTemplate.executeWithoutResult(status -> {
                    Optional<PasswordResetToken> existingTokenOpt = tokenRepository.findActiveTokenByUserId(user.getUserId());
                    if (existingTokenOpt.isPresent()) {
                        PasswordResetToken token = existingTokenOpt.get();
                        log.info("Found existing active token for user {} (recovered from race condition). Reusing it.", user.getEmail());
                        sendResetEmail(user, token);
                    } else {
                        log.error("Race condition occurred but could not find existing token for user {}. User should try again.", user.getEmail());
                        // Don't throw - return without email to avoid user enumeration
                    }
                });
            }
        });
    }

    @Transactional
    private void requestResetInternal(User user) {
        LocalDateTime now = LocalDateTime.now();
        
        // Check if there's an existing active token
        Optional<PasswordResetToken> existingTokenOpt = tokenRepository.findActiveTokenByUserId(user.getUserId());
        
        PasswordResetToken token;
        boolean shouldSendEmail = true;
        
        if (existingTokenOpt.isPresent()) {
            PasswordResetToken existingToken = existingTokenOpt.get();
            LocalDateTime createdAt = existingToken.getCreatedAt();
            LocalDateTime cooldownExpiry = createdAt.plusMinutes(resendCooldownMinutes);
            
            // If token was created within cooldown period, don't send another email
            if (now.isBefore(cooldownExpiry)) {
                log.info("Password reset requested for user {} but within cooldown period ({} minutes). Existing token will be reused.", 
                        user.getEmail(), resendCooldownMinutes);
                shouldSendEmail = false;
                token = existingToken;
            } else {
                // Token exists but cooldown expired, resend the existing token
                log.info("Password reset requested for user {}. Resending existing token (created {} minutes ago).", 
                        user.getEmail(), java.time.Duration.between(createdAt, now).toMinutes());
                token = existingToken;
            }
        } else {
            // No active token exists, create a new one
            // Clean up expired/used tokens first (this is safe - they're no longer active)
            tokenRepository.deleteByUser_UserId(user.getUserId());
            
            // Double-check one more time right before creating (helps with race conditions)
            Optional<PasswordResetToken> lastCheck = tokenRepository.findActiveTokenByUserId(user.getUserId());
            if (lastCheck.isPresent()) {
                token = lastCheck.get();
                log.info("Found active token for user {} during double-check (race condition detected). Reusing it.", user.getEmail());
                shouldSendEmail = true;
            } else {
                // Create new token
                token = new PasswordResetToken();
                token.setUser(user);
                token.setToken(generateToken());
                token.setExpiresAt(now.plusMinutes(expiryMinutes));
                tokenRepository.save(token);
                log.info("Created new password reset token for user {}.", user.getEmail());
            }
        }
        
        // Send email only if not in cooldown period
        if (shouldSendEmail && token != null) {
            sendResetEmail(user, token);
        }
    }

    private void sendResetEmail(User user, PasswordResetToken token) {
        try {
            // Prefer pretty URL path to avoid querystring issues in email clients
            String link = String.format("%s/reset-password/%s", frontendUrl, token.getToken());
            String subject = "Reset your Krawl password";
            String body = EmailTemplates.passwordResetEmail(link, expiryMinutes);
            emailSender.sendEmailAsync(user.getEmail(), subject, body);
        } catch (Exception e) {
            log.error("Failed to send password reset email to {}: {}", user.getEmail(), e.getMessage(), e);
            // Don't throw - always return success to avoid user enumeration
        }
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


