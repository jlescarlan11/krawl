package com.krawl.backend.controller.v1;

import com.krawl.backend.dto.response.UserProfileResponse;
import com.krawl.backend.dto.response.UserResponse;
import com.krawl.backend.mapper.UserMapper;
import com.krawl.backend.service.UserService;
import com.krawl.backend.service.UserStatsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PublicUserControllerV1.class)
class PublicUserControllerV1Test {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private UserMapper userMapper;

    @MockitoBean
    private UserStatsService userStatsService;

    @Test
    void getPublicProfile_returnsProfileWithCounts() throws Exception {
        var userId = UUID.randomUUID();
        var userResp = UserResponse.builder()
                .userId(userId)
                .username("alice")
                .email("alice@example.com")
                .bio("hello")
                .creatorScore(new BigDecimal("4.20"))
                .reputationTier("Trail Maker")
                .createdAt(LocalDateTime.now())
                .build();
        when(userService.getUserByUsername("alice")).thenReturn(userResp);

        when(userStatsService.getCounts(userId)).thenReturn(new UserStatsService.Counts(3, 2));

        var mapped = UserProfileResponse.builder()
                .username("alice")
                .bio("hello")
                .score(new BigDecimal("4.20"))
                .tier("Trail Maker")
                .gemsCreated(3)
                .krawlsCreated(2)
                .build();
        when(userMapper.toPublicProfile(userResp, 3, 2)).thenReturn(mapped);

        mockMvc.perform(get("/api/v1/users/alice").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("alice"))
                .andExpect(jsonPath("$.gemsCreated").value(3))
                .andExpect(jsonPath("$.krawlsCreated").value(2));
    }
}


