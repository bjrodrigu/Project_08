package com.campus_rating_system;

import org.springframework.web.bind.annotation.RestController;

import com.campus_rating_system.services.UserService;
import com.campus_rating_system.services.LocationService;

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

    public CampusRatingSystemController(UserService userService, LocationService locationService) {
        this.userService = userService;
        this.locationService = locationService;
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
            @RequestParam String address) {

        Location newLocation = locationService.addNewLocation(name, description, latitude, longitude, address);
        return new ResponseEntity<>(newLocation, HttpStatus.CREATED);
    }
}
