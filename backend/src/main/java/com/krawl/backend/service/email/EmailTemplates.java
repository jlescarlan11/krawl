package com.krawl.backend.service.email;

import java.time.Year;

/**
 * Email templates for transactional emails
 * All templates are HTML-based for better formatting
 */
public class EmailTemplates {

    /**
     * Creates a formatted HTML email template with consistent styling
     */
    private static String createEmailWrapper(String content) {
        // Escape any % characters in content to avoid format string errors
        // Replace % with %% so they're treated as literal characters when formatting
        String escapedContent = content.replace("%", "%%");
        
        int currentYear = Year.now().getValue();
        return """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Krawl</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%%" style="background-color: #f5f5f5; padding: 20px 0;">
                    <tr>
                        <td align="center">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <!-- Header -->
                                <tr>
                                    <td style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #e5e5e5;">
                                        <!-- Logo: HTML/CSS icon alongside Krawl text -->
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 12px 0 0; vertical-align: middle;">
                                                    <!-- Logo: HTML table-based circles for maximum email client compatibility -->
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 48px; height: 32px;">
                                                        <tr style="height: 2px;">
                                                            <td style="padding: 0; width: 13px;"></td>
                                                            <td style="padding: 0; width: 12px;"></td>
                                                            <td style="padding: 0; width: 12px;"></td>
                                                            <td style="padding: 0; width: 11px;"></td>
                                                        </tr>
                                                        <tr style="height: 10px;">
                                                            <td style="padding: 0;"></td>
                                                            <td style="padding: 0;"></td>
                                                            <td style="padding: 0;"></td>
                                                            <td style="padding: 0; text-align: center; vertical-align: top;">
                                                                <div style="width: 9px; height: 9px; background-color: #1E5930; border-radius: 50%%; display: inline-block;"></div>
                                                            </td>
                                                        </tr>
                                                        <tr style="height: 6px;">
                                                            <td style="padding: 0;"></td>
                                                            <td style="padding: 0; text-align: center; vertical-align: middle;">
                                                                <div style="width: 9px; height: 9px; background-color: #1E5930; border-radius: 50%%; display: inline-block;"></div>
                                                            </td>
                                                            <td style="padding: 0;"></td>
                                                            <td style="padding: 0;"></td>
                                                        </tr>
                                                        <tr style="height: 6px;">
                                                            <td style="padding: 0;"></td>
                                                            <td style="padding: 0;"></td>
                                                            <td style="padding: 0; text-align: center; vertical-align: middle;">
                                                                <div style="width: 9px; height: 9px; background-color: #1E5930; border-radius: 50%%; display: inline-block;"></div>
                                                            </td>
                                                            <td style="padding: 0;"></td>
                                                        </tr>
                                                        <tr style="height: 8px;">
                                                            <td style="padding: 0; text-align: left; vertical-align: bottom;">
                                                                <div style="width: 9px; height: 9px; background-color: #1E5930; border-radius: 50%%; display: inline-block;"></div>
                                                            </td>
                                                            <td style="padding: 0;"></td>
                                                            <td style="padding: 0;"></td>
                                                            <td style="padding: 0;"></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td style="vertical-align: middle;">
                                                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #1E5930; font-family: -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; letter-spacing: 0.01em;">Krawl</h1>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 32px;">
                                        %s
                                    </td>
                                </tr>
                                <!-- Footer -->
                                <tr>
                                    <td style="padding: 24px 32px; background-color: #f9f9f9; border-top: 1px solid #e5e5e5; border-radius: 0 0 8px 8px;">
                                        <p style="margin: 0; font-size: 12px; color: #666666; text-align: center; line-height: 1.5;">
                                            This email was sent by Krawl. If you didn't request this, you can safely ignore it.<br>
                                            &copy; %d Krawl. All rights reserved.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            """.formatted(escapedContent, currentYear);
    }

    /**
     * Password reset email template
     */
    public static String passwordResetEmail(String resetLink, long expiryMinutes) {
        String content = """
            <div style="color: #333333;">
                <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600; color: #1a1a1a;">
                    Reset Your Password
                </h2>
                <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                    We received a request to reset your password for your Krawl account.
                </p>
                <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                    Click the button below to set a new password. This link will expire in <strong>%d minutes</strong>.
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%%">
                    <tr>
                        <td align="center" style="padding: 0 0 32px 0;">
                            <a href="%s" style="display: inline-block; padding: 14px 32px; background-color: #2D7A3E; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                Reset Password
                            </a>
                        </td>
                    </tr>
                </table>
                <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5; color: #666666;">
                    If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="margin: 0 0 32px 0; font-size: 12px; line-height: 1.6; color: #888888; word-break: break-all;">
                    <a href="%s" style="color: #2D7A3E; text-decoration: none;">%s</a>
                </p>
            </div>
            """.formatted(expiryMinutes, resetLink, resetLink, resetLink);
        
        return createEmailWrapper(content);
    }

    /**
     * Registration verification email template
     */
    public static String registrationVerificationEmail(String verificationLink, long expiryMinutes) {
        String content = """
            <div style="color: #333333;">
                <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600; color: #1a1a1a;">
                    Complete Your Krawl Account
                </h2>
                <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                    You're almost there! We just need you to verify your email and set your password.
                </p>
                <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                    Click the button below to complete your account setup. This link will expire in <strong>%d minutes</strong>.
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%%">
                    <tr>
                        <td align="center" style="padding: 0 0 32px 0;">
                            <a href="%s" style="display: inline-block; padding: 14px 32px; background-color: #2D7A3E; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                                Complete Registration
                            </a>
                        </td>
                    </tr>
                </table>
                <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5; color: #666666;">
                    If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="margin: 0 0 32px 0; font-size: 12px; line-height: 1.6; color: #888888; word-break: break-all;">
                    <a href="%s" style="color: #2D7A3E; text-decoration: none;">%s</a>
                </p>
            </div>
            """.formatted(expiryMinutes, verificationLink, verificationLink, verificationLink);
        
        return createEmailWrapper(content);
    }
}

