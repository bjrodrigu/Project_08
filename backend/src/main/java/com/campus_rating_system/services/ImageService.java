package com.campus_rating_system.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.Image;
import com.campus_rating_system.entities.Location;
import com.campus_rating_system.repositories.ImageRepository;
import com.campus_rating_system.repositories.LocationRepository;

/**
 * Service class responsible for handling image-related operations, including
 * associating an image URL with a specified location.
 *
 * <p>Bugs: None known
 *
 * @Author Rithik Rajaram
 */
@Service
public class ImageService {

    @Autowired
    private final ImageRepository imageRepository;

    @Autowired
    private final LocationRepository locationRepository;

    public ImageService(ImageRepository imageRepository, LocationRepository locationRepository) {
        this.imageRepository = imageRepository;
        this.locationRepository = locationRepository;
    }

    /**
     * Adds a new image URL associated with a location identified by its name.
     * Throws an exception if the specified location is not found.
     *
     * @param imageUrl the URL of the image
     * @param locationName the name of the location to associate with the image
     * @return the saved Image entity containing the image URL, metadata, and location association
     * @throws RuntimeException if the location is not found
     */
    public Image addImageUrl(String imageUrl, String locationName) {
        // Fetch the Location entity by name
        Location location = locationRepository.findByName(locationName)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        // Create and save the Image entity with the associated Location
        Image image = new Image();
        image.setUrl(imageUrl);
        image.setLocation(location);
        image.setUploadedAt(new Date());
        
        return imageRepository.save(image);
    }
}
