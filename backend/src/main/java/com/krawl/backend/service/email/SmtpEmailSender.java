package com.krawl.backend.service.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import jakarta.mail.internet.InternetAddress;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SmtpEmailSender implements EmailSender {

    private final JavaMailSender mailSender;
    @Value("${app.mail.from:no-reply@localhost}")
    private String from;
    @Value("${app.mail.fromName:Krawl}")
    private String fromName;

    @Override
    @Async("taskExecutor")
    public void sendEmailAsync(String to, String subject, String body) {
        try {
            var mime = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(mime, false, "UTF-8");
            helper.setFrom(new InternetAddress(from, fromName));
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, false);
            mailSender.send(mime);
        } catch (Exception e) {
            log.error("Failed to send email to {} with subject {}", to, subject, e);
        }
    }
}


