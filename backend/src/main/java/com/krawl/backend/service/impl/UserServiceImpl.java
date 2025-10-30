package com.krawl.backend.service.impl;

import com.krawl.backend.dto.request.UserUpdateRequest;
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
	public UserResponse updateUser(UUID userId, UserUpdateRequest request) {
		User user = userRepository.findById(userId).orElse(null);
		if (user == null) {
			return null;
		}
		// TODO: Apply request fields when update contract is defined
		return userMapper.toResponse(userRepository.save(user));
	}

	@Override
	@Transactional
	public void deleteUser(UUID userId) {
		if (userRepository.existsById(userId)) {
			userRepository.deleteById(userId);
		}
	}
}


