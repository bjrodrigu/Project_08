package com.campus_rating_system.controller_tests;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyFloat;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import com.campus_rating_system.CampusRatingSystemController;

import com.campus_rating_system.config.AuthenticationService;
import com.campus_rating_system.dtos.LocationWithTasksDTO;
import com.campus_rating_system.dtos.LoginUserDto;
import com.campus_rating_system.dtos.RegisterUserDto;
import com.campus_rating_system.entities.*;
import com.campus_rating_system.services.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

/**
 * Test class for the CampusRatingSystemController, which handles API endpoints
 * for managing
 * tasks, location tasks, favorites, and images within the Campus Rating System.
 * This test class
 * uses MockMvc to simulate HTTP requests and verify responses for all
 * endpoints.
 * 
 * Each endpoint is tested with mocked service calls to ensure controller logic
 * is working
 * as expected without relying on actual service or database implementations.
 *
 * <p>
 * Bugs: None known
 *
 * <p>
 * Author: Rithik Rajaram
 */
@ExtendWith(MockitoExtension.class)
public class CampusRatingSystemControllerTests {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private BuildingService buildingService;

    @Mock
    private LocationService locationService;

    @Mock
    private ReviewService reviewService;

    @Mock
    private TaskService taskService;

    @Mock
    private LocationTaskService locationTaskService;

    @Mock
    private FavoriteService favoriteService;

    @Mock
    private ImageService imageService;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private CampusRatingSystemController controller;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    /**
     * Test case for the register endpoint.
     */
    @Test
    public void testRegisterUserIsSuccess() throws Exception {
        RegisterUserDto registerUserDto = new RegisterUserDto("test@example.com",
                "password", "Test User");
        User mockUser = new User();
        mockUser.setName("Test User");
        mockUser.setEmail("test@example.com");
        when(authenticationService.signup(any(RegisterUserDto.class))).thenReturn(mockUser);

        mockMvc.perform(post("/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerUserDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test User"))
                .andExpect(jsonPath("$.email").value("test@example.com"));

        verify(authenticationService, times(1)).signup(any(RegisterUserDto.class));
    }

    /**
     * Test case for the authenticate endpoint.
     */
    @Test
    public void testAuthenticateUserIsSuccess() throws Exception {
        LoginUserDto loginUserDto = new LoginUserDto("test@example.com", "password");
        User mockUser = new User();
        mockUser.setEmail("test@example.com");

        when(authenticationService.authenticate(any(LoginUserDto.class))).thenReturn(mockUser);
        when(jwtService.generateToken(mockUser)).thenReturn("mockJwtToken");

        mockMvc.perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginUserDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mockJwtToken"));

        verify(authenticationService, times(1)).authenticate(any(LoginUserDto.class));
        verify(jwtService, times(1)).generateToken(mockUser);
    }

    /**
     * Test case for adding a building.
     */
    @Test
    public void testAddBuildingIsSuccess() throws Exception {
        Building mockBuilding = new Building();
        mockBuilding.setName("Test Building");
        mockBuilding.setLongitude(10.0f);
        mockBuilding.setLatitude(20.0f);
        mockBuilding.setAddress("123 Main Street");

        when(buildingService.addNewBuilding(anyString(), anyFloat(), anyFloat(), anyString())).
              thenReturn(mockBuilding);
        mockMvc.perform(post("/building/addBuilding")
                .param("name", "Test Building")
                .param("longitude", "10.0")
                .param("latitude", "20.0")
                .param("address", "123 Main Street"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Test Building"))
                .andExpect(jsonPath("$.longitude").value(10.0))
                .andExpect(jsonPath("$.latitude").value(20.0))
                .andExpect(jsonPath("$.address").value("123 Main Street"));

        verify(buildingService, times(1)).addNewBuilding(anyString(), anyFloat(), anyFloat(), 
              anyString());
    }

    /**
     * Test case for adding a location.
     */
    @Test
     public void testAddLocationIsSuccess() throws Exception {
        Location mockLocation = new Location();
        mockLocation.setName("Library");
        mockLocation.setDescription("A quiet place to study");

        when(locationService.addNewLocation(anyString(), anyString(), anyString(), anyString()))
              .thenReturn(mockLocation);

        mockMvc.perform(post("/location/addLocation")
            .param("name", "Library")
            .param("description", "A quiet place to study")
            .param("category", "Library")
            .param("buildingName", "Main Building"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("Library"))
                .andExpect(jsonPath("$.description").value("A quiet place to study"));

        verify(locationService, times(1))
                   .addNewLocation(anyString(), anyString(), anyString(), anyString());
    }

    /**
     * Test case for getting locations with tasks.
     */
    @Test
    public void testGetLocationsWithTasksIsSuccess() throws Exception {
        LocationWithTasksDTO mockDto = new LocationWithTasksDTO();
        mockDto.setName("Library");
        mockDto.setTaskNames(List.of("Study", "Read"));

        when(locationService.getLocations()).thenReturn(List.of(mockDto));

        mockMvc.perform(get("/location/getLocations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Library"))
                .andExpect(jsonPath("$[0].taskNames[0]").value("Study"))
                .andExpect(jsonPath("$[0].taskNames[1]").value("Read"));

        verify(locationService, times(1)).getLocations();
    }

    /**
     * Test case for adding a review.
     */
    @Test
    public void testAddReviewIsSuccess() throws Exception {
        Review mockReview = new Review();
        mockReview.setTitle("Great Place!");
        mockReview.setRating(5);

        when(reviewService.addNewReview(anyString(), anyInt(), anyString(),
                anyString())).thenReturn(mockReview);

        mockMvc.perform(post("/review/addReview")
                .param("locationName", "Library")
                .param("rating", "5")
                .param("comment", "Amazing study spot!")
                .param("title", "Great Place!"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Great Place!"))
                .andExpect(jsonPath("$.rating").value(5));

        verify(reviewService, times(1)).addNewReview(anyString(),
                anyInt(), anyString(), anyString());
    }

    /**
     * Test case for deleting a review.
     */
    @Test
    public void testDeleteReviewIsSuccess() throws Exception {
        doNothing().when(reviewService).deleteReview(anyString());

        mockMvc.perform(delete("/review/deleteReview")
                .param("locationName", "Library"))
                .andExpect(status().isOk())
                .andExpect(content().string("Review deleted successfully."));

        verify(reviewService, times(1)).deleteReview(anyString());
    }

    /**
     * Test case for editing a review.
     */
    @Test
    public void testEditReviewIsSuccess() throws Exception {
        Review mockReview = new Review();
        mockReview.setTitle("Updated Review");
        mockReview.setRating(4);
        mockReview.setComment("Great study spot!");

        when(reviewService.editReview(anyString(), anyInt(), anyString(),
                anyString())).thenReturn(mockReview);

        mockMvc.perform(put("/review/editReview")
                .param("locationName", "Library")
                .param("newRating", "4")
                .param("newComment", "Great study spot!")
                .param("newTitle", "Updated Review"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Review"))
                .andExpect(jsonPath("$.rating").value(4))
                .andExpect(jsonPath("$.comment").value("Great study spot!"));

        verify(reviewService, times(1)).editReview(anyString(), anyInt(), anyString(), anyString());
    }

    /**
     * Test case for adding a new task.
     */
    @Test
    public void testAddTaskIsSuccess() throws Exception {
        Task mockTask = new Task();
        mockTask.setName("Study");
        mockTask.setDescription("A task for academic focus");

        when(taskService.addNewTask(anyString(), anyString())).thenReturn(mockTask);

        mockMvc.perform(post("/task/addTask")
                .param("name", "Study")
                .param("description", "A task for academic focus"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Study"))
                .andExpect(jsonPath("$.description").value("A task for academic focus"));

        verify(taskService, times(1)).addNewTask(anyString(), anyString());
    }

    /**
     * Test case for adding a new location task.
     */
    /**
     * @Test
     *       public void testAddLocationTaskIsSuccess() throws Exception {
     *       LocationTask mockLocationTask = new LocationTask();
     *       Task mockTask = new Task();
     *       mockTask.setName("Read");
     *       Location mockLocation = new Location();
     *       mockLocation.setName("Library");
     * 
     *       mockLocationTask.setTask(mockTask);
     *       mockLocationTask.setLocation(mockLocation);
     * 
     *       when(locationTaskService.addLocationTask(anyString(),
     *       anyString())).thenReturn(mockLocationTask);
     * 
     *       mockMvc.perform(post("/locationTask/addLocationTask")
     *       .param("taskName", "Read")
     *       .param("locationName", "Library"))
     *       .andExpect(status().isCreated())
     *       .andExpect(jsonPath("$.task.name").value("Read"))
     *       .andExpect(jsonPath("$.location.name").value("Library"));
     * 
     *       verify(locationTaskService, times(1)).addLocationTask(anyString(),
     *       anyString());
     *       }
     */
    /**
     * Test case for adding a favorite location.
     */
    @Test
    public void testAddFavoriteIsSuccess() throws Exception {
        Favorite mockFavorite = new Favorite();
        Location mockLocation = new Location();
        mockLocation.setName("Park");

        mockFavorite.setLocation(mockLocation);

        when(favoriteService.addFavorite(anyString())).thenReturn(mockFavorite);

        mockMvc.perform(post("/favorite/addFavorite")
                .param("locationName", "Park"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.location.name").value("Park"));

        verify(favoriteService, times(1)).addFavorite(anyString());
    }

    /**
     * Test case for adding an image URL to a location.
     */
    @Test
    public void testAddImageUrlIsSuccess() throws Exception {
        Image mockImage = new Image();
        mockImage.setUrl("http://example.com/image.jpg");
        Location mockLocation = new Location();
        mockLocation.setName("Library");

        mockImage.setLocation(mockLocation);

        when(imageService.addImageUrl(anyString(), anyString())).thenReturn(mockImage);

        mockMvc.perform(post("/image/addImage")
                .param("imageUrl", "http://example.com/image.jpg")
                .param("locationName", "Library"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.url").value("http://example.com/image.jpg"))
                .andExpect(jsonPath("$.location.name").value("Library"));

        verify(imageService, times(1)).addImageUrl(anyString(), anyString());
    }

    /**
     * Test case for getting favorite locations.
     */
    @Test
    public void testGetFavoriteLocationsIsSuccess() throws Exception {
        Location mockLocation = new Location();
        mockLocation.setName("Library");

        when(favoriteService.getFavoriteLocations()).thenReturn(List.of(mockLocation));

        mockMvc.perform(get("/favorite/getFavorites"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Library"));

        verify(favoriteService, times(1)).getFavoriteLocations();
    }

    @Test
    public void testGetBuildingsIsSuccess() throws Exception {

        mockMvc.perform(get("/building/getBuildings"))
                .andExpect(status().isOk());
    }
}
