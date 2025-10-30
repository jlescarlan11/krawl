package com.krawl.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateRequest {
    
    @Size(max = 50, message = "Username must not exceed 50 characters")
    private String username;
    
    @Email(message = "Email must be valid")
    @Size(max = 255, message = "Email must not exceed 255 characters")
    private String email;
    
    @Size(max = 1000, message = "Bio must not exceed 1000 characters")
    private String bio;
}

