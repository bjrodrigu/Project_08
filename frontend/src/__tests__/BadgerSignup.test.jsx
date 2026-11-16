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
    window.alert = jest.fn();
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

test('validates email, password and matching passwords', () => {
    renderSignup();

    fill(/Please enter your email/i, 'invalidEmail');
    clickRegister();
    expect(window.alert).toHaveBeenCalledWith('You must provide a valid email!');

    window.alert.mockClear();
    fill(/Please enter your email/i, 'test@example.com');
    clickRegister();
    expect(window.alert).toHaveBeenCalledWith('You must provide a password!');

    window.alert.mockClear();
    fill(/Enter your password/i, 'testPass1');
    fill(/Confirm your password/i, 'testPass2');
    clickRegister();
    expect(window.alert).toHaveBeenCalledWith('Your passwords do not match!');
});

test('handles successful registration', async () => {
    global.fetch = jest.fn(() =>
        new Promise((resolve) => setTimeout(() => resolve({ ok: true, status: 200, json: () => Promise.resolve({}) }), 50))
    );
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
        expect(window.alert).toHaveBeenCalledWith('Your registration is successful');
        expect(setLogin).toHaveBeenCalledWith(true);
        expect(setUser).toHaveBeenCalledWith('test@example.com');
        expect(localStorage.getItem('isLoggedIn')).toBe(JSON.stringify('test@example.com'));
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/user/signup', expect.objectContaining({ method: 'POST' }));
});
