package com.campus_rating_system.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Location_Task")
public class LocationTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_task_id")
    private Integer locationTaskId;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    // Getters and setters

    public Integer getLocationTaskId() {
        return locationTaskId;
    }

    public void setLocationTaskId(Integer locationTaskId) {
        this.locationTaskId = locationTaskId;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}
