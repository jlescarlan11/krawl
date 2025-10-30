package com.krawl.backend.security;

import com.krawl.backend.entity.User;
import com.krawl.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String usernameOrId) throws UsernameNotFoundException {
        User user;
        
        // Try to parse as UUID first (for JWT token subject)
        try {
            UUID userId = UUID.fromString(usernameOrId);
            user = userRepository.findById(userId)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + usernameOrId));
        } catch (IllegalArgumentException e) {
            // Not a UUID, try as email or username
            user = userRepository.findByEmail(usernameOrId)
                    .orElseGet(() -> userRepository.findByUsername(usernameOrId)
                            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + usernameOrId)));
        }
        
        return UserPrincipal.create(user);
    }
}

