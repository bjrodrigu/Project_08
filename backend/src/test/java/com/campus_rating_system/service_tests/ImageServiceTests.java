package com.campus_rating_system.service_tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.campus_rating_system.entities.Image;
import com.campus_rating_system.entities.Location;
import com.campus_rating_system.repositories.ImageRepository;
import com.campus_rating_system.repositories.LocationRepository;
import com.campus_rating_system.services.ImageService;

/**
 * Unit test class for ImageService, responsible for testing business logic
 * related to image operations within the campus rating system.
 * 
 * <p>Bugs: None known
 *
 * <p>Author: Rithik Rajaram
 */
@ExtendWith(MockitoExtension.class)
public class ImageServiceTests {

    @InjectMocks
    private ImageService imageService;

    @Mock
    private ImageRepository imageRepository;

    @Mock
    private LocationRepository locationRepository;

    /**
     * Test case for addImageUrl method.
     * 
     * Verifies that an image is successfully added when a valid location name is provided.
     */
    @Test
    public void testAddImageUrlIsSuccess() {
        // Arrange
        String imageUrl = "https://example.com/image.jpg";
        String locationName = "Library";

        Location mockLocation = new Location();
        mockLocation.setLocationId(1);
        mockLocation.setName(locationName);

        Image mockImage = new Image();
        mockImage.setUrl(imageUrl);
        mockImage.setLocation(mockLocation);
        mockImage.setUploadedAt(new Date());

        when(locationRepository.findByName(locationName)).thenReturn(Optional.of(mockLocation));
        when(imageRepository.save(any(Image.class))).thenReturn(mockImage);

        // Act
        Image result = imageService.addImageUrl(imageUrl, locationName);

        // Assert
        verify(locationRepository, times(1)).findByName(locationName);
        verify(imageRepository, times(1)).save(any(Image.class));
        assertEquals(imageUrl, result.getUrl(), "Image URL should match the input URL");
        assertEquals(mockLocation, result.getLocation(), 
              "The location should match the mock location");
    }

    /**
     * Test case for addImageUrl method when location is not found.
     * 
     * Verifies that a RuntimeException is thrown when the location cannot
     * be retrieved by name.
     */
    @Test
    public void testAddImageUrlWhenLocationNotFound() {
        // Arrange
        String imageUrl = "https://example.com/image.jpg";
        String locationName = "Nonexistent Location";

        when(locationRepository.findByName(locationName)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imageService.addImageUrl(imageUrl, locationName);
        });

        assertEquals("Location not found", exception.getMessage());
        verify(locationRepository, times(1)).findByName(locationName);
        verifyNoInteractions(imageRepository);
    }
}
