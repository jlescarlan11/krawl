package com.krawl.backend.util;

import com.krawl.backend.config.properties.JwtProperties;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Utility class for managing HTTP cookies, particularly refresh token cookies.
 * Centralizes cookie configuration and management logic.
 */
@Component
@RequiredArgsConstructor
public class CookieHelper {
    
    private final JwtProperties jwtProperties;
    
    private static final int SECONDS_PER_DAY = 24 * 60 * 60;
    
    /**
     * Set refresh token as HttpOnly cookie.
     * Secure flag is controlled by jwt.cookie-secure property (true in production, false in dev).
     * 
     * @param response HTTP response to add cookie to
     * @param token The refresh token value
     */
    public void setRefreshTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(jwtProperties.getCookieName(), token);
        cookie.setHttpOnly(true);
        cookie.setSecure(jwtProperties.isCookieSecure());
        cookie.setPath(jwtProperties.getCookiePath());
        cookie.setMaxAge(jwtProperties.getCookieMaxAgeDays() * SECONDS_PER_DAY);
        cookie.setAttribute("SameSite", "Lax");
        response.addCookie(cookie);
    }
    
    /**
     * Clear refresh token cookie by setting max age to 0.
     * 
     * @param response HTTP response to clear cookie in
     */
    public void clearRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(jwtProperties.getCookieName(), "");
        cookie.setMaxAge(0);
        cookie.setPath(jwtProperties.getCookiePath());
        cookie.setHttpOnly(true);
        cookie.setSecure(jwtProperties.isCookieSecure());
        response.addCookie(cookie);
    }
}

