package com.campus_rating_system;

import org.springframework.web.bind.annotation.RestController;

import com.campus_rating_system.services.*;


import com.campus_rating_system.entities.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class CampusRatingSystemController {
    
    @Autowired
    private final UserService userService;
    private final LocationService locationService;
    private final ReviewService reviewService;

    public CampusRatingSystemController(UserService userService, LocationService locationService, ReviewService reviewService) {
        this.userService = userService;
        this.locationService = locationService;
        this.reviewService = reviewService;
    }

    @PostMapping("/user/addUser")
    public ResponseEntity<User> addNewUser(
            @RequestParam String username,
            @RequestParam String email) {

        User newUser = userService.addNewUser(username, email);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

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

    @PostMapping("/review/addReview")
    public ResponseEntity<Review> addReview(
        @RequestParam String email,
        @RequestParam String locationName, 
        @RequestParam int rating,
        @RequestParam String comment) {

        Review newReview = reviewService.addNewReview(email, locationName, rating, comment);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }
}
