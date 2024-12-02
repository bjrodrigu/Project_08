package com.campus_rating_system;

import com.campus_rating_system.config.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.campus_rating_system.services.*;
import com.campus_rating_system.entities.*;
import com.campus_rating_system.dtos.*;

import java.util.List;

import org.springframework.http.ResponseEntity;

/**
 * Main controller class for the Campus Rating System API. This class defines
 * endpoints for
 * creating users, locations, reviews, and tasks, each interacting with
 * respective service
 * classes to manage business logic and persistence.
 *
 * <p>
 * Bugs: None known
 *
 * @author Rithik Rajaram
 */
@RestController
public class CampusRatingSystemController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final BuildingService buildingService;
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
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final AuthenticationService authenticationService;

    /**
     * Constructs a CampusRatingSystemController with services for managing users,
     * locations,
     * reviews, tasks, locationtasks, and favorites. Each service is injected to
     * support API
     * endpoints that delegate operations to the corresponding service layer.
     *
     * @param userService           the service for handling user operations
     * @param buildingService       the service for handling building operations
     * @param locationService       the service for handling location operations
     * @param reviewService         the service for handling review operations
     * @param taskService           the service for handling task operations
     * @param locationTaskService   the service for handling tasks assigned to each
     *                              location
     * @param favoriteService       the service for handling accessing user's
     *                              favorite locaitons
     * @param imageService          the service for handling images
     * @param jwtService            the service for handling jwt token
     * @param authenticationService the service for handling user authenticaiton
     */
    public CampusRatingSystemController(UserService userService,
            LocationService locationService,
            ReviewService reviewService,
            TaskService taskService,
            LocationTaskService locationTaskService,
            FavoriteService favoriteService,
            ImageService imageService,
            JwtService jwtService,
            AuthenticationService authenticationService,
            BuildingService buildingService) {

        this.userService = userService;
        this.buildingService = buildingService;
        this.locationService = locationService;
        this.reviewService = reviewService;
        this.taskService = taskService;
        this.locationTaskService = locationTaskService;
        this.favoriteService = favoriteService;
        this.imageService = imageService;
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    /**
     * Endpoint to add a new user to the system.
     *
     * @param registerUserDto takes in the input of Email, Password and Name of the
     *                        user
     * @return a ResponseEntity containing the newly created User and a CREATED
     *         status
     */
    @PostMapping("/user/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    /**
     * Endpoint to add a new user to the system.
     *
     * @param loginUserDto takes in the input of Email and Password of the user
     * @return a ResponseEntity containing the newly created User and a CREATED
     *         status
     */
    @PostMapping("/user/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse()
                .setToken(jwtToken)
                .setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    /**
     * Endpoint to add a new building.
     *
     * @param name      the name of the building
     * @param longitude the longitude of the building
     * @param latitude  the latitude of the building
     * @return the added Building entity as a response
     */
    @PostMapping("/building/addBuilding")
    public ResponseEntity<Building> addBuilding(@RequestParam String name,
            @RequestParam Float longitude,
            @RequestParam Float latitude) {

        Building newBuilding = buildingService.addNewBuilding(name, longitude, latitude);
        return new ResponseEntity<>(newBuilding, HttpStatus.CREATED);
    }

    /**
     * Endpoint to add a new location to the system.
     *
     * @param name         the name of the location
     * @param description  a brief description of the location
     * @param address      the physical address of the location
     * @param category     the category or type of location (e.g., library, park)
     * @param buildingName the name of the building associated with the location
     * @return a ResponseEntity containing the newly created Location and a CREATED
     *         status
     */
    @PostMapping("/location/addLocation")
    public ResponseEntity<Location> addNewLocation(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String address,
            @RequestParam String category,
            @RequestParam String buildingName) {
        Location newLocation = locationService.addNewLocation(
                name,
                description,
                address,
                category,
                buildingName);

        return new ResponseEntity<>(newLocation, HttpStatus.CREATED);
    }

    /**
     * Endpoint to get all locations along with their tasks.
     *
     * @return a dto containing all location data and all tasks associated with each
     *         location
     */
    @GetMapping("/location/getLocations")
    public List<LocationWithTasksDTO> getLocations() {
        return locationService.getLocations();
    }

    /**
     * Endpoint to add a new review for a location.
     *
     * @param title        title of the comment
     * @param locationName the name of the location being reviewed
     * @param rating       an integer rating for the location
     * @param comment      a textual comment describing the user's experience
     * @return a ResponseEntity containing the newly created Review and a CREATED
     *         status
     */
    @PostMapping("/review/addReview")
    public ResponseEntity<Review> addReview(
            @RequestParam String locationName,
            @RequestParam int rating,
            @RequestParam String comment,
            @RequestParam String title) {

        Review newReview = reviewService.addNewReview(locationName, rating, comment, title);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    /**
     * Endpoint to delete a review for a specified location by the authenticated
     * user.
     *
     * @param locationName the name of the location whose review is to be deleted
     * @return a ResponseEntity indicating the status of the deletion request
     */
    @DeleteMapping("/review/deleteReview")
    public ResponseEntity<String> deleteReview(@RequestParam String locationName) {
        try {
            reviewService.deleteReview(locationName);
            return ResponseEntity.ok("Review deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    /**
     * Endpoint to get all reviews.
     *
     * @return a ResponseEntity containing a list of all reviews and an OK status
     */
    @GetMapping("/review/getAllReviews")
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    /**
     * Endpoint to add a new task to the system.
     *
     * @param name        the name of the task
     * @param description a description of the task's purpose
     * @return a ResponseEntity containing the newly created Task and a CREATED
     *         status
     */
    @PostMapping("/task/addTask")
    public ResponseEntity<Task> addTask(
            @RequestParam String name,
            @RequestParam String description) {

        Task newTask = taskService.addNewTask(name, description);
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    /**
     * Endpoint to add a new LocationTask, associating a task with a location by
     * their names.
     *
     * @param taskName     the name of the task to associate with the location
     * @param locationName the name of the location to associate with the task
     * @return a ResponseEntity containing the newly created LocationTask and a
     *         CREATED status
     */
    @PostMapping("/locationTask/addLocationTask")
    public ResponseEntity<LocationTask> addLocationTask(
            @RequestParam String taskName,
            @RequestParam String locationName) {

        LocationTask newLocationTask = locationTaskService.addLocationTask(taskName, locationName);
        return new ResponseEntity<>(newLocationTask, HttpStatus.CREATED);
    }

    /**
     * Endpoint to add a new Favorite, associating a user and location by their
     * respective
     * email and name.
     *
     * @param locationName the name of the location to be marked as favorite
     * @return a ResponseEntity containing the newly created Favorite and a CREATED
     *         status
     */
    @PostMapping("/favorite/addFavorite")
    public ResponseEntity<Favorite> addFavorite(
            @RequestParam String locationName) {

        Favorite newFavorite = favoriteService.addFavorite(locationName);
        return new ResponseEntity<>(newFavorite, HttpStatus.CREATED);
    }

    /**
     * Endpoint to get a list of Favorite places.
     *
     * @return a List of Location objects that the user has marked as favorite
     */
    @GetMapping("/favorite/getFavorites")
    public ResponseEntity<List<Location>> getFavoriteLocations() {
        List<Location> favorites = favoriteService.getFavoriteLocations();
        return ResponseEntity.ok(favorites);
    }

    /**
     * Endpoint to add a new image URL associated with a specific location.
     *
     * @param imageUrl     the URL of the image to store
     * @param locationName the name of the location to associate with the image
     * @return a ResponseEntity containing the saved Image entity and a CREATED
     *         status
     */
    @PostMapping("/image/addImage")
    public ResponseEntity<Image> addImageUrl(
            @RequestParam("imageUrl") String imageUrl,
            @RequestParam("locationName") String locationName) {

        Image savedImage = imageService.addImageUrl(imageUrl, locationName);
        return new ResponseEntity<>(savedImage, HttpStatus.CREATED);
    }
}
