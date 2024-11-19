package com.campus_rating_system.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campus_rating_system.entities.Building;

public interface BuildingRepository extends JpaRepository<Building, Integer> {
    Optional<Building> findByName(String name);
}
