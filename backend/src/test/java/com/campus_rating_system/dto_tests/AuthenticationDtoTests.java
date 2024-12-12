package com.campus_rating_system.dto_tests;

import com.campus_rating_system.dtos.LoginResponse;
import com.campus_rating_system.dtos.LoginUserDto;
import com.campus_rating_system.dtos.RegisterUserDto;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class AuthenticationDtoTests {
    @InjectMocks
    private LoginResponse loginResponse; // The service being tested

    @InjectMocks
    private LoginUserDto loginuserDto; // The service being tested

    @InjectMocks
    private RegisterUserDto registerUserDto; // The service being tested

    @Test
    public void testSuccessfulLoginResponse() {
        //
        loginResponse = new LoginResponse();

        // mock result of successful login
        loginResponse.setToken("test_token");
        loginResponse.setExpiresIn(3600000);

        // assert
        assertEquals(loginResponse.getToken(), "test_token", "token should return correctly");
        assertEquals(loginResponse.getExpiresIn(), 3600000, "expiration should return correctly");
    }



}
