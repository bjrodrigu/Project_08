import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Spinner } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router';
import { useLoginState } from '../contexts/LoginContext';
import { useLocationState } from '../contexts/MapContext';
import { API_BASE } from "../../api";
import { useNotify } from '../contexts/ToastContext';

const BadgerAddReviewPage = () => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [formError, setFormError] = useState('');
    const {fetchLocations} = useLocationState();
    const notify = useNotify();


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
        setFormError('');
        if (rating === 0) {
            setFormError('Choose a star rating before posting.');
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
            ? `${API_BASE}/review/editReview?${queryParams.toString()}`
            : `${API_BASE}/review/addReview?${queryParams.toString()}`;

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
                notify(existingReview ? 'Review updated' : 'Review posted');
                routeChange();
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
                setFormError("Couldn't save your review. Try again.");
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

        fetch(`${API_BASE}/review/deleteReview?${queryParams.toString()}`, {
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
                notify('Review deleted');
                routeChange();
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
                setFormError("Couldn't delete your review. Try again.");
                setIsDeleting(false);
            });
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    return (
        <Card className="side-panel" style={{ padding: '1.5rem' }}>
            <Card.Body>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <Button
                        data-testid="back-button"
                        aria-label="Back"
                        variant='outline-secondary'
                        onClick={routeChange}
                        style={{ borderRadius: '50%', height: '2.75rem', width: '2.75rem', flexShrink: 0 }}>
                        <ArrowLeft />
                    </Button>
                    <div style={{ minWidth: 0 }}>
                        <h1 className="card-title" style={{ fontSize: '1.5rem', margin: 0 }}>
                            {existingReview ? 'Edit your review' : 'Review'} {location.name ? `of ${location.name}` : ''}
                        </h1>
                        {user && <div className="text-muted" style={{ fontSize: '0.9rem' }}>Posting as {user}</div>}
                    </div>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formRating" className="mb-4">
                        <Form.Label>Your rating</Form.Label>
                        <div className="star-rating" role="radiogroup" aria-label="Your rating">
                            {[...Array(5)].map((_, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    data-testid="star"
                                    role="radio"
                                    aria-checked={rating === index + 1}
                                    aria-label={`${index + 1} star${index === 0 ? '' : 's'}`}
                                    onClick={() => handleStarClick(index)}
                                    className="star-button"
                                    style={{ color: index < rating ? '#c5050c' : '#e4e5e9' }}
                                >
                                    {index < rating ? <StarFill /> : <Star />}
                                </button>
                            ))}
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formTitle" className="mb-4">
                        <Form.Label>Title</Form.Label>
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
                        <Form.Label>Review</Form.Label>
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
                            existingReview ? 'Save changes' : 'Post review'
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
                                'Delete review'
                            )}
                        </Button>
                    )}

                    {formError && <p className="form-error" role="alert">{formError}</p>}
                </Form>
            </Card.Body>
        </Card>
    );
};

export default BadgerAddReviewPage;
