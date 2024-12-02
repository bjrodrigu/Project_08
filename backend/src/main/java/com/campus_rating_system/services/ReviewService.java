package com.campus_rating_system.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.Review;
import com.campus_rating_system.entities.User;
import com.campus_rating_system.entities.Location;
import com.campus_rating_system.repositories.ReviewRepository;
import com.campus_rating_system.repositories.UserRepository;
import com.campus_rating_system.repositories.LocationRepository;

/**
 * Service class for handling review-related operations within the campus rating
 * system.
 * This class acts as an intermediary layer, connecting controllers with
 * repositories,
 * and implementing business logic associated with adding reviews for specific
 * locations by users.
 *
 * <p>
 * Bugs: None known
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
     * Constructs a ReviewService with required repositories for handling review
     * data,
     * user data, and location data, facilitating separation of concerns.
     *
     * @param reviewRepository   the repository interface for accessing review data
     * @param userRepository     the repository interface for accessing user data
     * @param locationRepository the repository interface for accessing location
     *                           data
     */
    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository,
            LocationRepository locationRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
    }

    /**
     * Adds a new review to the system by associating it with a specific user and
     * location.
     * This method validates the existence of both the user and location before
     * creating the
     * review entry, ensuring data integrity.
     *
     * @param title        the title of the new review
     * @param locationName the name of the location being reviewed, used to find the
     *                     Location entity
     * @param rating       an integer rating for the location, expected to follow
     *                     1-5
     * @param comment      a textual comment describing the user's experience at the
     *                     location
     * @return the saved Review entity containing the newly added review information
     * @throws RuntimeException if the user or location is not found in the system
     */
    public Review addNewReview(String locationName, int rating, String comment, String title) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        String email = currentUser.getEmail();

        // Fetch the User and Location entities based on their names
        User user = userRepository.findByEmail(email).orElseThrow(() 
              -> new RuntimeException("User not found"));
        Location location = locationRepository.findByName(locationName)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        // Create a new Review instance and set its properties
        Review review = new Review();
        review.setUser(user);
        review.setLocation(location);
        review.setRating(rating);
        review.setComment(comment);
        review.setCreatedAt(new Date());
        review.setUpdatedAt(new Date());
        review.setTitle(title);

        return reviewRepository.save(review);
    }

    /**
     * Deletes an existing review for a specific location by the currently
     * authenticated user.
     * This method retrieves the user based on the current authentication context,
     * verifies the existence of both the user and location, and then deletes
     * the review if found.
     *
     * @param locationName the name of the location whose review needs to be deleted
     * @throws RuntimeException if the user, location, or review is not found in the
     *                          system
     */
    public void deleteReview(String locationName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        String email = currentUser.getEmail();

        // Find the user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find the location by name
        Location location = locationRepository.findByName(locationName)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        // Find the review by user and location
        Review review = reviewRepository.findByUserAndLocation(user, location)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        reviewRepository.delete(review);
    }

    /**
     * Retrieves all reviews from the system.
     *
     * @return a list of all reviews present in the system
     */
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    
    /**
    * Updates an existing review for a specific location by the currently authenticated user.
    * This method retrieves the user based on the current authentication context, verifies the
    * existence of both the user and location, and updates the review's content if found.
    *
    * @param locationName the name of the location whose review needs to be updated
    * @param newRating    the updated rating for the location
    * @param newComment   the updated comment describing the user's experience
    * @param newTitle     the updated title of the review
    * @return the updated Review entity
    * @throws RuntimeException if the user, location, or review is not found in the system
    */
    public Review editReview(String locationName, int newRating, String newComment,
          String newTitle) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        String email = currentUser.getEmail();
    
        // Find the user by email
        User user = userRepository.findByEmail(email)
              .orElseThrow(() -> new RuntimeException("User not found"));
    
        // Find the location by name
        Location location = locationRepository.findByName(locationName)
              .orElseThrow(() -> new RuntimeException("Location not found"));
    
        // Find the review by user and location
        Review review = reviewRepository.findByUserAndLocation(user, location)
              .orElseThrow(() -> new RuntimeException("Review not found"));
    
        // Update the review's properties
        review.setRating(newRating);
        review.setComment(newComment);
        review.setTitle(newTitle);
        review.setUpdatedAt(new Date());
    
        return reviewRepository.save(review);
    }
}
