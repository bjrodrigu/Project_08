package com.campus_rating_system.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.User;
import com.campus_rating_system.repositories.UserRepository;

import java.util.Optional;

/**
 * Service class for managing user operations within the campus rating system.
 * This class provides methods to handle user-related business logic, including
 * adding new users to the system and setting default properties.
 *
 * <p>Bugs: Not currently in use. Jwt service is being used for user services.
 *
 * @author Rithik
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    /**
     * Constructs a UserService with the specified repository and password encoder
     * for handling user data and securely managing passwords.
     *
     * @param userRepository the repository interface for accessing user data
     * @param passwordEncoder the encoder for hashing passwords
     */
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
    }

    public boolean isAdmin(String email) {
        User user = getUserByEmail(email);
        return user.isAdmin();
    }

}
