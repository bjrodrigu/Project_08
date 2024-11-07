package com.campus_rating_system.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.campus_rating_system.services.UserService;

import com.campus_rating_system.entities.User;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
public class CampusRatingSystemController {
    
    //@Autowired
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

    @GetMapping("/public/hello")
    public String hello(){
        return("hey");
    }

    @GetMapping("/private/hello")
    public String amongus(){
        return("amongus");
    }

    @GetMapping("/me")
    public String authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return currentUser.getUsername();
    }
}
