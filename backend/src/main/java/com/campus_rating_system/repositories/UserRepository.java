package com.campus_rating_system.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campus_rating_system.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}