package com.krawl.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.krawl.backend.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class RestAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       org.springframework.security.access.AccessDeniedException accessDeniedException) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        ErrorResponse error = new ErrorResponse(
            "ACCESS_DENIED",
            "Access denied",
            HttpServletResponse.SC_FORBIDDEN,
            request.getRequestURI()
        );

        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }
}


