package com.krawl.backend.captcha;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "captcha.provider", havingValue = "hcaptcha", matchIfMissing = true)
public class HCaptchaVerifier implements CaptchaVerifier {

    private final ObjectMapper objectMapper;

    @Value("${captcha.secret:}")
    private String secret;

    private static final String VERIFY_URL = "https://hcaptcha.com/siteverify";

    @Override
    public boolean verify(String token, String remoteIp) {
        if (secret == null || secret.isBlank() || token == null || token.isBlank()) {
            return false;
        }
        try {
            String form = "secret=" + URLEncoder.encode(secret, StandardCharsets.UTF_8)
                    + "&response=" + URLEncoder.encode(token, StandardCharsets.UTF_8)
                    + (remoteIp != null && !remoteIp.isBlank() ? "&remoteip=" + URLEncoder.encode(remoteIp, StandardCharsets.UTF_8) : "");

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(VERIFY_URL))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(form))
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                log.warn("hCaptcha verify returned status {}", response.statusCode());
                return false;
            }
            JsonNode json = objectMapper.readTree(response.body());
            return json.path("success").asBoolean(false);
        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("hCaptcha verification failed", e);
            return false;
        }
    }
}


