package com.krawl.backend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileRequest {

	@Size(max = 50, message = "Username must not exceed 50 characters")
	private String username;

	@Size(max = 1000, message = "Bio must not exceed 1000 characters")
	private String bio;
}


