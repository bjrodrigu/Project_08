package com.campus_rating_system.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.Location;
import com.campus_rating_system.repositories.LocationRepository;

/**
 * Service class responsible for handling operations related to locations within the campus rating system.
 * This class abstracts the data access layer and provides methods to perform business logic
 * associated with locations, such as adding new locations.
 *
 * <p>Bugs: None known
 *
 * @author Rithik Rajaram
 */
@Service
public class LocationService {

    @Autowired
    private final LocationRepository locationRepository;

    /**
     * Constructor for LocationService, injecting the LocationRepository dependency.
     * This setup facilitates the decoupling of data access from business logic.
     *
     * @param locationRepository the repository interface for accessing location data
     */
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    /**
     * Adds a new location to the system by creating a Location entity with the provided details and
     * saving it to the database. This method sets the creation and update timestamps, ensuring they
     * are recorded at the time of insertion.
     *
     * @param name the name of the location (e.g., "Central Library")
     * @param description a description of the location (e.g., "A large library with study rooms")
     * @param latitude the geographic latitude of the location
     * @param longitude the geographic longitude of the location
     * @param address the physical address of the location
     * @param category the category or type of location (e.g., "Library")
     * @return the saved Location entity containing the newly added location information
     */
    public Location addNewLocation(String name, String description, float latitude, float longitude, String address, String category) {
        Location location = new Location();
        location.setName(name);
        location.setDescription(description);
        location.setLatitude(latitude);
        location.setLongitude(longitude);
        location.setAddress(address);
        location.setCreatedAt(new Date());
        location.setUpdatedAt(new Date());
        location.setCategory(category);

        return locationRepository.save(location);
    }
}
