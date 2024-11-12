package com.campus_rating_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campus_rating_system.entities.Review;
import com.campus_rating_system.entities.User;
import com.campus_rating_system.entities.Location;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Optional<Review> findByUserAndLocation(User user, Location location);
}