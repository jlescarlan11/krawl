package com.krawl.backend.controller.v1;

import com.krawl.backend.dto.response.UserProfileResponse;
import com.krawl.backend.mapper.UserMapper;
import com.krawl.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class PublicUserControllerV1 {

	private final UserService userService;
	private final UserMapper userMapper;

	@GetMapping("/{username}")
	public ResponseEntity<UserProfileResponse> getPublicProfile(@PathVariable String username) {
		var user = userService.getUserByUsername(username);
		if (user == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(userMapper.toPublicProfile(user));
	}
}


