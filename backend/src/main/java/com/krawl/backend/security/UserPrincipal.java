package com.krawl.backend.security;

import com.krawl.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@Data
@AllArgsConstructor
public class UserPrincipal implements UserDetails {
    
    private UUID userId;
    private String email;
    private String username;
    private String password;
    private boolean enabled;
    private String reputationTier;
    
    public static UserPrincipal create(User user) {
        return new UserPrincipal(
            user.getUserId(),
            user.getEmail(),
            user.getUsername(),
            user.getPasswordHash(),
            user.getDeletedAt() == null,
            user.getReputationTier()
        );
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // For now, all users have USER role
        // In future, can add roles like ADMIN, MODERATOR
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }
    
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public String getUsername() {
        return username;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    
    @Override
    public boolean isEnabled() {
        return enabled;
    }
}

