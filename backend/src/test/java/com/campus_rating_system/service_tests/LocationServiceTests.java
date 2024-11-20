package com.campus_rating_system.service_tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.campus_rating_system.dtos.LocationWithTasksDTO;
import com.campus_rating_system.entities.Building;
import com.campus_rating_system.entities.Location;
import com.campus_rating_system.entities.LocationTask;
import com.campus_rating_system.entities.Task;
import com.campus_rating_system.repositories.BuildingRepository;
import com.campus_rating_system.repositories.LocationRepository;
import com.campus_rating_system.services.LocationService;

/**
 * Unit test class for LocationService, responsible for testing business logic
 * related to location operations in the campus rating system.
 * 
 * <p>Bugs: None known
 *
 * <p>Author: Rithik Rajaram
 */
@ExtendWith(MockitoExtension.class)
public class LocationServiceTests {

    @InjectMocks
    private LocationService locationService;

    @Mock
    private LocationRepository locationRepository;

    @Mock
    private BuildingRepository buildingRepository;

    /**
     * Test case for addNewLocation method.
     * 
     * Verifies that a location is successfully created and associated with a building
     * when valid inputs are provided.
     */
    @Test
    public void testAddNewLocationIsSuccess() {
        // Arrange
        String locationName = "Central Library";
        String description = "A large library with study rooms";
        String address = "123 Library Lane";
        String category = "Library";
        String buildingName = "Main Building";

        Building mockBuilding = new Building();
        mockBuilding.setBuildingId(1);
        mockBuilding.setName(buildingName);

        Location mockLocation = new Location();
        mockLocation.setName(locationName);
        mockLocation.setDescription(description);
        mockLocation.setAddress(address);
        mockLocation.setCategory(category);
        mockLocation.setBuilding(mockBuilding);

        when(buildingRepository.findByName(buildingName)).thenReturn(Optional.of(mockBuilding));
        when(locationRepository.save(any(Location.class))).thenReturn(mockLocation);

        // Act
        Location result = locationService.addNewLocation(locationName, 
               description, address, category, buildingName);

        // Assert
        verify(buildingRepository, times(1)).findByName(buildingName);
        verify(locationRepository, times(1)).save(any(Location.class));
        assertEquals(locationName, result.getName(), "Location name should match the input name");
        assertEquals(mockBuilding, result.getBuilding(), 
              "The building should match the mock building");
    }

    /**
     * Test case for addNewLocation method when building is not found.
     * 
     * Verifies that a location is successfully created without a building
     * if the building is not found.
     */
    @Test
    public void testAddNewLocationWhenBuildingNotFound() {
        // Arrange
        String locationName = "Central Library";
        String description = "A large library with study rooms";
        String address = "123 Library Lane";
        String category = "Library";
        String buildingName = "Nonexistent Building";

        Location mockLocation = new Location();
        mockLocation.setName(locationName);
        mockLocation.setDescription(description);
        mockLocation.setAddress(address);
        mockLocation.setCategory(category);
        mockLocation.setBuilding(null);

        when(buildingRepository.findByName(buildingName)).thenReturn(Optional.empty());
        when(locationRepository.save(any(Location.class))).thenReturn(mockLocation);

        // Act
        Location result = locationService.addNewLocation(locationName, 
              description, address, category, buildingName);

        // Assert
        verify(buildingRepository, times(1)).findByName(buildingName);
        verify(locationRepository, times(1)).save(any(Location.class));
        assertEquals(locationName, result.getName(), "Location name should match the input name");
        assertNull(result.getBuilding(), "Building should be null if not found");
    }

    /**
     * Test case for getLocations method.
     * 
     * Verifies that all locations are correctly retrieved and converted to DTOs
     * with associated task names.
     */
    @Test
    public void testGetLocationsIsSuccess() {
        // Arrange
        Building mockBuilding = new Building();
        mockBuilding.setName("Main Building");

        Location location1 = new Location();
        location1.setLocationId(1);
        location1.setName("Library");
        location1.setDescription("A library with study spaces");
        location1.setCategory("Library");
        location1.setAddress("123 Library Lane");
        location1.setCreatedAt(new Date());
        location1.setUpdatedAt(new Date());
        location1.setBuilding(mockBuilding);

        Task task1 = new Task();
        task1.setName("Study");

        LocationTask locationTask1 = new LocationTask();
        locationTask1.setTask(task1);

        location1.setLocationTasks(List.of(locationTask1));

        when(locationRepository.findAll()).thenReturn(List.of(location1));

        // Act
        List<LocationWithTasksDTO> result = locationService.getLocations();

        // Assert
        verify(locationRepository, times(1)).findAll();
        assertEquals(1, result.size(), "There should be one location in the result");
        LocationWithTasksDTO dto = result.get(0);
        assertEquals("Library", dto.getName(), "The location name should match the input name");
        assertEquals("Study", dto.getTaskNames().get(0),
              "The task name should match the input task name");
    }
}
