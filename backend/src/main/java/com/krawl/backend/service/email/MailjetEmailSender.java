
package com.krawl.backend.service.email;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.resource.Emailv31;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@ConditionalOnProperty(name = "app.mail.provider", havingValue = "mailjet", matchIfMissing = false)
public class MailjetEmailSender implements EmailSender {

    @Value("${app.mail.mailjet.api-key-public:}")
    private String apiKeyPublic;
    
    @Value("${app.mail.mailjet.api-key-private:}")
    private String apiKeyPrivate;
    
    @Value("${app.mail.from:no-reply@localhost}")
    private String from;
    
    @Value("${app.mail.fromName:Krawl}")
    private String fromName;

    private MailjetClient mailjetClient;

    @PostConstruct
    public void initialize() {
        log.info("=== Mailjet Email Configuration Validation ===");
        log.info("Mailjet API Key Public: {}", apiKeyPublic.isEmpty() ? "NOT SET" : "SET (masked)");
        log.info("Mailjet API Key Private: {}", apiKeyPrivate.isEmpty() ? "NOT SET" : "SET (masked)");
        log.info("From Address: {}", from);
        log.info("From Name: {}", fromName);
        
        boolean hasErrors = false;
        if (apiKeyPublic == null || apiKeyPublic.isEmpty()) {
            log.error("⚠️  MAILJET_API_KEY_PUBLIC is not configured! Emails will fail to send.");
            hasErrors = true;
        }
        if (apiKeyPrivate == null || apiKeyPrivate.isEmpty()) {
            log.error("⚠️  MAILJET_API_KEY_PRIVATE is not configured! Emails will fail to send.");
            hasErrors = true;
        }
        if (from == null || from.isEmpty() || from.equals("no-reply@localhost")) {
            log.error("⚠️  MAIL_FROM is not configured properly! Current value: {}", from);
            hasErrors = true;
        }
        
        if (hasErrors) {
            log.error("❌ Mailjet email configuration has errors. Please check your environment variables!");
        } else {
            try {
                this.mailjetClient = new MailjetClient(
                    ClientOptions.builder()
                        .apiKey(apiKeyPublic)
                        .apiSecretKey(apiKeyPrivate)
                        .build()
                );
                log.info("✅ Mailjet email configuration appears valid");
                log.info("   Free tier: 6,000 emails/month, 200/day");
                log.info("   Note: Mailjet branding included in free tier emails");
            } catch (Exception e) {
                log.error("❌ Failed to initialize Mailjet client: {}", e.getMessage());
                hasErrors = true;
            }
        }
        
        log.info("=== End Mailjet Email Configuration ===");
    }

    @Override
    @Async("taskExecutor")
    public void sendEmailAsync(String to, String subject, String body) {
        log.info("📧 Attempting to send email via Mailjet to: {} with subject: '{}'", to, subject);
        log.debug("Email body preview (first 100 chars): {}", body.length() > 100 ? body.substring(0, 100) + "..." : body);
        
        if (mailjetClient == null) {
            log.error("❌ Mailjet client not initialized. Check MAILJET_API_KEY_PUBLIC and MAILJET_API_KEY_PRIVATE configuration.");
            return;
        }
        
        try {
            log.debug("Using sender email: {} (Name: {})", from, fromName);
            MailjetRequest request = new MailjetRequest(Emailv31.resource)
                .property(Emailv31.MESSAGES, new JSONArray()
                    .put(new JSONObject()
                        .put(Emailv31.Message.FROM, new JSONObject()
                            .put("Email", from)
                            .put("Name", fromName))
                        .put(Emailv31.Message.TO, new JSONArray()
                            .put(new JSONObject()
                                .put("Email", to)))
                        .put(Emailv31.Message.SUBJECT, subject)
                        .put(Emailv31.Message.HTMLPART, body)));
            
            log.debug("Sending email via Mailjet API...");
            MailjetResponse response = mailjetClient.post(request);
            
            int statusCode = response.getStatus();
            String responseBody = response.getData().toString();
            
            if (statusCode >= 200 && statusCode < 300) {
                log.info("✅ Successfully sent email via Mailjet to: {} with subject: '{}' (status: {})", 
                        to, subject, statusCode);
                log.debug("Response: {}", responseBody);
            } else {
                log.error("❌ Mailjet API returned error status {}: {}", statusCode, responseBody);
                try {
                    // Try to extract error message from JSON response
                    if (responseBody.contains("\"ErrorMessage\"")) {
                        // Mailjet error format
                        log.error("   Check Mailjet dashboard for details");
                    }
                } catch (Exception e) {
                    // Ignore parsing errors
                }
            }
        } catch (MailjetException e) {
            log.error("❌ MailjetException while sending email to {} with subject '{}':", to, subject, e);
            log.error("   Error message: {}", e.getMessage());
            if (e.getCause() != null) {
                log.error("   Caused by: {} - {}", e.getCause().getClass().getName(), e.getCause().getMessage());
            }
        } catch (Exception e) {
            log.error("❌ Unexpected exception while sending email via Mailjet to {} with subject '{}':", to, subject, e);
            log.error("   Error message: {}", e.getMessage());
            log.error("   Exception class: {}", e.getClass().getName());
            if (e.getCause() != null) {
                log.error("   Caused by: {} - {}", e.getCause().getClass().getName(), e.getCause().getMessage());
            }
        }
    }
}

