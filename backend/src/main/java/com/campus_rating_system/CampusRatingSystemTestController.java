package com.campus_rating_system;

import com.campus_rating_system.config.AuthenticationService;
import com.campus_rating_system.entities.User;
import com.campus_rating_system.services.JwtService;
import com.campus_rating_system.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CampusRatingSystemTestController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final AuthenticationService authenticationService;

    public CampusRatingSystemTestController(UserService userService, JwtService jwtService, AuthenticationService authenticationService) {

        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    // test function for public use
    @GetMapping("/public/hello")
    public String hello(){
        return("hey");
    }

    // test function for private use
    @GetMapping("/hello")
    public String amongus(){
        return("amongus");
    }

    // test function to get user information
    @GetMapping("/me")
    public String authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return currentUser.getUsername();
    }
}
