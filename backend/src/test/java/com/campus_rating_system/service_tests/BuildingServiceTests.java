package com.campus_rating_system.service_tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.campus_rating_system.entities.Building;
import com.campus_rating_system.repositories.BuildingRepository;
import com.campus_rating_system.services.BuildingService;

/**
 * Unit test class for BuildingService, responsible for testing business logic
 * related to building operations in isolation from other application layers.
 * 
 * <p>Bugs: None known
 *
 * <p>Author: Rithik Rajaram
 */
@ExtendWith(MockitoExtension.class)
public class BuildingServiceTests {

    @InjectMocks
    private BuildingService buildingService; // The service being tested

    @Mock
    private BuildingRepository buildingRepository; // Mocked dependency for the service

    /**
     * Test case for the addNewBuilding method.
     * 
     * Validates that a new Building entity is correctly created, populated with
     * the provided details, and saved via the BuildingRepository.
     */
    @Test
    public void testAddNewBuilding() {
        // Arrange
        String name = "Engineering Hall";
        Float longitude = -89.4125f;
        Float latitude = 43.0739f;

        // Mocked result of repository save
        Building savedBuilding = new Building();
        savedBuilding.setName(name);
        savedBuilding.setLongitude(longitude);
        savedBuilding.setLatitude(latitude);
        savedBuilding.setCreatedAt(new Date());
        savedBuilding.setUpdatedAt(new Date());

        // Mock the repository save behavior
        when(buildingRepository.save(any(Building.class))).thenReturn(savedBuilding);

        // Act
        Building result = buildingService.addNewBuilding(name, longitude, latitude);

        // Assert
        // Verify that the repository's save method was called once
        verify(buildingRepository, times(1)).save(any(Building.class));

        // Check that the returned entity matches the mocked saved entity
        assertEquals(name, result.getName(), "Building name should match");
        assertEquals(longitude, result.getLongitude(), "Longitude should match");
        assertEquals(latitude, result.getLatitude(), "Latitude should match");
    }

    /**
     * Test case for addNewBuilding method with null inputs.
     * 
     * Verifies the behavior when the input details are incomplete or invalid.
     * (This test assumes no validation logic exists in the service.)
     */
    @Test
    public void testAddNewBuildingWithNullInputs() {
        // Arrange
        String name = null;
        Float longitude = null;
        Float latitude = null;

        // Mock the repository save behavior
        when(buildingRepository.save(any(Building.class))).thenAnswer(invocation -> {
            Building building = invocation.getArgument(0);
            return building; // Simulate returning the same entity
        });

        // Act
        Building result = buildingService.addNewBuilding(name, longitude, latitude);

        // Assert
        verify(buildingRepository, times(1)).save(any(Building.class));
        assertEquals(name, result.getName(), "Building name should match null input");
        assertEquals(longitude, result.getLongitude(), "Longitude should match null input");
        assertEquals(latitude, result.getLatitude(), "Latitude should match null input");
    }
}
