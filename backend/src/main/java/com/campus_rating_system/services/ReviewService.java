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

@Service
public class ReviewService {
    
    @Autowired
    private final ReviewRepository reviewRepository;
    
    @Autowired
    private final UserRepository userRepository;
    
    @Autowired
    private final LocationRepository locationRepository;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, LocationRepository locationRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
    }

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
