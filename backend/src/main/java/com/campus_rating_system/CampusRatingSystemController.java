package com.campus_rating_system;

import org.springframework.web.bind.annotation.RestController;

import com.campus_rating_system.services.UserService;

import com.campus_rating_system.entities.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class CampusRatingSystemController {
    
    @Autowired
    private final UserService userService;

    public CampusRatingSystemController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/addUser")
    public ResponseEntity<User> addNewUser(
            @RequestParam String username,
            @RequestParam String email) {

        User newUser = userService.addNewUser(username, email);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
}
