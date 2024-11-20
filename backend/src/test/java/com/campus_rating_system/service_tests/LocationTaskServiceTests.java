package com.campus_rating_system.service_tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.campus_rating_system.entities.Location;
import com.campus_rating_system.entities.LocationTask;
import com.campus_rating_system.entities.Task;
import com.campus_rating_system.repositories.LocationRepository;
import com.campus_rating_system.repositories.LocationTaskRepository;
import com.campus_rating_system.repositories.TaskRepository;
import com.campus_rating_system.services.LocationTaskService;

/**
 * Unit test class for LocationTaskService, responsible for testing the logic
 * related to associating tasks with specific locations in the campus rating system.
 * 
 * <p>Bugs: None known
 *
 * <p>Author: Rithik Rajaram
 */
@ExtendWith(MockitoExtension.class)
public class LocationTaskServiceTests {

    @InjectMocks
    private LocationTaskService locationTaskService;

    @Mock
    private LocationTaskRepository locationTaskRepository;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private LocationRepository locationRepository;

    /**
     * Test case for addLocationTask method.
     * 
     * Verifies that a LocationTask is successfully created and associated with a task and location
     * when valid names are provided.
     */
    @Test
    public void testAddLocationTaskIsSuccess() {
        // Arrange
        String taskName = "Study";
        String locationName = "Library";

        Task mockTask = new Task();
        mockTask.setTaskId(1);
        mockTask.setName(taskName);

        Location mockLocation = new Location();
        mockLocation.setLocationId(1);
        mockLocation.setName(locationName);

        LocationTask mockLocationTask = new LocationTask();
        mockLocationTask.setTask(mockTask);
        mockLocationTask.setLocation(mockLocation);

        when(taskRepository.findByName(taskName)).thenReturn(Optional.of(mockTask));
        when(locationRepository.findByName(locationName)).thenReturn(Optional.of(mockLocation));
        when(locationTaskRepository.save(any(LocationTask.class))).thenReturn(mockLocationTask);

        // Act
        LocationTask result = locationTaskService.addLocationTask(taskName, locationName);

        // Assert
        verify(taskRepository, times(1)).findByName(taskName);
        verify(locationRepository, times(1)).findByName(locationName);
        verify(locationTaskRepository, times(1)).save(any(LocationTask.class));

        assertEquals(mockTask, result.getTask(), "The task should match the mock task");
        assertEquals(mockLocation, result.getLocation(),
               "The location should match the mock location");
    }

    /**
     * Test case for addLocationTask method when the task is not found.
     * 
     * Verifies that a RuntimeException is thrown when the task cannot be retrieved by its name.
     */
    @Test
    public void testAddLocationTaskWhenTaskNotFound() {
        // Arrange
        String taskName = "Nonexistent Task";
        String locationName = "Library";

        when(taskRepository.findByName(taskName)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            locationTaskService.addLocationTask(taskName, locationName);
        });

        assertEquals("Task not found", exception.getMessage());
        verify(taskRepository, times(1)).findByName(taskName);
        verifyNoInteractions(locationRepository);
        verifyNoInteractions(locationTaskRepository);
    }

    /**
     * Test case for addLocationTask method when the location is not found.
     * 
     * Verifies that a RuntimeException is thrown when the location cannot be retrieved by its name.
     */
    @Test
    public void testAddLocationTaskWhenLocationNotFound() {
        // Arrange
        String taskName = "Study";
        String locationName = "Nonexistent Location";

        Task mockTask = new Task();
        mockTask.setTaskId(1);
        mockTask.setName(taskName);

        when(taskRepository.findByName(taskName)).thenReturn(Optional.of(mockTask));
        when(locationRepository.findByName(locationName)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            locationTaskService.addLocationTask(taskName, locationName);
        });

        assertEquals("Location not found", exception.getMessage());
        verify(taskRepository, times(1)).findByName(taskName);
        verify(locationRepository, times(1)).findByName(locationName);
        verifyNoInteractions(locationTaskRepository);
    }
}
