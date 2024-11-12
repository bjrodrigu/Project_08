package com.campus_rating_system.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.User;
import com.campus_rating_system.repositories.UserRepository;

import java.util.Date;
import java.util.UUID; // placeholder for Google ID generation

/**
 * Service class for managing user operations within the campus rating system.
 * This class provides methods to handle user-related business logic, including
 * adding new users to the system and setting default properties.
 *
 * <p>Bugs: The Google ID is currently generated as a random UUID and should be
 * replaced by a proper ID obtained through an authentication mechanism.
 *
 * @author Rithik Rajaram
 */
@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    /**
     * Constructs a UserService with the specified repository for handling user data.
     * The repository dependency is injected to allow persistence and retrieval of
     * user information from the data layer.
     *
     * @param userRepository the repository interface for accessing user data
     */
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

}
