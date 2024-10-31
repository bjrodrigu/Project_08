package com.campus_rating_system.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campus_rating_system.entities.Location;
import com.campus_rating_system.repositories.LocationRepository;

@Service
public class LocationService {
    
    @Autowired
    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location addNewLocation(String name, String description, float latitude, float longitude, String address) {
        Location location = new Location();
        location.setName(name);
        location.setDescription(description);
        location.setLatitude(latitude);
        location.setLongitude(longitude);
        location.setAddress(address);
        location.setCreatedAt(new Date());
        location.setUpdatedAt(new Date());

        return locationRepository.save(location);
    }

}
