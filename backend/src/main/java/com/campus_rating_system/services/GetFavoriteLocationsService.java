package com.campus_rating_system.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.User;
import com.campus_rating_system.entities.Location;
import com.campus_rating_system.repositories.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class responsible for retrieving favorite locations for users within
 * the campus rating system. This class provides functionality to fetch all
 * locations that a specific user has marked as favorite.
 *
 *
 * @author Taehyun Kim
 */
@Service
public class GetFavoriteLocationsService {

    @Autowired
    private final UserRepository userRepository;

    /**
     * Constructs a GetFavoriteLocationsService with the required repository
     * for accessing user data and their associated favorites.
     *
     * @param userRepository the repository for User entities
     */
    public GetFavoriteLocationsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieves all locations that have been marked as favorite by a specific user.
     * This method first verifies the existence of the user before attempting to
     * fetch their favorite locations.
     *
     * @param userId the ID of the user whose favorite locations are to be retrieved
     * @return a List of Location objects that the user has marked as favorite
     * @throws RuntimeException if the user is not found in the system
     */
    public List<Location> getFavoriteLocations(Integer userId) {
        // Verify user exists and fetch their data
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Extract locations from favorites using stream operations
        return user.getFavorites().stream()
            .map(favorite -> favorite.getLocation())
            .collect(Collectors.toList());
    }
}