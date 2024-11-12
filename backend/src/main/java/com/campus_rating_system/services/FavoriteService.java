package com.campus_rating_system.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.Favorite;
import com.campus_rating_system.entities.Location;
import com.campus_rating_system.entities.User;
import com.campus_rating_system.repositories.FavoriteRepository;
import com.campus_rating_system.repositories.LocationRepository;
import com.campus_rating_system.repositories.UserRepository;

/**
 * Service class for managing user favorites within the campus rating system.
 * This class includes methods to facilitate the creation of a Favorite by
 * retrieving user and location entities based on provided identifiers.
 *
 * <p>Bugs: None known
 *
 * @author Rithik Rajaram
 */
@Service
public class FavoriteService {

    @Autowired
    private final FavoriteRepository favoriteRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final LocationRepository locationRepository;

    /**
     * Constructs a FavoriteService with repositories for handling favorite associations,
     * as well as accessing user and location data.
     *
     * @param favoriteRepository the repository for Favorite entities
     * @param userRepository the repository for User entities
     * @param locationRepository the repository for Location entities
     */
    public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository,
                           LocationRepository locationRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
    }

    /**
     * Adds a new Favorite by associating a location with a user, using the user's email
     * and location's name to look up the respective entities. Throws an exception if
     * either entity cannot be found by the provided identifiers.
     *
     * @param email the email of the user marking the location as favorite
     * @param locationName the name of the location to be marked as favorite
     * @return the saved Favorite entity containing the user and location association
     * @throws RuntimeException if the user or location is not found in the system
     */
    public Favorite addFavorite(String email, String locationName) {
        // Fetch the User entity by email
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new RuntimeException("User not found"));
        // Fetch the Location entity by name
        Location location = locationRepository.findByName(locationName).orElseThrow(() ->
                new RuntimeException("Location not found"));
        
        // Create a new Favorite instance and set its properties
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setLocation(location);
        
        return favoriteRepository.save(favorite);
    }

    /**
     * Retrieves all locations that have been marked as favorite by a specific user.
     * This method first verifies the existence of the user before attempting to
     * fetch their favorite locations.
     *
     * @param userId the ID of the user whose favorite locations are to be retrieved
     * @return a List of Location objects that the user has marked as favorite
     * @throws RuntimeException if the user is not found in the system
     * @author Taehyun Kim
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