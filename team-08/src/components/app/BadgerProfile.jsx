// this component can only be shown after user clicks login 
// In this component, user will be able to check their own comments and ratings, and they are able to edit them or remove them.
// User could also click logout. 
// Use Pagination
import React, { useState, useEffect } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
//style
const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto'
};
//example
const reviews = [
    {
        location: 'Library - Studyspot 1',
        userRating: 4.5,
        totalScore: 5,
        comment: 'Great place to study, quiet and comfortable.'
    },
    {
        location: 'Library - Studyspot 2',
        userRating: 4.0,
        totalScore: 5,
        comment: 'Decent spot, but can be a bit noisy during peak hours.'
    },
    {
        location: 'Library - Studyspot 3',
        userRating: 3.5,
        totalScore: 5,
        comment: 'Small study area, but still a good place to focus.'
    },
    {
        location: 'Library - Studyspot 4',
        userRating: 4.8,
        totalScore: 5,
        comment: 'Very quiet, perfect for long study sessions.'
    },
    {
        location: 'Library - Studyspot 5',
        userRating: 3.0,
        totalScore: 5,
        comment: 'Not enough outlets, but still usable.'
    },
    {
        location: 'Library - Studyspot 6',
        userRating: 4.2,
        totalScore: 5,
        comment: 'Good ambiance and comfortable seating.'
    },
    {
        location: 'Library - Studyspot 7',
        userRating: 4.7,
        totalScore: 5,
        comment: 'Spacious and quiet, perfect for group studies.'
    },
    {
        location: 'Library - Studyspot 8',
        userRating: 3.8,
        totalScore: 5,
        comment: 'A bit cramped, but still a good place to focus.'
    },
    {
        location: 'Library - Studyspot 9',
        userRating: 4.1,
        totalScore: 5,
        comment: 'Good lighting and comfortable seats.'
    },
    {
        location: 'Library - Studyspot 10',
        userRating: 4.6,
        totalScore: 5,
        comment: 'Quiet and well-lit, ideal for studying.'
    }
];

export default function UserComments() {
    //const [reviews, setReviews] = useState([]);
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
    const indexOfFirstReviews = indexOfLastReviews - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReviews, indexOfLastReviews);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = (page) => {
        setCurrentPage(currentPage => currentPage - 1)
    };
    const handleNextPage = (page) => {
        setCurrentPage(currentPage => currentPage + 1)
    };
    return (
        <div>
            <h2>Your Comments</h2>
            <div style={containerStyle}>
                {currentReviews.map((review, index) => (
                    <Card key={index}>
                        <Card.Body>
                            <Card.Title>{review.location}</Card.Title>
                            <Card.Text>Rating: {review.userRating} / 5</Card.Text>
                            <Card.Text>{review.comment}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>
            </div>
        </div >
    );
}
