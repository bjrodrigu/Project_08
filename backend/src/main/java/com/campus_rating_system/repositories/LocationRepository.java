package com.campus_rating_system.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campus_rating_system.entities.Location;

public interface LocationRepository extends JpaRepository<Location, Integer> {
    Optional<Location> findByName(String name);
}