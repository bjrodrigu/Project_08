package com.campus_rating_system.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.Location;
import com.campus_rating_system.entities.LocationTask;
import com.campus_rating_system.entities.Task;
import com.campus_rating_system.repositories.LocationRepository;
import com.campus_rating_system.repositories.LocationTaskRepository;
import com.campus_rating_system.repositories.TaskRepository;

/**
 * Service class responsible for managing the association of tasks with specific locations.
 * This class includes methods to facilitate the creation of a LocationTask by fetching
 * both Task and Location entities by their names.
 *
 * <p>Bugs: None known
 *
 * @author Rithik Rajaram
 */
@Service
public class LocationTaskService {

    @Autowired
    private final LocationTaskRepository locationTaskRepository;

    @Autowired
    private final TaskRepository taskRepository;

    @Autowired
    private final LocationRepository locationRepository;

    /**
     * Constructs a LocationTaskService with repositories for managing location-task associations,
     * as well as accessing location and task data.
     *
     * @param locationTaskRepository the repository for LocationTask entities
     * @param taskRepository the repository for Task entities
     * @param locationRepository the repository for Location entities
     */
    public LocationTaskService(LocationTaskRepository locationTaskRepository, TaskRepository taskRepository, LocationRepository locationRepository) {
        this.locationTaskRepository = locationTaskRepository;
        this.taskRepository = taskRepository;
        this.locationRepository = locationRepository;
    }

    /**
     * Adds a new LocationTask by associating a task with a location, using the task name and
     * location name to look up the respective entities. Throws an exception if either entity
     * cannot be found by the provided name.
     *
     * @param taskName the name of the task to be associated with the location
     * @param locationName the name of the location to associate the task with
     * @return the saved LocationTask entity containing the task and location association
     * @throws RuntimeException if the task or location is not found in the system
     */
    public LocationTask addLocationTask(String taskName, String locationName) {
        // Fetch the Task entity by name
        Task task = taskRepository.findByName(taskName).orElseThrow(() -> new RuntimeException("Task not found"));
        // Fetch the Location entity by name
        Location location = locationRepository.findByName(locationName).orElseThrow(() -> new RuntimeException("Location not found"));
        
        // Create a new LocationTask instance and set its properties
        LocationTask locationTask = new LocationTask();
        locationTask.setTask(task);
        locationTask.setLocation(location);
        
        return locationTaskRepository.save(locationTask);
    }
}
