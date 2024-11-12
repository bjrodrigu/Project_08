// Import necessary modules and components
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import BadgerSignup from '../components/auth/BadgerSignup';
import { LoginContext } from '../components/contexts/LoginContext';
import { MemoryRouter } from 'react-router';

// Define a test to verify the rendering of the BadgerSignup component
test('renders signup page with username, password, confirm password, and email fields', () => {
    render(
        <MemoryRouter>
            <LoginContext.Provider value={{ user: null, setUser: jest.fn(), login: false, setLogin: jest.fn() }}>
                <BadgerSignup />
            </LoginContext.Provider>
        </MemoryRouter>
    );

    // Verify that all required input fields and register button are present
    expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
});

test('shows alert if required fields are missing', () => {
    window.alert = jest.fn(); // Mock alert function

    render(
        <MemoryRouter>
            <LoginContext.Provider value={{ user: null, setUser: jest.fn(), login: false, setLogin: jest.fn() }}>
                <BadgerSignup />
            </LoginContext.Provider>
        </MemoryRouter>
    );

    // Case 1: Missing username
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "testPass" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), { target: { value: "testPass" } });
    fireEvent.change(screen.getByPlaceholderText(/Please enter your email/i), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(window.alert).toHaveBeenCalledWith("You must provide a username!");

    // Reset the alert mock
    window.alert.mockClear();

    // Case 2: Missing password
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: "testUser" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "" } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(window.alert).toHaveBeenCalledWith("You must provide a password!");

    // Reset the alert mock
    window.alert.mockClear();

    // Case 3: Passwords do not match
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "testPass1" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), { target: { value: "testPass2" } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(window.alert).toHaveBeenCalledWith("Your passwords do not match!");

    // Reset the alert mock
    window.alert.mockClear();

    // Case 4: Invalid email format
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "testPass" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), { target: { value: "testPass" } });
    fireEvent.change(screen.getByPlaceholderText(/Please enter your email/i), { target: { value: "invalidEmail" } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(window.alert).toHaveBeenCalledWith("You must provide a valid email!");
});


describe("BadgerSignup Component", () => {
    beforeEach(() => {
        window.alert = jest.fn();
        global.fetch = jest.fn(() =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        ok: true,
                        json: () => Promise.resolve({}),
                    });
                }, 100); // Simulate loading
            })
        );
        sessionStorage.clear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('handles missing fields correctly', () => {
        render(
            <MemoryRouter>
                <LoginContext.Provider value={{ user: null, setUser: jest.fn(), login: false, setLogin: jest.fn() }}>
                    <BadgerSignup />
                </LoginContext.Provider>
            </MemoryRouter>
        );

        // Missing username
        fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText(/Please enter your email/i), { target: { value: "test@example.com" } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(window.alert).toHaveBeenCalledWith("You must provide a username!");

        // Missing password
        fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "" } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(window.alert).toHaveBeenCalledWith("You must provide a password!");

        // Non-matching passwords
        fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "testPass1" } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), { target: { value: "testPass2" } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(window.alert).toHaveBeenCalledWith("Your passwords do not match!");

        // Invalid email
        fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText(/Please enter your email/i), { target: { value: "invalidEmail" } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(window.alert).toHaveBeenCalledWith("You must provide a valid email!");
    });

    test('handles successful registration', async () => {
        const setLogin = jest.fn();
        const setUser = jest.fn();

        render(
            <MemoryRouter>
                <LoginContext.Provider value={{ user: null, setUser, login: false, setLogin }}>
                    <BadgerSignup />
                </LoginContext.Provider>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: "testUser" } });
        fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm your password/i), { target: { value: "testPass" } });
        fireEvent.change(screen.getByPlaceholderText(/Please enter your email/i), { target: { value: "test@example.com" } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /register/i }));
        });

        // Check if loading state activates with "Registering" text
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /registering/i })).toBeDisabled();
        });

        // Wait for registration to complete
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Your registration is successful");
            expect(setLogin).toHaveBeenCalledWith(true);
            expect(setUser).toHaveBeenCalledWith("testUser");
            expect(sessionStorage.getItem("isLoggedIn")).toBe(JSON.stringify("testUser"));
        });

        // Ensure button is re-enabled and text is back to "Register"
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /register/i })).not.toBeDisabled();
        });
    });
});
