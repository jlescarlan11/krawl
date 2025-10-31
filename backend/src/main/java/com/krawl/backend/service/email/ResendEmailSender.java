package com.krawl.backend.service.email;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(name = "app.mail.provider", havingValue = "resend", matchIfMissing = false)
public class ResendEmailSender implements EmailSender {

    private final ObjectMapper objectMapper;

    @Value("${app.mail.resend.api-key:}")
    private String apiKey;
    
    @Value("${app.mail.from:no-reply@localhost}")
    private String from;
    
    @Value("${app.mail.fromName:Krawl}")
    private String fromName;

    private static final String RESEND_API_URL = "https://api.resend.com/emails";
    private static final HttpClient HTTP_CLIENT = HttpClient.newHttpClient();

    @PostConstruct
    public void validateConfiguration() {
        log.info("=== Resend Email Configuration Validation ===");
        log.info("Resend API Key: {}", apiKey.isEmpty() ? "NOT SET" : "SET (masked)");
        log.info("From Address: {}", from);
        log.info("From Name: {}", fromName);
        
        boolean hasErrors = false;
        if (apiKey == null || apiKey.isEmpty()) {
            log.error("⚠️  RESEND_API_KEY is not configured! Emails will fail to send.");
            hasErrors = true;
        }
        if (from == null || from.isEmpty() || from.equals("no-reply@localhost")) {
            log.error("⚠️  MAIL_FROM is not configured properly! Current value: {}", from);
            hasErrors = true;
        }
        
        if (hasErrors) {
            log.error("❌ Resend email configuration has errors. Please check your environment variables!");
        } else {
            log.info("✅ Resend email configuration appears valid");
        }
        
        log.info("=== End Resend Email Configuration ===");
    }

    @Override
    @Async("taskExecutor")
    public void sendEmailAsync(String to, String subject, String body) {
        log.info("📧 Attempting to send email via Resend to: {} with subject: '{}'", to, subject);
        log.debug("Email body preview (first 100 chars): {}", body.length() > 100 ? body.substring(0, 100) + "..." : body);
        
        if (apiKey == null || apiKey.isEmpty()) {
            log.error("❌ Resend API key not configured. Check RESEND_API_KEY environment variable.");
            return;
        }
        
        try {
            // Build JSON payload for Resend API
            String fromAddress = fromName != null && !fromName.isEmpty() 
                ? String.format("%s <%s>", fromName, from)
                : from;
            
            // Build JSON properly using ObjectMapper
            com.fasterxml.jackson.databind.node.ObjectNode jsonPayload = objectMapper.createObjectNode();
            jsonPayload.put("from", fromAddress);
            jsonPayload.putArray("to").add(to);
            jsonPayload.put("subject", subject);
            jsonPayload.put("html", body);
            
            String jsonString = objectMapper.writeValueAsString(jsonPayload);
            
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(RESEND_API_URL))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonString, StandardCharsets.UTF_8))
                    .build();
            
            log.debug("Sending email via Resend API...");
            HttpResponse<String> response = HTTP_CLIENT.send(request, HttpResponse.BodyHandlers.ofString());
            
            int statusCode = response.statusCode();
            String responseBody = response.body();
            
            if (statusCode >= 200 && statusCode < 300) {
                // Parse response to get email ID
                try {
                    JsonNode json = objectMapper.readTree(responseBody);
                    String emailId = json.path("id").asText("");
                    log.info("✅ Successfully sent email via Resend to: {} with subject: '{}' (status: {}, id: {})", 
                            to, subject, statusCode, emailId.isEmpty() ? "N/A" : emailId);
                } catch (Exception e) {
                    log.info("✅ Successfully sent email via Resend to: {} with subject: '{}' (status: {})", 
                            to, subject, statusCode);
                }
            } else {
                log.error("❌ Resend API returned error status {}: {}", statusCode, responseBody);
                try {
                    JsonNode json = objectMapper.readTree(responseBody);
                    String errorMessage = json.path("message").asText(responseBody);
                    log.error("   Error message: {}", errorMessage);
                    
                    // Provide helpful guidance for common errors
                    if (statusCode == 403) {
                        if (errorMessage.contains("domain is not verified") || errorMessage.contains("only send testing emails")) {
                            log.error("   ⚠️  RESEND VERIFICATION REQUIRED:");
                            log.error("      You can verify a SINGLE EMAIL ADDRESS (no domain needed!)");
                            log.error("      Steps:");
                            log.error("      1. Go to https://resend.com/domains");
                            log.error("      2. Look for 'Add Email Address' or 'Verify Email' (NOT 'Add Domain')");
                            log.error("      3. Enter your email: jlescarlan11@gmail.com");
                            log.error("      4. Check inbox and click verification link");
                            log.error("      5. Set MAIL_FROM=jlescarlan11@gmail.com");
                            log.error("      Alternative: Use SendGrid (easier email verification) - set MAIL_PROVIDER=sendgrid");
                        }
                    }
                } catch (Exception e) {
                    // Ignore JSON parsing errors, already logged responseBody
                }
            }
        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("❌ Exception while sending email via Resend to {} with subject '{}':", to, subject, e);
            log.error("   Error message: {}", e.getMessage());
            log.error("   Exception class: {}", e.getClass().getName());
            if (e.getCause() != null) {
                log.error("   Caused by: {} - {}", e.getCause().getClass().getName(), e.getCause().getMessage());
            }
        } catch (Exception e) {
            log.error("❌ Unexpected exception while sending email via Resend to {} with subject '{}':", to, subject, e);
            log.error("   Error message: {}", e.getMessage());
            log.error("   Exception class: {}", e.getClass().getName());
            if (e.getCause() != null) {
                log.error("   Caused by: {} - {}", e.getCause().getClass().getName(), e.getCause().getMessage());
            }
        }
    }
}

