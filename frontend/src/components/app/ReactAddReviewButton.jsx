import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ReactAddReviewButton = ({ location }) => {
    const navigate = useNavigate();

    return (
        <Button
            variant="secondary"
            onClick={() => navigate('/addReview', { state: { location } })}
            style={{ width: 'fit-content', padding: '0.5rem 1rem', textAlign: 'right'}}
        >
            Add Review
        </Button>
    );
};

export default ReactAddReviewButton;
