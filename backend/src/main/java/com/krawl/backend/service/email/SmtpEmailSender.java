package com.krawl.backend.service.email;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(
    name = "app.mail.provider", 
    havingValue = "smtp", 
    matchIfMissing = true  // Default to SMTP if not specified for backward compatibility
)
public class SmtpEmailSender implements EmailSender {

    private final JavaMailSender mailSender;
    @Value("${app.mail.from:no-reply@localhost}")
    private String from;
    @Value("${app.mail.fromName:Krawl}")
    private String fromName;
    @Value("${spring.mail.host:}")
    private String mailHost;
    @Value("${spring.mail.port:}")
    private String mailPort;
    @Value("${spring.mail.username:}")
    private String mailUsername;
    @Value("${spring.mail.properties.mail.smtp.auth:true}")
    private String smtpAuth;
    @Value("${spring.mail.properties.mail.smtp.starttls.enable:true}")
    private String starttlsEnabled;

    @PostConstruct
    public void validateConfiguration() {
        log.info("=== Email Configuration Validation ===");
        log.info("SMTP Host: {}", mailHost.isEmpty() ? "NOT SET" : mailHost);
        log.info("SMTP Port: {}", mailPort.isEmpty() ? "NOT SET" : mailPort);
        log.info("SMTP Username: {}", mailUsername.isEmpty() ? "NOT SET" : mailUsername);
        log.info("SMTP Auth Enabled: {}", smtpAuth);
        log.info("STARTTLS Enabled: {}", starttlsEnabled);
        log.info("From Address: {}", from);
        log.info("From Name: {}", fromName);
        
        boolean hasErrors = false;
        if (mailHost == null || mailHost.isEmpty()) {
            log.error("⚠️  SPRING_MAIL_HOST is not configured! Emails will fail to send.");
            hasErrors = true;
        }
        if (mailPort == null || mailPort.isEmpty()) {
            log.error("⚠️  SPRING_MAIL_PORT is not configured! Emails will fail to send.");
            hasErrors = true;
        }
        if (mailUsername == null || mailUsername.isEmpty()) {
            log.error("⚠️  SPRING_MAIL_USERNAME is not configured! Emails will fail to send.");
            hasErrors = true;
        }
        if (from == null || from.isEmpty() || from.equals("no-reply@localhost")) {
            log.error("⚠️  MAIL_FROM is not configured properly! Current value: {}", from);
            hasErrors = true;
        }
        
        if (hasErrors) {
            log.error("❌ Email configuration has errors. Please check your environment variables!");
        } else {
            log.info("✅ Email configuration appears valid (password not checked)");
        }
        
        log.info("=== End Email Configuration ===");
    }

    @Override
    @Async("taskExecutor")
    public void sendEmailAsync(String to, String subject, String body) {
        log.info("📧 Attempting to send email to: {} with subject: '{}'", to, subject);
        log.debug("Email body preview (first 100 chars): {}", body.length() > 100 ? body.substring(0, 100) + "..." : body);
        
        try {
            var mime = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(mime, false, "UTF-8");
            helper.setFrom(new InternetAddress(from, fromName));
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, false);
            
            log.debug("MIME message created successfully. Sending via SMTP...");
            mailSender.send(mime);
            log.info("✅ Successfully sent email to: {} with subject: '{}'", to, subject);
        } catch (MessagingException e) {
            log.error("❌ MessagingException while sending email to {} with subject '{}':", to, subject, e);
            log.error("   Error message: {}", e.getMessage());
            log.error("   Exception class: {}", e.getClass().getName());
            if (e.getCause() != null) {
                log.error("   Caused by: {} - {}", e.getCause().getClass().getName(), e.getCause().getMessage());
            }
        } catch (MailException e) {
            log.error("❌ MailException while sending email to {} with subject '{}':", to, subject, e);
            log.error("   Error message: {}", e.getMessage());
            log.error("   Exception class: {}", e.getClass().getName());
            
            // Provide helpful diagnostics for connection issues
            String errorMsg = e.getMessage();
            if (errorMsg != null) {
                if (errorMsg.contains("timeout") || errorMsg.contains("ConnectException")) {
                    log.error("   ⚠️  CONNECTION TIMEOUT DETECTED:");
                    log.error("      This usually means:");
                    log.error("      1. Network/firewall is blocking SMTP port {} (common in cloud platforms)", mailPort);
                    log.error("      2. Check if your deployment platform allows outbound SMTP connections");
                    log.error("      3. Consider using an email service API (SendGrid, Mailgun, AWS SES) instead");
                    log.error("      4. Verify SPRING_MAIL_HOST and SPRING_MAIL_PORT are correct");
                }
                if (errorMsg.contains("authentication") || errorMsg.contains("535")) {
                    log.error("   ⚠️  AUTHENTICATION ERROR:");
                    log.error("      For Gmail, make sure you're using an App Password, not your regular password");
                    log.error("      See: https://myaccount.google.com/apppasswords");
                }
            }
            
            if (e.getCause() != null) {
                log.error("   Caused by: {} - {}", e.getCause().getClass().getName(), e.getCause().getMessage());
            }
        } catch (Exception e) {
            log.error("❌ Unexpected exception while sending email to {} with subject '{}':", to, subject, e);
            log.error("   Error message: {}", e.getMessage());
            log.error("   Exception class: {}", e.getClass().getName());
            if (e.getCause() != null) {
                log.error("   Caused by: {} - {}", e.getCause().getClass().getName(), e.getCause().getMessage());
            }
        }
    }
}


