// Import necessary modules and components
import { render, screen } from '@testing-library/react'; // Import render and screen from React Testing Library
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
