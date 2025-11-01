package com.krawl.backend.config.ratelimit;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * IP-based rate limiter for sensitive authentication endpoints.
 * 
 * <p>Protects against brute-force attacks by limiting requests per IP address.
 * Current policy: 5 requests per 15 minutes per IP.</p>
 * 
 * <p>Applies to: login, password reset, and registration endpoints.</p>
 * 
 * <p><b>Note:</b> This is an MVP implementation using in-memory storage.
 * For distributed systems, consider Redis-backed rate limiting.</p>
 */
@Component
public class AuthPasswordRateLimitFilter extends OncePerRequestFilter {

    // In-memory bucket storage per IP address
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    
    // Rate limit configuration: 5 requests per 15 minutes
    private static final int CAPACITY = 5;
    private static final int REFILL_TOKENS = 5;
    private static final Duration REFILL_PERIOD = Duration.ofMinutes(15);

    /**
     * Resolves or creates a bucket for the given IP address.
     * Uses lazy initialization with thread-safe ConcurrentHashMap.
     */
    private Bucket resolveBucket(String key) {
        return buckets.computeIfAbsent(key, k -> Bucket.builder()
                .addLimit(Bandwidth.builder()
                        .capacity(CAPACITY)
                        .refillGreedy(REFILL_TOKENS, REFILL_PERIOD)
                        .build())
                .build());
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, 
                                   @NonNull HttpServletResponse response, 
                                   @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String clientIp = getClientIp(request);
        Bucket bucket = resolveBucket(clientIp);
        
        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(429);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write(
                "{\"error\":\"Rate limit exceeded\"," +
                "\"message\":\"Too many requests. Please try again later.\"}"
            );
        }
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) {
        // Only rate limit POST requests
        if (!"POST".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        
        String path = request.getRequestURI();
        
        // Check if path matches any rate-limited endpoint
        return !isRateLimitedEndpoint(path);
    }
    
    /**
     * Determines if the given path should be rate-limited.
     * 
     * <p>Rate-limited endpoints:</p>
     * <ul>
     *   <li>Login: /api/auth/login, /api/v1/auth/login</li>
     *   <li>Password reset: /api/auth/password/reset-*</li>
     *   <li>Registration: /api/v1/auth/register/*</li>
     * </ul>
     */
    private boolean isRateLimitedEndpoint(String path) {
        // Login endpoints (both v1 and legacy)
        if (path.startsWith("/api/auth/login") || path.startsWith("/api/v1/auth/login")) {
            return true;
        }
        
        // Password reset endpoints
        if (path.startsWith("/api/auth/password/reset") || 
            path.startsWith("/api/v1/auth/password/reset")) {
            return true;
        }
        
        // Registration endpoints
        if (path.startsWith("/api/v1/auth/register/request") || 
            path.startsWith("/api/v1/auth/register/complete")) {
            return true;
        }
        
        return false;
    }
    
    /**
     * Extracts client IP address, considering proxy headers.
     * Falls back to remote address if proxy headers are not present.
     */
    private String getClientIp(HttpServletRequest request) {
        // Check X-Forwarded-For header (standard for proxies/load balancers)
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            // X-Forwarded-For can contain multiple IPs; use the first one
            return xForwardedFor.split(",")[0].trim();
        }
        
        // Fallback to direct remote address
        return request.getRemoteAddr();
    }
}


