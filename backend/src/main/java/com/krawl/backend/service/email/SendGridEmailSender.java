package com.krawl.backend.service.email;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
@ConditionalOnProperty(name = "app.mail.provider", havingValue = "sendgrid", matchIfMissing = false)
public class SendGridEmailSender implements EmailSender {

    @Value("${app.mail.sendgrid.api-key:}")
    private String apiKey;
    
    @Value("${app.mail.from:no-reply@localhost}")
    private String from;
    
    @Value("${app.mail.fromName:Krawl}")
    private String fromName;

    private SendGrid sendGrid;

    @PostConstruct
    public void initialize() {
        log.info("=== SendGrid Email Configuration Validation ===");
        log.info("SendGrid API Key: {}", apiKey.isEmpty() ? "NOT SET" : "SET (masked)");
        log.info("From Address: {}", from);
        log.info("From Name: {}", fromName);
        
        boolean hasErrors = false;
        if (apiKey == null || apiKey.isEmpty()) {
            log.error("⚠️  SENDGRID_API_KEY is not configured! Emails will fail to send.");
            hasErrors = true;
        }
        if (from == null || from.isEmpty() || from.equals("no-reply@localhost")) {
            log.error("⚠️  MAIL_FROM is not configured properly! Current value: {}", from);
            hasErrors = true;
        }
        
        if (hasErrors) {
            log.error("❌ SendGrid email configuration has errors. Please check your environment variables!");
        } else {
            this.sendGrid = new SendGrid(apiKey);
            log.info("✅ SendGrid email configuration appears valid");
        }
        
        log.info("=== End SendGrid Email Configuration ===");
    }

    @Override
    @Async("taskExecutor")
    public void sendEmailAsync(String to, String subject, String body) {
        log.info("📧 Attempting to send email via SendGrid to: {} with subject: '{}'", to, subject);
        log.debug("Email body preview (first 100 chars): {}", body.length() > 100 ? body.substring(0, 100) + "..." : body);
        
        if (sendGrid == null) {
            log.error("❌ SendGrid not initialized. Check SENDGRID_API_KEY configuration.");
            return;
        }
        
        try {
            Email fromEmail = new Email(from, fromName);
            Email toEmail = new Email(to);
            Content content = new Content("text/html", body);
            Mail mail = new Mail(fromEmail, subject, toEmail, content);
            
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            
            log.debug("Sending email via SendGrid API...");
            Response response = sendGrid.api(request);
            
            int statusCode = response.getStatusCode();
            if (statusCode >= 200 && statusCode < 300) {
                log.info("✅ Successfully sent email via SendGrid to: {} with subject: '{}' (status: {})", 
                        to, subject, statusCode);
            } else {
                log.error("❌ SendGrid API returned error status {}: {}", statusCode, response.getBody());
                log.error("   Response headers: {}", response.getHeaders());
            }
        } catch (IOException e) {
            log.error("❌ IOException while sending email via SendGrid to {} with subject '{}':", to, subject, e);
            log.error("   Error message: {}", e.getMessage());
        } catch (Exception e) {
            log.error("❌ Unexpected exception while sending email via SendGrid to {} with subject '{}':", to, subject, e);
            log.error("   Error message: {}", e.getMessage());
            log.error("   Exception class: {}", e.getClass().getName());
            if (e.getCause() != null) {
                log.error("   Caused by: {} - {}", e.getCause().getClass().getName(), e.getCause().getMessage());
            }
        }
    }
}

