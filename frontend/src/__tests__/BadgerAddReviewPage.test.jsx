import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import BadgerAddReviewPage from "../components/app/BadgerAddReviewPage";
import { LoginContext } from "../components/contexts/LoginContext";

// Test that renders the correct form elements
test("renders form elements correctly", () => {
    render(
        <LoginContext.Provider value={{ user: "Test User" }}>
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        </LoginContext.Provider>
    );

    expect(screen.getByPlaceholderText(/title your review here/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/share your opinion on/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit review/i })).toBeInTheDocument();
});

// Test that updates the review state when the user types in the review input
test("updates review state when user types in review input", () => {
    render(
        <LoginContext.Provider value={{ user: "Test User" }}>
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        </LoginContext.Provider>
    );

    const reviewInput = screen.getByPlaceholderText(/share your opinion on/i);
    userEvent.type(reviewInput, "This is my review");
    expect(reviewInput.value).toBe("This is my review");
});

// Test that updates the rating state when the user clicks on a star
test("updates rating state when user clicks on a star", () => {
    render(
        <LoginContext.Provider value={{ user: "Test User" }}>
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        </LoginContext.Provider>
    );

    // Select stars using the test ID
    const stars = screen.getAllByTestId("star");

    // Initial state (assuming rating starts at 0)
    expect(stars[0]).toHaveStyle('color: #e4e5e9'); // First star should be unfilled
    expect(stars[1]).toHaveStyle('color: #e4e5e9'); // Second star should be unfilled

    userEvent.click(stars[2]); // Click on the third star

    // Check updated styles after clicking the third star
    expect(stars[1]).toHaveStyle('color: #2e2e2e'); // Second star should be filled
    expect(stars[2]).toHaveStyle('color: #e4e5e9'); // Third star should be filled

});


// Test that updates the review title state when the user types in the review title input
test("updates review title state when user types in title input", () => {
    render(
        <LoginContext.Provider value={{ user: "Test User" }}>
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        </LoginContext.Provider>
    );

    const titleInput = screen.getByPlaceholderText(/title your review here/i);
    userEvent.type(titleInput, "Great Place!");
    expect(titleInput.value).toBe("Great Place!");
});


// Mock alert function to be used in the next test
global.alert = jest.fn();

// Test that alerts the user if they try to submit a review without selecting a rating
test("alerts user if submitting without rating", () => {
    render(
        <LoginContext.Provider value={{ user: "Test User" }}>
            <BrowserRouter>
                <BadgerAddReviewPage />
            </BrowserRouter>
        </LoginContext.Provider>
    );

    const submitButton = screen.getByRole("button", { name: /submit review/i });
    userEvent.click(submitButton);

    expect(alert).toHaveBeenCalledWith('Please select a rating before submitting your review.');
});
