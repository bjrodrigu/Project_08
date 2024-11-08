package com.campus_rating_system.dtos;

/**
 * Output given to frontend/user when login is a success
 *
 * <p>Bugs: None known
 *
 * @author Ethan Yang
 */
public class LoginResponse {
    private String token;

    private long expiresIn;

    // Getters and setters...

    public String getToken() {
        return token;
    }

    public LoginResponse setToken(String token) {
        this.token = token;
        return this;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public LoginResponse setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }
}