package com.campus_rating_system.config_tests;

import com.campus_rating_system.config.JwtAuthenticationFilter;
import com.campus_rating_system.config.SecurityConfiguration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;


@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class SecurityConfigurationTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Mock
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Mock
    private AuthenticationProvider authenticationProvider;

    @InjectMocks
    private SecurityConfiguration securityConfiguration;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();
    }

    @Test
    public void testPublicEndpointsAreAccessible() throws Exception {
        // Raw body format as string
        String valid_user = "{\"email\": \"jytest@gmail.com\", \"password\": \"test\"}";
        String invalid_user = "{\"email\": \"fake\", \"password\": \"fake\"}";

        mockMvc.perform(post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(valid_user))  // Send the raw body as content
                .andExpect(status().isOk());  // Expect 200 OK if credentials are valid, or change based on your logic

        // will not test signup since it will create actual user

        mockMvc.perform(post("/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalid_user))  // Send the raw body as content
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testPrivateEndpointsAreProtected() throws Exception {
        mockMvc.perform(get("/user/info"))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testCorsConfiguration() throws Exception {
        mockMvc.perform(options("/user/login")
                        .header("Origin", "http://localhost:3000")
                        .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000"));
    }
}
