import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BadgerAddReviewPage from '../components/app/BadgerAddReviewPage';

// Mock LoginContext
jest.mock('../components/contexts/LoginContext', () => ({
    useLoginState: () => ({
        user: 'testuser@example.com',
        setUser: jest.fn(),
        login: true,
        setLogin: jest.fn(),
    }),
}));

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: jest.fn(() => 'mockedToken'),
    },
    writable: true,
});

// Mock fetch
global.fetch = jest.fn();

// Mocking window.alert
beforeAll(() => {
    global.alert = jest.fn(); // Mock alert
});

afterAll(() => {
    jest.restoreAllMocks(); // Cleanup mocks after tests
});

describe('BadgerAddReviewPage Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('renders the form elements correctly', () => {
        render(
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        );

        // Check for star rating icons
        const stars = screen.getAllByTestId('star');
        expect(stars).toHaveLength(5);

        // Check for input fields
        expect(screen.getByPlaceholderText('Title your review here')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Share your opinion on undefined here!')).toBeInTheDocument();

        // Check for the submit button
        expect(screen.getByText('Submit Review')).toBeInTheDocument();
    });

    it('allows the user to select a star rating', () => {
        render(
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        );

        const stars = screen.getAllByTestId('star');
        fireEvent.click(stars[2]); // Select the 3rd star

        // Expect the remaining stars to be empty
        stars.slice(3).forEach(star => {
            expect(star).toHaveStyle('color: rgb(228, 229, 233)'); // Light color for empty stars
        });
    });

    it('displays an alert if the rating is not selected on submit', async () => {
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Submit Review'));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('Please select a rating before submitting your review.');
        });

        alertMock.mockRestore(); // Restore the original alert implementation
    });
   

    it('handles API errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Failed to submit the review'));
        const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { });


        render(
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        );

        const stars = screen.getAllByTestId('star');
        fireEvent.click(stars[4]); // Select the 5th star

        fireEvent.change(screen.getByPlaceholderText('Title your review here'), {
            target: { value: 'Needs improvement' },
        });

        fireEvent.change(screen.getByPlaceholderText('Share your opinion on undefined here!'), {
            target: { value: 'It was too noisy.' },
        });

        fireEvent.click(screen.getByText('Submit Review'));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith('There was an error submitting your review.');
        });

        alertMock.mockRestore(); // Restore the original alert implementation
    });

    it('navigates back to the previous page when the back button is clicked', () => {
        const mockNavigate = jest.fn();
        jest.spyOn(require('react-router'), 'useNavigate').mockImplementation(() => mockNavigate);
    
        render(
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        );
    
        const backButton = screen.getByTestId('back-button');
        fireEvent.click(backButton);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
});
