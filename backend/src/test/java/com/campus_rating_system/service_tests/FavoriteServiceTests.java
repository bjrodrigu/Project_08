package com.campus_rating_system.service_tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
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

import com.campus_rating_system.entities.Favorite;
import com.campus_rating_system.entities.Location;
import com.campus_rating_system.entities.User;
import com.campus_rating_system.repositories.FavoriteRepository;
import com.campus_rating_system.repositories.LocationRepository;
import com.campus_rating_system.repositories.UserRepository;
import com.campus_rating_system.services.FavoriteService;

/**
 * Unit test class for FavoriteService, responsible for testing business logic
 * related to managing user favorites within the campus rating system.
 * 
 * <p>Bugs: None known
 *
 * <p>Author: Rithik Rajaram
 */
@ExtendWith(MockitoExtension.class)
public class FavoriteServiceTests {

    @InjectMocks
    private FavoriteService favoriteService;

    @Mock
    private FavoriteRepository favoriteRepository;

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
        // Set up a mock authenticated user
        mockUser = new User();
        mockUser.setUserId(1);
        mockUser.setEmail("testuser@example.com");
        SecurityContextHolder.setContext(securityContext);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(mockUser);
    }

    /**
     * Test case for addFavorite method.
     * 
     * Validates that a favorite is successfully created and saved when a
     * valid location name is provided.
     */
    @Test
    public void testAddFavoriteIsSuccess() {
        // Arrange
        String locationName = "Library";
        Location mockLocation = new Location();
        mockLocation.setLocationId(1);
        mockLocation.setName(locationName);

        Favorite mockFavorite = new Favorite();
        mockFavorite.setUser(mockUser);
        mockFavorite.setLocation(mockLocation);

        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.of(mockUser));
        when(locationRepository.findByName(locationName)).thenReturn(Optional.of(mockLocation));
        when(favoriteRepository.save(any(Favorite.class))).thenReturn(mockFavorite);

        // Act
        Favorite result = favoriteService.addFavorite(locationName);

        // Assert
        verify(userRepository, times(1)).findByEmail(mockUser.getEmail());
        verify(locationRepository, times(1)).findByName(locationName);
        verify(favoriteRepository, times(1)).save(any(Favorite.class));

        assertEquals(mockUser, result.getUser(), "The user should match the mock user");
        assertEquals(mockLocation, result.getLocation(),
              "The location should match the mock location");
    }

    /**
     * Test case for addFavorite method when user is not found.
     * 
     * Verifies that a RuntimeException is thrown when the user cannot
     * be retrieved by email.
     */
    @Test
    public void testAddFavoriteWhenUserNotFound() {
        // Arrange
        String locationName = "Library";
        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            favoriteService.addFavorite(locationName);
        });

        assertEquals("User not found", exception.getMessage());
        verify(userRepository, times(1)).findByEmail(mockUser.getEmail());
        verifyNoInteractions(locationRepository);
        verifyNoInteractions(favoriteRepository);
    }

    /**
     * Test case for addFavorite method when location is not found.
     * 
     * Verifies that a RuntimeException is thrown when the location cannot
     * be retrieved by name.
     */
    @Test
    public void testAddFavoriteWhenLocationNotFound() {
        // Arrange
        String locationName = "Library";
        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.of(mockUser));
        when(locationRepository.findByName(locationName)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            favoriteService.addFavorite(locationName);
        });

        assertEquals("Location not found", exception.getMessage());
        verify(userRepository, times(1)).findByEmail(mockUser.getEmail());
        verify(locationRepository, times(1)).findByName(locationName);
        verifyNoInteractions(favoriteRepository);
    }

    /**
     * Test case for getFavoriteLocations method.
     * 
     * Validates that the correct list of favorite locations is retrieved
     * for the authenticated user.
     */
    @Test
    public void testGetFavoriteLocations() {
        // Arrange
        Location location1 = new Location();
        location1.setName("Library");

        Location location2 = new Location();
        location2.setName("Cafeteria");

        Favorite favorite1 = new Favorite();
        favorite1.setLocation(location1);

        Favorite favorite2 = new Favorite();
        favorite2.setLocation(location2);

        mockUser.setFavorites(List.of(favorite1, favorite2));
        when(userRepository.findByEmail(mockUser.getEmail())).thenReturn(Optional.of(mockUser));

        // Act
        List<Location> result = favoriteService.getFavoriteLocations();

        // Assert
        verify(userRepository, times(1)).findByEmail(mockUser.getEmail());
        assertEquals(2, result.size(), "The list of favorite locations should contain 2 items");
        assertEquals("Library", result.get(0).getName(), "The first location should be 'Library'");
        assertEquals("Cafeteria", result.get(1).getName(), 
              "The second location should be 'Cafeteria'");
    }
}
