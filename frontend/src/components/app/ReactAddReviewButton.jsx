import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ReactAddReviewButton = ({ location, existingReview }) => {
    const navigate = useNavigate();

    const buttonText = existingReview ? 'Edit Review' : 'Add Review';

    return (
        <Button
            variant="secondary"
            onClick={() =>
                navigate('/addReview', {
                    state: {
                        location,
                        review: existingReview || null, // Pass existing review if available
                    },
                })
            }
            style={{
                width: 'fit-content',
                padding: '0.5rem 1rem',
                textAlign: 'right',
            }}
        >
            {buttonText}
        </Button>
    );
};

export default ReactAddReviewButton;
