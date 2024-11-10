package com.campus_rating_system.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.User;
import com.campus_rating_system.entities.Location;
import com.campus_rating_system.entities.Favorite;
import com.campus_rating_system.repositories.UserRepository;
import com.campus_rating_system.repositories.LocationRepository;
import com.campus_rating_system.repositories.FavoriteRepository;

/**
 * Service class responsible for handling the addition of favorite locations for users
 * within the campus rating system.
 *
 * @author Taehyun Kim
 */
@Service
public class AddFavoritePlaceService {

    @Autowired
    private final UserRepository userRepository;
    
    @Autowired
    private final LocationRepository locationRepository;
    
    @Autowired
    private final FavoriteRepository favoriteRepository;

    /**
     * Constructs an AddFavoritePlaceService with required repositories for handling
     * user, location, and favorite data operations.
     *
     * @param userRepository the repository for User entities
     * @param locationRepository the repository for Location entities
     * @param favoriteRepository the repository for Favorite entities
     */
    public AddFavoritePlaceService(UserRepository userRepository, 
                                  LocationRepository locationRepository,
                                  FavoriteRepository favoriteRepository) {
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
        this.favoriteRepository = favoriteRepository;
    }

    /**
     * Creates a new favorite relationship between a user and a location. This method
     * verifies the existence of both the user and location before creating the
     * favorite entry, ensuring data integrity.
     *
     * @param userId the ID of the user adding the favorite
     * @param locationId the ID of the location to be favorited
     * @return the saved Favorite entity containing the user-location association
     * @throws RuntimeException if either the user or location is not found in the system
     */
    public Favorite addFavoritePlace(Integer userId, Integer locationId) {
        // Fetch the User entity by ID
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
            
        // Fetch the Location entity by ID
        Location location = locationRepository.findById(locationId)
            .orElseThrow(() -> new RuntimeException("Location not found with ID: " + locationId));

        // Create and populate a new Favorite entity
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setLocation(location);

        // Save and return the new favorite
        return favoriteRepository.save(favorite);
    }
}