package com.krawl.backend.config.ratelimit;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.mockito.Mockito.*;

class AuthPasswordRateLimitFilterTest {

    @Test
    void allowsRequestsUntilLimitIsReached() throws ServletException, IOException {
        AuthPasswordRateLimitFilter filter = new AuthPasswordRateLimitFilter();
        HttpServletRequest request = mock(HttpServletRequest.class);
        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain chain = mock(FilterChain.class);

        when(request.getMethod()).thenReturn("POST");
        when(request.getRequestURI()).thenReturn("/api/auth/password/reset-request");
        when(request.getRemoteAddr()).thenReturn("127.0.0.1");

        for (int i = 0; i < 5; i++) {
            filter.doFilterInternal(request, response, chain);
        }
        verify(chain, times(5)).doFilter(request, response);
    }
}


