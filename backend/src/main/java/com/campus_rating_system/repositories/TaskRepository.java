package com.campus_rating_system.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.campus_rating_system.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}