import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReactAddReviewButton from '../components/app/ReactAddReviewButton';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('ReactAddReviewButton Component', () => {
    it('renders the button with correct text', () => {
        render(
            <BrowserRouter>
                <ReactAddReviewButton location="Library" />
            </BrowserRouter>
        );

        // Check if the button is rendered
        const button = screen.getByRole('button', { name: /add review/i });
        expect(button).toBeInTheDocument();
    });

    it('navigates to /addReview with the correct state on click', () => {
        const history = createMemoryHistory();
        const locationMock = "Library";

        render(
            <Router location={history.location} navigator={history}>
                <ReactAddReviewButton location={locationMock} />
            </Router>
        );

        // Simulate clicking the button
        const button = screen.getByRole('button', { name: /add review/i });
        fireEvent.click(button);

        // Check the navigation
        expect(history.location.pathname).toBe('/addReview');
        expect(history.location.state).toEqual({ location: locationMock });
    });

    it('applies correct styles to the button', () => {
        render(
            <BrowserRouter>
                <ReactAddReviewButton location="Library" />
            </BrowserRouter>
        );

        const button = screen.getByRole('button', { name: /add review/i });

        // Check inline styles
        expect(button).toHaveStyle({
            width: 'fit-content',
            padding: '0.5rem 1rem',
            textAlign: 'right',
        });
    });
});