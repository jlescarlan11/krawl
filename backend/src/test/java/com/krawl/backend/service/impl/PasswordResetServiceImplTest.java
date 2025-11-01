package com.krawl.backend.service.impl;

import com.krawl.backend.entity.PasswordResetToken;
import com.krawl.backend.entity.User;
import com.krawl.backend.exception.ValidationException;
import com.krawl.backend.repository.PasswordResetTokenRepository;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.service.TokenService;
import com.krawl.backend.service.email.EmailSender;
import com.krawl.backend.util.TokenGenerator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.PlatformTransactionManager;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class PasswordResetServiceImplTest {

    private UserRepository userRepository;
    private PasswordResetTokenRepository tokenRepository;
    private PasswordEncoder passwordEncoder;
    private EmailSender emailSender;
    private TokenService tokenService;
    private PlatformTransactionManager transactionManager;
    private TokenGenerator tokenGenerator;
    private PasswordResetServiceImpl service;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        tokenRepository = mock(PasswordResetTokenRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        emailSender = mock(EmailSender.class);
        tokenService = mock(TokenService.class);
        transactionManager = mock(PlatformTransactionManager.class);
        tokenGenerator = mock(TokenGenerator.class);

        service = new PasswordResetServiceImpl(userRepository, tokenRepository, passwordEncoder, emailSender, tokenService, transactionManager, tokenGenerator);

        // Inject defaults
        TestUtils.setField(service, "frontendUrl", "http://localhost:3000");
        TestUtils.setField(service, "expiryMinutes", 30L);
        TestUtils.setField(service, "resendCooldownMinutes", 5L);
    }

    @Test
    void requestReset_sendsEmail_andStoresToken_whenEmailExists() {
        User user = new User();
        user.setUserId(UUID.randomUUID());
        user.setEmail("user@example.com");
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        // No existing active token
        when(tokenRepository.findActiveTokenByUserId(user.getUserId())).thenReturn(Optional.empty());
        when(tokenGenerator.generateSecureToken()).thenReturn("test-token-123");

        service.requestReset("user@example.com");

        verify(tokenRepository).deleteByUser_UserId(user.getUserId());
        verify(tokenRepository).save(any(PasswordResetToken.class));
        verify(emailSender).sendEmailAsync(eq("user@example.com"), anyString(), contains("/reset-password/"));
    }

    @Test
    void resetPassword_throwsOnInvalidToken() {
        when(tokenRepository.findByToken("bad")).thenReturn(Optional.empty());
        // Should throw ValidationException now (not IllegalArgumentException)
        assertThrows(ValidationException.class, () -> service.resetPassword("bad", "newPass123"));
    }

    @Test
    void requestReset_reusesExistingToken_whenActiveTokenExists() {
        User user = new User();
        user.setUserId(UUID.randomUUID());
        user.setEmail("user@example.com");
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        
        // Existing active token
        PasswordResetToken existingToken = new PasswordResetToken();
        existingToken.setToken("existing-token");
        existingToken.setUser(user);
        existingToken.setCreatedAt(java.time.LocalDateTime.now().minusMinutes(10)); // Created 10 minutes ago (past cooldown)
        when(tokenRepository.findActiveTokenByUserId(user.getUserId())).thenReturn(Optional.of(existingToken));

        service.requestReset("user@example.com");

        // Should resend existing token, not create new one
        verify(tokenRepository, never()).deleteByUser_UserId(user.getUserId());
        verify(tokenRepository, never()).save(any(PasswordResetToken.class));
        verify(emailSender).sendEmailAsync(eq("user@example.com"), anyString(), contains("/reset-password/"));
    }

    // Simple reflection util to set private fields for test
    static class TestUtils {
        static void setField(Object target, String fieldName, Object value) {
            try {
                var f = target.getClass().getDeclaredField(fieldName);
                f.setAccessible(true);
                f.set(target, value);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
}


