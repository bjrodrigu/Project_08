package com.campus_rating_system.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.Location;
import com.campus_rating_system.entities.Task;
import com.campus_rating_system.repositories.TaskRepository;

/**
 * Service class responsible for managing tasks within the campus rating system.
 * This class provides methods to handle task-related business logic, abstracting
 * data access details from higher layers in the application.
 *
 * <p>Bugs: None known
 *
 * @author Rithik Rajaram
 */
@Service
public class TaskService {

    @Autowired
    private final TaskRepository taskRepository;

    /**
     * Constructs a TaskService with the specified repository for handling task data.
     * The repository dependency is injected to enable data operations on task entities.
     *
     * @param taskRepository the repository interface for accessing task data
     */
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Adds a new task to the system by creating a Task entity with the given name
     * and description, then saving it to the database.
     *
     * @param name the name of the task (e.g., "Eating, Reading, Studying")
     * @param description a brief description of the task's purpose or details
     * @return the saved Task entity containing the newly added task information
     */
    public Task addNewTask(String name, String description) {
        Task task = new Task();
        task.setName(name);
        task.setDescription(description);

        return taskRepository.save(task);
    }

    /**
     * Gets all tasks in the system by querying the task repository.
     * 
     * @return a list of all tasks in the system
     */
    public List<Task> getTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks;
    }
}
