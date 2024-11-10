package com.campus_rating_system.dtos;

/**
 * Service class used for mapping SignUp details to a User entity in our database to be added
 *
 * <p>Bugs: None known
 *
 * @author Ethan Yang
 */
public class RegisterUserDto {
    private String email;

    private String password;

    private String fullName;

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

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}