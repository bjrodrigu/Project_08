package com.campus_rating_system.repositories;

import com.campus_rating_system.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.campus_rating_system.entities.Favorite;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    Optional<Favorite> findByUserAndFavoriteID(String email, int FavoriteID);
}
