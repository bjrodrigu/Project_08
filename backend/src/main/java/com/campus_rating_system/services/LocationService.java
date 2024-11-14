package com.campus_rating_system.services;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.dtos.LocationWithTasksDTO;
import com.campus_rating_system.entities.Building;
import com.campus_rating_system.entities.Location;
import com.campus_rating_system.repositories.BuildingRepository;
import com.campus_rating_system.repositories.LocationRepository;

/**
 * Service class responsible for handling operations related to locations within the
 * campus rating system.
 * This class abstracts the data access layer and provides methods to perform business logic
 * associated with locations, such as adding new locations.
 *
 * <p>Bugs: None known
 *
 */
@Service
public class LocationService {

    @Autowired
    private final LocationRepository locationRepository;
    
    @Autowired
    private final BuildingRepository buildingRepository;

    /**
     * Constructor for LocationService, injecting the Location & Building Repository dependency.
     * This setup facilitates the decoupling of data access from business logic.
     *
     * @param locationRepository the repository interface for accessing location data
     * @param buildingRepository the repository interface for accessing building data
     */
    public LocationService(LocationRepository locationRepository, 
          BuildingRepository buildingRepository) {

        this.locationRepository = locationRepository;
        this.buildingRepository = buildingRepository;
    }

    /**
     * Adds a new location to the system by creating a Location entity with the provided details and
     * saving it to the database. This method sets the creation and update timestamps, ensuring they
     * are recorded at the time of insertion.
     *
     * @param name the name of the location (e.g., "Central Library")
     * @param description a description of the location (e.g., "A large library with study rooms")
     * @param address the physical address of the location
     * @param category the category or type of location (e.g., "Library")
     * @param buildingName the name of the building associated with the location
     * @return the saved Location entity containing the newly added location information
     */
    public Location addNewLocation(String name,
                                   String description,
                                   String address,
                                   String category,
                                   String buildingName) {
        Location location = new Location();
        location.setName(name);
        location.setDescription(description);
        location.setAddress(address);
        location.setCategory(category);
        location.setCreatedAt(new Date());
        location.setUpdatedAt(new Date());

        // Set the associated building
        Building building = buildingRepository.findByName(buildingName).orElse(null);
        location.setBuilding(building);

        return locationRepository.save(location);
    }

    public List<LocationWithTasksDTO> getLocations() {
        List<Location> locations = locationRepository.findAll();

        return locations.stream().map(location -> {
            LocationWithTasksDTO dto = new LocationWithTasksDTO();
            dto.setLocationId(location.getLocationId());
            dto.setName(location.getName());
            dto.setDescription(location.getDescription());
            dto.setCategory(location.getCategory());
            dto.setAddress(location.getAddress());
            dto.setCreatedAt(location.getCreatedAt());
            dto.setUpdatedAt(location.getUpdatedAt());
            dto.setBuildingName(location.getBuilding().getName());

            // Populate task names
            List<String> taskNames = location.getLocationTasks().stream()
                  .map(locationTask -> locationTask.getTask().getName())
                  .collect(Collectors.toList());

            dto.setTaskNames(taskNames);
            return dto;
        }).collect(Collectors.toList());
    }
}
