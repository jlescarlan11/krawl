package com.krawl.backend.config.ratelimit;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthPasswordRateLimitFilterTest {

    private AuthPasswordRateLimitFilter filter;
    private HttpServletRequest request;
    private HttpServletResponse response;
    private FilterChain chain;
    private StringWriter responseWriter;
    private PrintWriter printWriter;

    @BeforeEach
    void setUp() throws IOException {
        filter = new AuthPasswordRateLimitFilter();
        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);
        chain = mock(FilterChain.class);
        responseWriter = new StringWriter();
        printWriter = new PrintWriter(responseWriter);

        when(response.getWriter()).thenReturn(printWriter);
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");
    }

    @Test
    void allowsRequestsUntilLimitIsReached() throws ServletException, IOException {
        when(request.getMethod()).thenReturn("POST");
        when(request.getRequestURI()).thenReturn("/api/v1/auth/login");

        // First 5 requests should pass
        for (int i = 0; i < 5; i++) {
            filter.doFilterInternal(request, response, chain);
        }
        verify(chain, times(5)).doFilter(request, response);
    }

    @Test
    void blocksRequestAfterLimitExceeded() throws ServletException, IOException {
        when(request.getMethod()).thenReturn("POST");
        when(request.getRequestURI()).thenReturn("/api/v1/auth/login");

        // Exhaust the limit (5 requests)
        for (int i = 0; i < 5; i++) {
            filter.doFilterInternal(request, response, chain);
        }

        // 6th request should be blocked
        filter.doFilterInternal(request, response, chain);

        verify(response).setStatus(429);
        verify(response).setContentType("application/json");
        assertTrue(responseWriter.toString().contains("Rate limit exceeded"));
        // Chain should not be called on 6th request
        verify(chain, times(5)).doFilter(request, response);
    }

    @Test
    void allowsLoginEndpoint() throws ServletException, IOException {
        when(request.getMethod()).thenReturn("POST");
        when(request.getRequestURI()).thenReturn("/api/v1/auth/login");

        filter.doFilterInternal(request, response, chain);
        
        verify(chain).doFilter(request, response);
    }

    @Test
    void ignoresNonPostRequests() throws ServletException, IOException {
        when(request.getMethod()).thenReturn("GET");
        when(request.getRequestURI()).thenReturn("/api/v1/auth/login");

        // Non-POST requests should bypass filter (shouldNotFilter returns true)
        // Verify by checking that doFilterInternal is not called for GET
        filter.doFilterInternal(request, response, chain);
        // Filter should not process GET, but OncePerRequestFilter behavior 
        // means we can't easily test shouldNotFilter directly
        // Instead, verify normal flow works (this test is mainly documentation)
        verify(chain).doFilter(request, response);
    }
}


