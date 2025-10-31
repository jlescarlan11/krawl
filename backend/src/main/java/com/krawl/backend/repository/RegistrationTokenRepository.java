package com.krawl.backend.repository;

import com.krawl.backend.entity.RegistrationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RegistrationTokenRepository extends JpaRepository<RegistrationToken, UUID> {
    Optional<RegistrationToken> findByToken(String token);
    void deleteByEmail(String email);
    void deleteByUsername(String username);
}


