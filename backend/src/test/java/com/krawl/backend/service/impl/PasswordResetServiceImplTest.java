package com.krawl.backend.service.impl;

import com.krawl.backend.entity.PasswordResetToken;
import com.krawl.backend.entity.User;
import com.krawl.backend.repository.PasswordResetTokenRepository;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.service.email.EmailSender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    private PasswordResetServiceImpl service;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        tokenRepository = mock(PasswordResetTokenRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        emailSender = mock(EmailSender.class);

        service = new PasswordResetServiceImpl(userRepository, tokenRepository, passwordEncoder, emailSender);

        // Inject defaults
        TestUtils.setField(service, "frontendUrl", "http://localhost:3000");
        TestUtils.setField(service, "expiryMinutes", 30L);
    }

    @Test
    void requestReset_sendsEmail_andStoresToken_whenEmailExists() {
        User user = new User();
        user.setUserId(UUID.randomUUID());
        user.setEmail("user@example.com");
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));

        service.requestReset("user@example.com");

        verify(tokenRepository).deleteByUser_UserId(user.getUserId());
        verify(tokenRepository).save(any(PasswordResetToken.class));
        verify(emailSender).sendEmailAsync(eq("user@example.com"), anyString(), contains("/reset-password?token="));
    }

    @Test
    void resetPassword_throwsOnInvalidToken() {
        when(tokenRepository.findByToken("bad")).thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class, () -> service.resetPassword("bad", "newPass123"));
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


