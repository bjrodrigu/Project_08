// this component can only be shown after user clicks login 
// In this component, user will be able to check their own comments and ratings, and they are able to edit them or remove them.
// User could also click logout. 
// Use Pagination
import React, { useState, useEffect } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';

//example
const reviews = [
    {
        location: 'Library',
        userRating: 4.5,
        totalScore: 5,
        comment: 'Great place to study, very quiet.'
    },
    {
        location: 'Cafeteria',
        userRating: 3.8,
        totalScore: 5,
        comment: 'Food is decent but can be crowded during lunch hours.'
    }
];
export default function UserComments() {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    //test
    const reviewsPerPage = 2;

    //const reviewsPerPage = 5;

    // // get current user's all reviews
    // useEffect(() => {
    //     fetch('/api/user/userId/reviews')
    //         .then((response) => response.json())
    //         .then((data) => setReviews(data));
    // }, []);


    const totalPages = Math.ceil(reviews.length / reviewsPerPage);


    const indexOfLastReviews = currentPage * reviewsPerPage;
    const indexOfFirstreviews = indexOfLastReviews - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstComment, indexOfLastComment);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h2>Your Comments</h2>
            {currentReviews.map((review, index) => (
                <Card key={index}>
                    <Card.Body>
                        <Card.Title>{review.location}</Card.Title>
                        <Card.Text>Rating: {review.userRating} / 5</Card.Text>
                        <Card.Text>{review.comment}</Card.Text>
                    </Card.Body>
                </Card>
            ))}

            <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
}
