// Import necessary modules and components
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'; // Import render and screen from React Testing Library
import BadgerLogin from '../components/auth/BadgerLogin';
import { LoginContext } from '../components/contexts/LoginContext';
import { MemoryRouter } from 'react-router';



// Define a test to verify the rendering of the BadgerLogin component
test('renders login page with username and password fields', () => {
    // Render the BadgerLogin component to access elements within it for testing
    render(
        <MemoryRouter>
            <LoginContext.Provider value={{ user: null, setUser: jest.fn(), login: false, setLogin: jest.fn() }}>
                <BadgerLogin />
            </LoginContext.Provider>
        </MemoryRouter>
    );

    //i: case-insensitive flag
    // Verify that the username input field is present
    // Use placeholder text "Enter your username" to locate the username input
    expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();

    // Verify that the password input field is present
    // Use placeholder text "Enter your password" to locate the password input
    // case insensitive
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();

    // Verify that the login button is present
    // Find a button with the role "button" and name "Login"
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
});

test('shows alert if username or password is missing', () => {
    //global function
    window.alert = jest.fn(); // Mock alert function

    render(
        <MemoryRouter>
            <LoginContext.Provider value={{ user: null, setUser: jest.fn(), login: false, setLogin: jest.fn() }}>
                <BadgerLogin />
            </LoginContext.Provider>
        </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(window.alert).toHaveBeenCalledWith("You must provide both a username and password!");
});

describe("BadgerLogin Component", () => {
    beforeEach(() => {
        window.alert = jest.fn();

        global.fetch = jest.fn(() =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        ok: true,
                        json: () => Promise.resolve({}),
                    });
                }, 100); // 100ms delay to simulate loading
            })
        );

        localStorage.clear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('handles successful login', async () => {
        const setLogin = jest.fn();
        const setUser = jest.fn();

        render(
            <MemoryRouter>
                <LoginContext.Provider value={{ user: null, setUser, login: false, setLogin }}>
                    <BadgerLogin />
                </LoginContext.Provider>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Enter your username"), { target: { value: "testUser" } });
        fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "testPass" } });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /login/i }));
        });

        // Check if loading state activates with "Logging in" text
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();
        });

        // Wait for login to complete
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Your login is successful");
            expect(setLogin).toHaveBeenCalledWith(true);
            expect(setUser).toHaveBeenCalledWith("testUser");
            expect(localStorage.getItem("isLoggedIn")).toBe(JSON.stringify("testUser"));
        });

        // Ensure button is re-enabled and text is back to "Login"
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /login/i })).not.toBeDisabled();
        });
    });
});