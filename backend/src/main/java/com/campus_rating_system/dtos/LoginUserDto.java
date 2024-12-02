package com.campus_rating_system.dtos;

/**
 * Service class used for mapping Login details to a User entity in our database for validation
 *
 * <p>Bugs: None known
 *
 * @author Ethan Yang
 */
public class LoginUserDto {
    private String email;

    private String password;

    public LoginUserDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // getters and setters here...

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}