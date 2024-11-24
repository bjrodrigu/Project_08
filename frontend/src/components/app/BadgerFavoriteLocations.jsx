import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

export default function BadgerFavoriteLocations({ location, isStarred, onRemoveFavorite }) {
    const [starred, setStarred] = useState(isStarred); // control the stastus of stars

    const handleStarClick = () => {
        if (starred) {
            setStarred(false); // Turns off the star
            onRemoveFavorite(location); // Notifies the parent component to remove this location from favorites
        }
    };

    return (
        <Card style={{ margin: '1rem 0', padding: '1rem', borderRadius: '1rem' }}>
            <Card.Body className="d-flex justify-content-between align-items-center">
                {/* Display the location name */}
                <Card.Title>{location}</Card.Title>
                {/* React Star Ratings Component */}
                <StarRatings
                    rating={starred ? 1 : 0} // If starred, show 1 star; otherwise, 0 stars
                    numberOfStars={1} // Display only 1 star
                    starRatedColor="gold" // Color of the star when active
                    starEmptyColor="gray" // Color of the star when inactive
                    starDimension="24px" // Size of the star
                    starSpacing="2px" // Space between stars
                    changeRating={handleStarClick} // Triggered when the star is clicked
                />
            </Card.Body>
        </Card>
    );
}
