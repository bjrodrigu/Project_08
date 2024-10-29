import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router';
import { useLoginState } from '../contexts/LoginContext';



const BadgerAddReviewPage = () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');

    // create a navigate object
    let navigate = useNavigate();

    // route change function to redirect to home as used in 'BadgerStudySpot'
    const routeChange = () => {
        let path = '../';
        navigate(path);
    }

    const locationHook = useLocation();
    const location = locationHook.state?.location || {};
    console.log("location ", location.name);

    const {user, setUser, login, setLogin} = useLoginState();


    const handleSubmit = (event) => {
        event.preventDefault();
        if (rating === 0) {
            alert('Please select a rating before submitting your review.');
            return;
        }
        console.log('Review:', review);
        console.log('Rating:', rating);
        console.log('Review Title:', reviewTitle);
        setRating(0);
        setReview('');
        setReviewTitle('');
       

        // ADD HTTP POST REQUEST HERE
        routeChange(); // return home
        alert('Review submitted successfully!');
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    return (
        <Card style={{
            height: '70vh',
            borderRadius: '2rem',
            width: '40rem',
            position: "absolute",
            top: '20vh',
            margin: 'auto',
            padding: '3rem',
            left: '2vw'
        }}>
            <Card.Body>
                <div style={{ display: 'flex' }}>
                    <Button
                        variant='outline-info'
                        onClick={routeChange}
                        style={{ borderRadius: '50%', height: '3rem', width: '3rem' }}>
                        <ArrowLeft />
                    </Button>
                    <Card.Title className="mb-3" style={{ fontSize: '2rem', marginLeft: '1rem', marginTop: '0.25rem' }}>
                        {user}
                    </Card.Title>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formRating" className="mb-4">
                        <div className="star-rating">
                            {[...Array(5)].map((_, index) => (
                                index < rating ?
                                    <StarFill
                                        key={index}
                                        onClick={() => handleStarClick(index)}
                                        style={{
                                            cursor: 'pointer',
                                            color: '#2e2e2e',
                                            fontSize: '3rem'
                                        }}
                                    /> :
                                    <Star
                                        key={index}
                                        onClick={() => handleStarClick(index)}
                                        style={{
                                            cursor: 'pointer',
                                            color: '#e4e5e9',
                                            fontSize: '3rem'
                                        }}
                                    />
                            ))}
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formTitle" className="mb-4">
                        <Form.Control
                            as="textarea"
                            rows={1}
                            placeholder="Title your review here"
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formReview" className="mb-4">
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder={`Share your opinion on ${location.name} here!`}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit Review
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default BadgerAddReviewPage;
