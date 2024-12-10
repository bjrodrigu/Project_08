package com.campus_rating_system.dtos;

public class UpdateUserRequestDto {
    private String newName;     
    private String newPassword;  
    private String newEmail;  

    // Getters and setters

    public String getName() {
        return newName;
    }

    public void setName(String name) {
        this.newName = name;
    }

    public String getPassword() {
        return newPassword;
    }

    public void setPassword(String password) {
        this.newPassword = password;
    }

    public String getNewEmail() {
        return newEmail;
    }

    public void setNewEmail(String newEmail) {
        this.newEmail = newEmail;
    }
}
