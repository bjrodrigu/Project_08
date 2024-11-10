package com.campus_rating_system.services;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.Review;
import com.campus_rating_system.entities.User;
import com.campus_rating_system.entities.Location;
import com.campus_rating_system.repositories.ReviewRepository;
import com.campus_rating_system.repositories.UserRepository;
import com.campus_rating_system.repositories.LocationRepository;

/**
 * Service class for handling review-related operations within the campus rating system.
 * This class acts as an intermediary layer, connecting controllers with repositories, 
 * and implementing business logic associated with adding reviews for specific locations by users.
 *
 * <p>Bugs: None known
 *
 * @author Rithik Rajaram
 */
@Service
public class ReviewService {

    @Autowired
    private final ReviewRepository reviewRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final LocationRepository locationRepository;

    /**
     * Constructs a ReviewService with required repositories for handling review data,
     * user data, and location data, facilitating separation of concerns.
     *
     * @param reviewRepository the repository interface for accessing review data
     * @param userRepository the repository interface for accessing user data
     * @param locationRepository the repository interface for accessing location data
     */
    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, LocationRepository locationRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
    }

    /**
     * Adds a new review to the system by associating it with a specific user and location.
     * This method validates the existence of both the user and location before creating the
     * review entry, ensuring data integrity.
     *
     * @param email the email of the user submitting the review, used to find the User entity
     * @param locationName the name of the location being reviewed, used to find the Location entity
     * @param rating an integer rating for the location (expected to follow a predefined rating scale)
     * @param comment a textual comment describing the user's experience at the location
     * @return the saved Review entity containing the newly added review information
     * @throws RuntimeException if the user or location is not found in the system
     */
    public Review addNewReview(String email, String locationName, int rating, String comment) {
        // Fetch the User and Location entities based on their names
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Location location = locationRepository.findByName(locationName).orElseThrow(() -> new RuntimeException("Location not found"));

        // Create a new Review instance and set its properties
        Review review = new Review();
        review.setUser(user);
        review.setLocation(location);
        review.setRating(rating);
        review.setComment(comment);
        review.setCreatedAt(new Date());
        review.setUpdatedAt(new Date());

        return reviewRepository.save(review);
    }
}
