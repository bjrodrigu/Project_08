package com.campus_rating_system;

import com.campus_rating_system.config.AuthenticationService;
import com.campus_rating_system.dtos.LoginResponse;
import com.campus_rating_system.dtos.LoginUserDto;
import com.campus_rating_system.dtos.RegisterUserDto;
import com.campus_rating_system.services.JwtService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.campus_rating_system.services.UserService;

import com.campus_rating_system.entities.User;

import org.springframework.http.ResponseEntity;

@RestController
public class CampusRatingSystemController {
    
    //@Autowired
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public CampusRatingSystemController(UserService userService, JwtService jwtService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
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
