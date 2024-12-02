package com.campus_rating_system.service_tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.campus_rating_system.entities.Task;
import com.campus_rating_system.repositories.TaskRepository;
import com.campus_rating_system.services.TaskService;

/**
 * Unit test class for TaskService, responsible for testing the business logic
 * related to managing tasks within the campus rating system.
 * 
 * <p>Bugs: None known
 *
 * <p>Author: Rithik Rajaram
 */
@ExtendWith(MockitoExtension.class)
public class TaskServiceTests {

    @InjectMocks
    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    /**
     * Test case for addNewTask method.
     * 
     * Verifies that a task is successfully created and saved when valid inputs are provided.
     */
    @Test
    public void testAddNewTaskIsSuccess() {
        // Arrange
        String taskName = "Studying";
        String taskDescription = "Dedicated to academic study sessions.";

        Task mockTask = new Task();
        mockTask.setTaskId(1);
        mockTask.setName(taskName);
        mockTask.setDescription(taskDescription);

        when(taskRepository.save(any(Task.class))).thenReturn(mockTask);

        // Act
        Task result = taskService.addNewTask(taskName, taskDescription);

        // Assert
        verify(taskRepository, times(1)).save(any(Task.class));
        assertEquals(taskName, result.getName(), "Task name should match the input name");
        assertEquals(taskDescription, result.getDescription(), 
              "Task description should match the input description");
    }

    /**
     * Test case for addNewTask method when the task name is null.
     * 
     * Verifies that the service still calls the repository with the provided inputs.
     */
    @Test
    public void testAddNewTaskWhenNullName() {
        // Arrange
        String taskName = null;
        String taskDescription = "A task without a name.";

        Task mockTask = new Task();
        mockTask.setTaskId(2);
        mockTask.setName(taskName);
        mockTask.setDescription(taskDescription);

        when(taskRepository.save(any(Task.class))).thenReturn(mockTask);

        // Act
        Task result = taskService.addNewTask(taskName, taskDescription);

        // Assert
        verify(taskRepository, times(1)).save(any(Task.class));
        assertEquals(taskName, result.getName(), "Task name should be null");
        assertEquals(taskDescription, result.getDescription(), 
              "Task description should match the input description");
    }

    /**
     * Test case for addNewTask method when the description is null.
     * 
     * Verifies that the service still calls the repository with the provided inputs.
     */
    @Test
    public void testAddNewTaskWithNullDescription() {
        // Arrange
        String taskName = "Reading";
        String taskDescription = null;

        Task mockTask = new Task();
        mockTask.setTaskId(3);
        mockTask.setName(taskName);
        mockTask.setDescription(taskDescription);

        when(taskRepository.save(any(Task.class))).thenReturn(mockTask);

        // Act
        Task result = taskService.addNewTask(taskName, taskDescription);

        // Assert
        verify(taskRepository, times(1)).save(any(Task.class));
        assertEquals(taskName, result.getName(), "Task name should match the input name");
        assertEquals(taskDescription, result.getDescription(), "Task description should be null");
    }
}
