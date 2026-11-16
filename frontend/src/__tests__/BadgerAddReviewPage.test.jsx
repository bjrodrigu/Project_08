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

jest.mock('../components/contexts/MapContext', () => ({
    useLocationState: () => ({ fetchLocations: jest.fn(), locationList: [], buildings: [] }),
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
        expect(screen.getByRole('button', { name: 'Post review' })).toBeInTheDocument();
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

    it('shows an inline error if no rating is selected', async () => {
        render(
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        );

        fireEvent.submit(screen.getByRole('button', { name: 'Post review' }).closest('form'));

        expect(await screen.findByRole('alert')).toHaveTextContent('Choose a star rating before posting.');
    });

    it('shows an inline error when saving fails', async () => {
        fetch.mockRejectedValueOnce(new Error('Failed to submit the review'));

        render(
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        );

        fireEvent.click(screen.getAllByTestId('star')[4]); // 5 stars
        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Needs improvement' } });
        fireEvent.change(screen.getByLabelText('Review'), { target: { value: 'It was too noisy.' } });
        fireEvent.click(screen.getByRole('button', { name: 'Post review' }));

        expect(await screen.findByRole('alert')).toHaveTextContent("Couldn't save your review. Try again.");
    });

    it('star buttons are keyboard-accessible radio options', () => {
        render(
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        );
        const three = screen.getByRole('radio', { name: '3 stars' });
        fireEvent.click(three);
        expect(three).toHaveAttribute('aria-checked', 'true');
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
