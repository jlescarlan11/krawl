package com.krawl.backend.mapper;

import com.krawl.backend.dto.response.UserProfileResponse;
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

    public UserProfileResponse toPublicProfile(UserResponse user) {
        if (user == null) {
            return null;
        }

        return UserProfileResponse.builder()
                .username(user.getUsername())
                .bio(user.getBio())
                .joinDate(user.getCreatedAt())
                .score(user.getCreatorScore())
                .tier(user.getReputationTier())
                .build();
    }

    public UserProfileResponse toPublicProfile(UserResponse user, int gemsCreated, int krawlsCreated) {
        if (user == null) {
            return null;
        }

        return UserProfileResponse.builder()
                .username(user.getUsername())
                .bio(user.getBio())
                .joinDate(user.getCreatedAt())
                .score(user.getCreatorScore())
                .tier(user.getReputationTier())
                .gemsCreated(gemsCreated)
                .krawlsCreated(krawlsCreated)
                .build();
    }
}

