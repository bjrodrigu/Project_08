import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

export default function BadgerFavoriteLocations({ location, isStarred, onRemoveFavorite, description, favId, }) {
    const [starred, setStarred] = useState(isStarred); // control the stastus of stars

    const handleStarClick = () => {
        if (starred) {
            const isConfirmed = window.confirm("Are you sure you want to remove this favorite?");
            if (isConfirmed) {
                setStarred(false); 
                onRemoveFavorite(favId); 
            }
        }
    };

    return (
        <Card style={{ margin: '1rem 0', padding: '1rem', borderRadius: '1rem' }}>
            <Card.Body className="d-flex justify-content-between align-items-center">

                <Card.Title>{location}</Card.Title>

                <Card.Text style={{ color: 'gray', marginTop: '0.5rem' }}>
                    {description || "No description available"} {/* If no description, show fallback text */}
                </Card.Text>
                <StarRatings
                    rating={starred ? 1 : 0}
                    numberOfStars={1}
                    starRatedColor="gold"
                    starEmptyColor="gray"
                    starDimension="24px"
                    starSpacing="2px"
                    changeRating={handleStarClick}
                />
            </Card.Body>
        </Card>
    );
}
