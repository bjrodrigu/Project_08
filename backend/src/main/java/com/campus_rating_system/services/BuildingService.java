package com.campus_rating_system.services;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.Building;
import com.campus_rating_system.repositories.BuildingRepository;

/**
 * Service class responsible for handling operations related to buildings within the
 * campus rating system.
 *
 */
@Service
public class BuildingService {

    @Autowired
    private final BuildingRepository buildingRepository;

    /**
     * Constructor for BuildingService, injecting the BuildingRepository dependency.
     *
     * @param buildingRepository the repository interface for accessing building data
     */
    public BuildingService(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    /**
     * Adds a new building to the system by creating a Building entity with the provided details and
     * saving it to the database.
     *
     * @param name the name of the building
     * @param longitude the longitude of the building
     * @param latitude the latitude of the building
     * @param address the physical address of the location
     * @return the saved Building entity containing the newly added building information
     */
    public Building addNewBuilding(String name, Float longitude, Float latitude, String address) {
        Building building = new Building();
        building.setName(name);
        building.setLongitude(longitude);
        building.setLatitude(latitude);
        building.setAddress(address);
        building.setCreatedAt(new Date());
        building.setUpdatedAt(new Date());

        return buildingRepository.save(building);
    }
}
