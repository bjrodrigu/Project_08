package com.campus_rating_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campus_rating_system.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}