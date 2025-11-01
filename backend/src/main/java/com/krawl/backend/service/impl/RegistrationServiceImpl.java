package com.krawl.backend.service.impl;

import com.krawl.backend.captcha.CaptchaVerifier;
import com.krawl.backend.entity.RegistrationToken;
import com.krawl.backend.repository.RegistrationTokenRepository;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.service.RegistrationService;
import com.krawl.backend.service.email.EmailSender;
import com.krawl.backend.service.email.EmailTemplates;
import com.krawl.backend.dto.response.AuthResponse;
import com.krawl.backend.entity.User;
import com.krawl.backend.exception.ValidationException;
import com.krawl.backend.security.JwtTokenProvider;
import com.krawl.backend.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
public class RegistrationServiceImpl implements RegistrationService {

    private final UserRepository userRepository;
    private final RegistrationTokenRepository tokenRepository;
    private final EmailSender emailSender;
    private final CaptchaVerifier captchaVerifier;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

    @Value("${app.registration.expiry-minutes:60}")
    private long expiryMinutes;

    private static final SecureRandom secureRandom = new SecureRandom();

    private String generateToken() {
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    @Override
    @Transactional
    public void requestRegistration(String username, String email, String captchaToken, String remoteIp) {
        log.debug("Registration request received for email: {}, username: {}", email, username);
        
        if (email == null || username == null) {
            log.warn("Registration request rejected: email or username is null");
            throw new ValidationException("Email and username are required");
        }

        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
        String normalizedUsername = username.trim();
        if (normalizedEmail.isBlank() || normalizedUsername.isBlank()) {
            log.warn("Registration request rejected: email or username is blank");
            throw new ValidationException("Email and username cannot be empty");
        }

        log.debug("Verifying CAPTCHA token for email: {}", normalizedEmail);
        boolean captchaOk = captchaVerifier.verify(captchaToken, remoteIp);
        if (!captchaOk) {
            log.warn("CAPTCHA verification failed for email: {}", normalizedEmail);
            throw new IllegalArgumentException("Captcha verification failed");
        }
        log.debug("CAPTCHA verification passed for email: {}", normalizedEmail);

        // Check if user already exists
        boolean emailExists = userRepository.existsByEmail(normalizedEmail);
        boolean usernameExists = userRepository.existsByUsername(normalizedUsername);
        if (emailExists || usernameExists) {
            log.info("Registration request rejected: user already exists (email exists: {}, username exists: {})", emailExists, usernameExists);
            // Return generic error message to prevent email/username enumeration
            throw new ValidationException("An account with this email or username already exists. Please use a different email or username, or try logging in instead.");
        }

        // Invalidate existing pending tokens for this email/username
        tokenRepository.deleteByEmail(normalizedEmail);
        tokenRepository.deleteByUsername(normalizedUsername);

        RegistrationToken token = new RegistrationToken();
        token.setEmail(normalizedEmail);
        token.setUsername(normalizedUsername);
        token.setToken(generateToken());
        token.setExpiresAt(LocalDateTime.now().plusMinutes(expiryMinutes));
        tokenRepository.save(token);

        String link = String.format("%s/signup/complete/%s", frontendUrl, token.getToken());
        String subject = "Complete your Krawl account";
        String body = EmailTemplates.registrationVerificationEmail(link, expiryMinutes);

        log.info("Registration verification link for {} (username: {}): {}", normalizedEmail, normalizedUsername, link);
        log.debug("Sending registration email to: {}", normalizedEmail);
        try {
            emailSender.sendEmailAsync(normalizedEmail, subject, body);
            log.info("Registration email queued for sending to: {}", normalizedEmail);
        } catch (Exception e) {
            log.error("Failed to queue registration email to: {}", normalizedEmail, e);
            throw e;
        }
    }

    @Override
    @Transactional
    public AuthResponse completeRegistration(String tokenValue, String password) {
        RegistrationToken token = tokenRepository.findByToken(tokenValue)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));

        if (token.getUsedAt() != null || LocalDateTime.now().isAfter(token.getExpiresAt())) {
            throw new IllegalStateException("Token expired or used");
        }

        String email = token.getEmail();
        String username = token.getUsername();

        if (userRepository.existsByEmail(email) || userRepository.existsByUsername(username)) {
            throw new IllegalStateException("Username or email already taken");
        }

        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPasswordHash(passwordEncoder.encode(password));
        user = userRepository.save(user);

        token.setUsedAt(LocalDateTime.now());
        tokenRepository.save(token);
        tokenRepository.deleteByEmail(email);
        tokenRepository.deleteByUsername(username);

        // Auto-login: mint JWT matching AuthController responses
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userPrincipal, null, userPrincipal.getAuthorities());
        String jwt = tokenProvider.generateToken(authentication);

        return new AuthResponse(jwt, "Bearer", user.getUserId(), user.getEmail(), user.getUsername());
    }
}


