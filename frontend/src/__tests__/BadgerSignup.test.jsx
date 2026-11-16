// Tests for the signup form: email, password, confirm password and full name.
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import BadgerSignup from '../components/auth/BadgerSignup';
import { LoginContext } from '../components/contexts/LoginContext';
import { MemoryRouter } from 'react-router';

function renderSignup(ctx = {}) {
    const value = { user: null, setUser: jest.fn(), login: false, setLogin: jest.fn(), ...ctx };
    render(
        <MemoryRouter>
            <LoginContext.Provider value={value}>
                <BadgerSignup />
            </LoginContext.Provider>
        </MemoryRouter>
    );
    return value;
}

const fill = (placeholder, value) =>
    fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value } });
const clickRegister = () => fireEvent.click(screen.getByRole('button', { name: /register/i }));

beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('renders email, password, confirm password and full name fields', () => {
    renderSignup();
    expect(screen.getByPlaceholderText(/Please enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Confirm your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
});

test('shows inline errors for email, password and matching passwords', () => {
    renderSignup();
    const form = screen.getByRole('button', { name: /register/i }).closest('form');
    // submit the form directly: the browser's own type="email" check would block a click
    fill(/Please enter your email/i, 'invalidEmail');
    fireEvent.submit(form);
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email address.');

    fill(/Please enter your email/i, 'test@example.com');
    fireEvent.submit(form);
    expect(screen.getByRole('alert')).toHaveTextContent('Choose a password.');

    fill(/Enter your password/i, 'testPass1');
    fill(/Confirm your password/i, 'testPass2');
    fireEvent.submit(form);
    expect(screen.getByRole('alert')).toHaveTextContent("The passwords don't match.");
});

test('handles successful registration and signs the new user in', async () => {
    // first call: /user/signup, second call: /user/login
    global.fetch = jest.fn()
        .mockImplementationOnce(() =>
            new Promise((resolve) => setTimeout(() => resolve({ ok: true, status: 200, json: () => Promise.resolve({}) }), 50)))
        .mockImplementationOnce(() =>
            Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ token: 'new-token', expiresIn: 3600000 }) }));
    const { setLogin, setUser } = renderSignup();

    fill(/Please enter your email/i, 'test@example.com');
    fill(/Enter your password/i, 'testPass');
    fill(/Confirm your password/i, 'testPass');
    fill(/Please enter your full name/i, 'Test User');

    await act(async () => {
        clickRegister();
    });

    await waitFor(() => {
        expect(screen.getByRole('button', { name: /registering/i })).toBeDisabled();
    });

    await waitFor(() => {
        expect(setLogin).toHaveBeenCalledWith(true);
        expect(localStorage.getItem('token')).toBe('new-token');
        expect(setUser).toHaveBeenCalledWith('test@example.com');
        expect(localStorage.getItem('isLoggedIn')).toBe(JSON.stringify('test@example.com'));
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/user/signup', expect.objectContaining({ method: 'POST' }));
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/user/login', expect.objectContaining({ method: 'POST' }));
});

test('shows an inline error when the email is already registered', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 409 }));
    renderSignup();
    fill(/Please enter your email/i, 'test@example.com');
    fill(/Enter your password/i, 'testPass');
    fill(/Confirm your password/i, 'testPass');
    await act(async () => { clickRegister(); });
    expect(await screen.findByRole('alert')).toHaveTextContent('An account with that email already exists.');
});
