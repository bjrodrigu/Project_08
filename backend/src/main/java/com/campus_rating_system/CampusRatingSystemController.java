package com.campus_rating_system;

import org.springframework.web.bind.annotation.RestController;

import com.campus_rating_system.services.*;
import com.campus_rating_system.entities.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Main controller class for the Campus Rating System API. This class defines endpoints for
 * creating users, locations, reviews, and tasks, each interacting with respective service
 * classes to manage business logic and persistence.
 *
 * <p>Bugs: None known
 *
 * @Author Rithik Rajaram
 */
@RestController
public class CampusRatingSystemController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final LocationService locationService;
    @Autowired
    private final ReviewService reviewService;
    @Autowired
    private final TaskService taskService;
    @Autowired
    private final LocationTaskService locationTaskService;
    @Autowired
    private final FavoriteService favoriteService;
    @Autowired
    private final ImageService imageService;

    /**
     * Constructs a CampusRatingSystemController with services for managing users, locations,
     * reviews, tasks, locationtasks, and favorites. Each service is injected to support API 
     * endpoints that delegate operations to the corresponding service layer.
     *
     * @param userService the service for handling user operations
     * @param locationService the service for handling location operations
     * @param reviewService the service for handling review operations
     * @param taskService the service for handling task operations
     */
    public CampusRatingSystemController(UserService userService, LocationService locationService, 
    ReviewService reviewService, TaskService taskService, LocationTaskService locationTaskService, 
    FavoriteService favoriteService, ImageService imageService) {

        this.userService = userService;
        this.locationService = locationService;
        this.reviewService = reviewService;
        this.taskService = taskService;
        this.locationTaskService = locationTaskService;
        this.favoriteService = favoriteService;
        this.imageService = imageService;
    }

    /**
     * Endpoint to add a new user to the system.
     *
     * @param username the name of the new user
     * @param email the email of the new user
     * @return a ResponseEntity containing the newly created User and a CREATED status
     */
    @PostMapping("/user/addUser")
    public ResponseEntity<User> addNewUser(
            @RequestParam String username,
            @RequestParam String email) {

        User newUser = userService.addNewUser(username, email);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    /**
     * Endpoint to add a new location to the system.
     *
     * @param name the name of the location
     * @param description a brief description of the location
     * @param latitude the latitude coordinate of the location
     * @param longitude the longitude coordinate of the location
     * @param address the physical address of the location
     * @param category the category or type of location (e.g., library, park)
     * @return a ResponseEntity containing the newly created Location and a CREATED status
     */
    @PostMapping("/location/addLocation")
    public ResponseEntity<Location> addNewLocation(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam float latitude,
            @RequestParam float longitude,
            @RequestParam String address,
            @RequestParam String category) {

        Location newLocation = locationService.addNewLocation(name, description, latitude, longitude, address, category);
        return new ResponseEntity<>(newLocation, HttpStatus.CREATED);
    }

    /**
     * Endpoint to add a new review for a location.
     *
     * @param email the email of the user submitting the review
     * @param locationName the name of the location being reviewed
     * @param rating an integer rating for the location
     * @param comment a textual comment describing the user's experience
     * @return a ResponseEntity containing the newly created Review and a CREATED status
     */
    @PostMapping("/review/addReview")
    public ResponseEntity<Review> addReview(
        @RequestParam String email,
        @RequestParam String locationName, 
        @RequestParam int rating,
        @RequestParam String comment) {

        Review newReview = reviewService.addNewReview(email, locationName, rating, comment);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    /**
     * Endpoint to add a new task to the system.
     *
     * @param name the name of the task
     * @param description a description of the task's purpose
     * @return a ResponseEntity containing the newly created Task and a CREATED status
     */
    @PostMapping("/task/addTask")
    public ResponseEntity<Task> addTask(
            @RequestParam String name,
            @RequestParam String description) {

        Task newTask = taskService.addNewTask(name, description);
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    /**
     * Endpoint to add a new LocationTask, associating a task with a location by their names.
     *
     * @param taskName the name of the task to associate with the location
     * @param locationName the name of the location to associate with the task
     * @return a ResponseEntity containing the newly created LocationTask and a CREATED status
     */
    @PostMapping("/locationTask/addLocationTask")
    public ResponseEntity<LocationTask> addLocationTask(
            @RequestParam String taskName,
            @RequestParam String locationName) {

        LocationTask newLocationTask = locationTaskService.addLocationTask(taskName, locationName);
        return new ResponseEntity<>(newLocationTask, HttpStatus.CREATED);
    }

    /**
     * Endpoint to add a new Favorite, associating a user and location by their respective
     * email and name.
     *
     * @param email the email of the user marking the location as favorite
     * @param locationName the name of the location to be marked as favorite
     * @return a ResponseEntity containing the newly created Favorite and a CREATED status
     */
    @PostMapping("/favorite/addFavorite")
    public ResponseEntity<Favorite> addFavorite(
            @RequestParam String email,
            @RequestParam String locationName) {

        Favorite newFavorite = favoriteService.addFavorite(email, locationName);
        return new ResponseEntity<>(newFavorite, HttpStatus.CREATED);
    }

    /**
     * Endpoint to add a new image URL associated with a specific location.
     *
     * @param imageUrl the URL of the image to store
     * @param locationName the name of the location to associate with the image
     * @return a ResponseEntity containing the saved Image entity and a CREATED status
     */
    @PostMapping("/image/addImage")
    public ResponseEntity<Image> addImageUrl(
            @RequestParam("imageUrl") String imageUrl,
            @RequestParam("locationName") String locationName) {

        Image savedImage = imageService.addImageUrl(imageUrl, locationName);
        return new ResponseEntity<>(savedImage, HttpStatus.CREATED);
    }
}
