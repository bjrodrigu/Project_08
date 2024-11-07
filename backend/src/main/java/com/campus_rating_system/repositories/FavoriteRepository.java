package com.campus_rating_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campus_rating_system.entities.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
}
