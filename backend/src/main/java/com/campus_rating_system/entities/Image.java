package com.campus_rating_system.entities;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "Image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Integer imageId;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "uploaded_at", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date uploaded_at;

    // Getters and setters

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getUrl() {
        return image_url;
    }

    public void setUrl(String url) {
        this.image_url = url;
    }

    public Date getUploadedAt() {
        return uploaded_at;
    }

    public void setUploadedAt(Date uploadedAt) {
        this.uploaded_at = uploadedAt;
    }
}
