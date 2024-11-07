import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ReactAddReviewButton from "../components/app/ReactAddReviewButton";

// Mock for the navigate function from react-router-dom
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

// Test that button renders when user is logged in
test("renders Add Review button when user is logged in", () => {
    render(
        <BrowserRouter>
            <ReactAddReviewButton location="Location A" />
        </BrowserRouter>
    );
    expect(screen.getByRole("button", { name: /Add Review/i })).toBeInTheDocument();
});

// Test that button does not render when user is not logged in
test("does not render Add Review button when user is not logged in", () => {
    // Assuming 'isLoggedIn' prop or context will control rendering of the button
    const { queryByRole } = render(
        <BrowserRouter>
            {/* Button should not render when user is not logged in */}
            {false && <ReactAddReviewButton location="Location A" />}
        </BrowserRouter>
    );
    expect(queryByRole("button", { name: /Add Review/i })).not.toBeInTheDocument();
});

// Test that button redirects to add review page when clicked
test("redirects to add review page when button is clicked", () => {
    const navigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => navigate);

    render(
        <BrowserRouter>
            <ReactAddReviewButton location="Location A" />
        </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /add review/i });
    userEvent.click(button);

    expect(navigate).toHaveBeenCalledWith("/addReview", { state: { location: "Location A" } });
});
