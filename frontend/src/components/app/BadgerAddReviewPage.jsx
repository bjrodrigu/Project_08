import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Spinner } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router';
import { useLoginState } from '../contexts/LoginContext';
import { useLocationState } from '../contexts/MapContext';

const BadgerAddReviewPage = () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const {fetchLocations} = useLocationState();


    // create a navigate object
    let navigate = useNavigate();

    // route change function to redirect to home as used in 'BadgerStudySpot'
    const routeChange = () => {
        let path = '../';
        navigate(path);
    }

    const locationHook = useLocation();
    const location = locationHook.state?.location || {};
    const existingReview = locationHook.state?.review || null;

    const { user, setUser, login, setLogin } = useLoginState();

    // Pre-populate the form with the existing review if editing
    useEffect(() => {
        if (existingReview) {
            setReview(existingReview.comment);
            setRating(existingReview.rating);
            setReviewTitle(existingReview.title);
        }
    }, [existingReview]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (rating === 0) {
            alert('Please select a rating before submitting your review.');
            return;
        }
        console.log('Submitting review:', review, rating, reviewTitle);

        setIsSubmitting(true);

        // Constructs appropriate query parameters for the request (either add or edit review)
        const queryParams = new URLSearchParams({
            locationName: location.name,
            ...(existingReview ? {
                newRating: rating,
                newComment: review,
                newTitle: reviewTitle
            } : {
                rating: rating,
                comment: review,
                title: reviewTitle
            })
        });

        const token = localStorage.getItem("token");
        console.log(token);

        // Determine whether it's an add or edit request
        const method = existingReview ? 'PUT' : 'POST';
        const url = existingReview
            ? `http://localhost:8080/review/editReview?${queryParams.toString()}`
            : `http://localhost:8080/review/addReview?${queryParams.toString()}`;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to submit the review');
                }
            })
            .then(async () => {
                setRating(0);
                setReview('');
                setReviewTitle('');
                await fetchLocations();
                setIsSubmitting(false);
                alert('Review submitted successfully!');
                routeChange();
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
                alert('There was an error submitting your review.');
                setIsSubmitting(false);
            });
    };

    const handleDeleteReview = () => {
        if (!window.confirm('Are you sure you want to delete your review?')) {
            return;
        }

        setIsDeleting(true);
        const queryParams = new URLSearchParams({
            locationName: location.name
        });

        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/review/deleteReview?${queryParams.toString()}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete the review');
                }
                await fetchLocations();
                alert('Review deleted successfully!');
                routeChange();
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
                alert('There was an error deleting your review.');
                setIsDeleting(false);
            });
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
                        data-testid="back-button"
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
                                        data-testid="star"
                                        onClick={() => handleStarClick(index)}
                                        style={{
                                            cursor: 'pointer',
                                            color: '#2e2e2e',
                                            fontSize: '3rem'
                                        }}
                                    /> :
                                    <Star
                                        key={index}
                                        data-testid="star"
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

                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            existingReview ? 'Update Review' : 'Submit Review'
                        )}
                    </Button>

                    {existingReview && (
                        <Button
                            variant="danger"
                            onClick={handleDeleteReview}
                            disabled={isDeleting}
                            style={{ marginLeft: '1rem' }}
                        >
                            {isDeleting ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Delete Review'
                            )}
                        </Button>
                    )}

                </Form>
            </Card.Body>
        </Card>
    );
};

export default BadgerAddReviewPage;
