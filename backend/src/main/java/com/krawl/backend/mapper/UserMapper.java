package com.krawl.backend.mapper;

import com.krawl.backend.dto.response.UserResponse;
import com.krawl.backend.entity.User;
import com.krawl.backend.security.UserPrincipal;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    
    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }
        
        return UserResponse.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .email(user.getEmail())
                .bio(user.getBio())
                .creatorScore(user.getCreatorScore())
                .reputationTier(user.getReputationTier())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
    
    public UserPrincipal toPrincipal(User user) {
        if (user == null) {
            return null;
        }
        
        return UserPrincipal.create(user);
    }
}

