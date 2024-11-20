package com.campus_rating_system.service_tests;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.campus_rating_system.entities.Location;
import com.campus_rating_system.entities.Review;
import com.campus_rating_system.entities.User;
import com.campus_rating_system.repositories.LocationRepository;
import com.campus_rating_system.repositories.ReviewRepository;
import com.campus_rating_system.repositories.UserRepository;
import com.campus_rating_system.services.ReviewService;

/**
 * Unit test class for ReviewService, responsible for testing the business logic
 * related to managing reviews in the campus rating system.
 * 
 * <p>Bugs: None known
 *
 * <p>Author: Rithik Rajaram
 */
@ExtendWith(MockitoExtension.class)
public class ReviewServiceTests {

    @InjectMocks
    private ReviewService reviewService;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private LocationRepository locationRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    private User mockUser;

    @BeforeEach
    public void setUp() {
        mockUser = new User();
        mockUser.setUserId(1);
        mockUser.setEmail("testuser@example.com");

        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(mockUser);
    }

    /**
     * Test case for addNewReview method.
     * 
     * Verifies that a review is successfully created and saved when valid inputs are provided.
     */
    @Test
    public void testAddNewReviewIsSuccess() {
        // Arrange
        String locationName = "Library";
        int rating = 5;
        String comment = "Great study spot!";
        String title = "Excellent Library";

        Location mockLocation = new Location();
        mockLocation.setLocationId(1);
        mockLocation.setName(locationName);

        Review mockReview = new Review();
        mockReview.setUser(mockUser);
        mockReview.setLocation(mockLocation);
        mockReview.setRating(rating);
        mockReview.setComment(comment);
        mockReview.setTitle(title);

        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.of(mockUser));
        when(locationRepository.findByName(locationName)).thenReturn(Optional.of(mockLocation));
        when(reviewRepository.save(any(Review.class))).thenReturn(mockReview);

        // Act
        Review result = reviewService.addNewReview(locationName, rating, comment, title);

        // Assert
        verify(userRepository, times(1)).findByEmail(mockUser.getEmail());
        verify(locationRepository, times(1)).findByName(locationName);
        verify(reviewRepository, times(1)).save(any(Review.class));

        assertEquals(mockUser, result.getUser(), "User should match the mock user");
        assertEquals(mockLocation, result.getLocation(), "Location should match the mock location");
        assertEquals(rating, result.getRating(), "Rating should match the input rating");
        assertEquals(comment, result.getComment(), "Comment should match the input comment");
        assertEquals(title, result.getTitle(), "Title should match the input title");
    }

    /**
     * Test case for addNewReview method when user is not found.
     */
    @Test
    public void testAddNewReviewWhenUserNotFound() {
        // Arrange
        String locationName = "Library";
        int rating = 5;
        String comment = "Great study spot!";
        String title = "Excellent Library";

        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            reviewService.addNewReview(locationName, rating, comment, title);
        });

        assertEquals("User not found", exception.getMessage());
        verify(userRepository, times(1)).findByEmail(mockUser.getEmail());
        verifyNoInteractions(locationRepository, reviewRepository);
    }

    /**
     * Test case for deleteReview method.
     * 
     * Verifies that a review is successfully deleted when valid inputs are provided.
     */
    @Test
    public void testDeleteReviewIsSuccess() {
        // Arrange
        String locationName = "Library";

        Location mockLocation = new Location();
        mockLocation.setLocationId(1);
        mockLocation.setName(locationName);

        Review mockReview = new Review();
        mockReview.setUser(mockUser);
        mockReview.setLocation(mockLocation);

        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.of(mockUser));
        when(locationRepository.findByName(locationName)).thenReturn(Optional.of(mockLocation));
        when(reviewRepository.findByUserAndLocation(mockUser, mockLocation)).
              thenReturn(Optional.of(mockReview));

        // Act
        reviewService.deleteReview(locationName);

        // Assert
        verify(userRepository, times(1)).findByEmail(mockUser.getEmail());
        verify(locationRepository, times(1)).findByName(locationName);
        verify(reviewRepository, times(1)).findByUserAndLocation(mockUser, mockLocation);
        verify(reviewRepository, times(1)).delete(mockReview);
    }

    /**
     * Test case for deleteReview method when the review is not found.
     */
    @Test
    public void testDeleteReviewWhenReviewNotFound() {
        // Arrange
        String locationName = "Library";

        Location mockLocation = new Location();
        mockLocation.setLocationId(1);
        mockLocation.setName(locationName);

        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.of(mockUser));
        when(locationRepository.findByName(locationName)).thenReturn(Optional.of(mockLocation));
        when(reviewRepository.findByUserAndLocation(mockUser, mockLocation)).
              thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            reviewService.deleteReview(locationName);
        });

        assertEquals("Review not found", exception.getMessage());
        verify(userRepository, times(1)).findByEmail(mockUser.getEmail());
        verify(locationRepository, times(1)).findByName(locationName);
        verify(reviewRepository, times(1)).findByUserAndLocation(mockUser, mockLocation);
        verify(reviewRepository, never()).delete(any());
    }
}
