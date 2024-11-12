package com.campus_rating_system.config;

import com.campus_rating_system.dtos.LoginUserDto;
import com.campus_rating_system.dtos.RegisterUserDto;
import com.campus_rating_system.entities.User;
import com.campus_rating_system.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * This class is used to perform signup and login capabilities
 *
 * <p>Bugs: None known
 *
 * @Author Ethan Yang
 */
@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    // This token is a standard implementation of the Authentication
    // interface used for simple username and password authentication.
    private final PasswordEncoder passwordEncoder;

    // This component is responsible for delegating the authentication
    // request to the appropriate AuthenticationProvider.
    private final AuthenticationManager authenticationManager;

    /**
     * Constructs the service's needed to be used when creating and authenticating a given user
     *
     * @param userRepository the service for mapped data from database to a class
     * @param authenticationManager the service for validating a user request
     * @param passwordEncoder the service for hashing passwords
     */
    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Maps the input values to a new user value to be added
     * to the database
     *
     * @param input is the email, password and Fullname
     * @return the final config to be used by spring boot
     */
    public User signup(RegisterUserDto input) {
        User user = new User();
        user.setUser(input.getFullName());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());

        return userRepository.save(user);
    }

    /**
     * Validates if user login is successful or not
     *
     * @param input is the email and password
     * @return the final config to be used by spring boot
     */
    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }
}