package com.krawl.backend.service.impl;

import com.krawl.backend.dto.request.UpdateProfileRequest;
import com.krawl.backend.dto.response.UserResponse;
import com.krawl.backend.entity.User;
import com.krawl.backend.mapper.UserMapper;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.service.UserService;
import lombok.RequiredArgsConstructor;
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
	public UserResponse getUserById(UUID userId) {
		return userRepository.findById(userId)
			.map(userMapper::toResponse)
			.orElse(null);
	}

	@Override
	public UserResponse getUserByUsername(String username) {
		return userRepository.findByUsername(username)
			.map(userMapper::toResponse)
			.orElse(null);
	}

	@Override
	public UserResponse getUserByEmail(String email) {
		return userRepository.findByEmail(email)
			.map(userMapper::toResponse)
			.orElse(null);
	}

	@Override
	public Page<UserResponse> getAllUsers(Pageable pageable) {
		return userRepository.findAll(pageable).map(userMapper::toResponse);
	}

	@Override
	@Transactional
	public UserResponse updateUser(UUID userId, UpdateProfileRequest request) {
		User user = userRepository.findById(userId).orElse(null);
		if (user == null) {
			throw new IllegalArgumentException("User not found");
		}

		if (request.getUsername() != null) {
			String username = sanitizeUsername(request.getUsername());
			if (username.length() < 3) {
				throw new IllegalArgumentException("Username must be at least 3 characters");
			}
			if (userRepository.existsByUsernameAndUserIdNot(username, userId)) {
				throw new IllegalArgumentException("Username is already taken");
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
	@Transactional
	public void deleteUser(UUID userId) {
		if (userRepository.existsById(userId)) {
			userRepository.deleteById(userId);
		}
	}
}


