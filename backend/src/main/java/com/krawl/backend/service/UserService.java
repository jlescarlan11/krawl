package com.krawl.backend.service;

import com.krawl.backend.dto.request.UserUpdateRequest;
import com.krawl.backend.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserService {
    UserResponse getUserById(UUID userId);
    UserResponse getUserByUsername(String username);
    UserResponse getUserByEmail(String email);
    Page<UserResponse> getAllUsers(Pageable pageable);
    UserResponse updateUser(UUID userId, UserUpdateRequest request);
    void deleteUser(UUID userId);
}

