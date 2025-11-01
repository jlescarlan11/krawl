package com.krawl.backend.service.impl;

import com.krawl.backend.dto.request.UpdateProfileRequest;
import com.krawl.backend.dto.response.UserResponse;
import com.krawl.backend.entity.User;
import com.krawl.backend.exception.ConflictException;
import com.krawl.backend.exception.EntityNotFoundException;
import com.krawl.backend.exception.ValidationException;
import com.krawl.backend.mapper.UserMapper;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;

	@Override
	@Cacheable(value = "users", key = "#userId.toString()")
	public UserResponse getUserById(UUID userId) {
		return userRepository.findById(userId)
			.map(userMapper::toResponse)
			.orElseThrow(() -> new EntityNotFoundException("User", userId));
	}

	@Override
	@Cacheable(value = "users", key = "'username:' + #username")
	public UserResponse getUserByUsername(String username) {
		return userRepository.findByUsername(username)
			.map(userMapper::toResponse)
			.orElseThrow(() -> new EntityNotFoundException("User with username: " + username));
	}

	@Override
	@Cacheable(value = "users", key = "'email:' + #email")
	public UserResponse getUserByEmail(String email) {
		return userRepository.findByEmail(email)
			.map(userMapper::toResponse)
			.orElseThrow(() -> new EntityNotFoundException("User with email: " + email));
	}

	@Override
	public Page<UserResponse> getAllUsers(Pageable pageable) {
		return userRepository.findAll(pageable).map(userMapper::toResponse);
	}

	@Override
	@CacheEvict(value = "users", allEntries = true)
	@Transactional
	public UserResponse updateUser(UUID userId, UpdateProfileRequest request) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new EntityNotFoundException("User", userId));

		if (request.getUsername() != null) {
			String username = sanitizeUsername(request.getUsername());
			if (username.length() < 3) {
				throw new ValidationException("Username must be at least 3 characters");
			}
			if (userRepository.existsByUsernameAndUserIdNot(username, userId)) {
				throw new ConflictException("Username is already taken");
			}
			user.setUsername(username);
		}

		if (request.getBio() != null) {
			String bio = sanitizeText(request.getBio(), 1000);
			user.setBio(bio);
		}

		return userMapper.toResponse(userRepository.save(user));
	}

	private String sanitizeUsername(String value) {
		if (value == null) {
			return null;
		}
		return value.trim().replaceAll("\\s+", " ").replaceAll("<[^>]*>", "");
	}

	private String sanitizeText(String value, int max) {
		if (value == null) {
			return null;
		}
		String v = value.trim().replaceAll("<[^>]*>", "");
		return v.length() > max ? v.substring(0, max) : v;
	}

	@Override
	@CacheEvict(value = "users", allEntries = true)
	@Transactional
	public void deleteUser(UUID userId) {
		if (userRepository.existsById(userId)) {
			userRepository.deleteById(userId);
		}
	}
}


