// Tests for the login form: email + password, inline errors, successful login.
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import BadgerLogin from '../components/auth/BadgerLogin';
import { LoginContext } from '../components/contexts/LoginContext';
import { MemoryRouter } from 'react-router';

function renderLogin(ctx = {}) {
    const value = { user: null, setUser: jest.fn(), login: false, setLogin: jest.fn(), ...ctx };
    render(
        <MemoryRouter>
            <LoginContext.Provider value={value}>
                <BadgerLogin />
            </LoginContext.Provider>
        </MemoryRouter>
    );
    return value;
}

const submit = () => fireEvent.click(screen.getByRole('button', { name: /^log in$/i }));

beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('renders email and password fields', () => {
    renderLogin();
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    expect(screen.getByRole('heading', { level: 1, name: 'Log in' })).toBeInTheDocument();
});

test('shows an inline error if email or password is missing', () => {
    renderLogin();
    submit();
    expect(screen.getByRole('alert')).toHaveTextContent('Enter your email and password.');
});

test('shows an inline error for a wrong password', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 401 }));
    renderLogin();
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong' } });
    await act(async () => { submit(); });
    expect(await screen.findByRole('alert')).toHaveTextContent("That email and password don't match.");
});

test('handles successful login', async () => {
    global.fetch = jest.fn(() =>
        new Promise((resolve) => setTimeout(() => resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ token: 'test-token', expiresIn: 3600000 }),
        }), 50))
    );
    const { setLogin, setUser } = renderLogin();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testPass' } });
    await act(async () => { submit(); });

    await waitFor(() => {
        expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();
    });

    await waitFor(() => {
        expect(setLogin).toHaveBeenCalledWith(true);
        expect(setUser).toHaveBeenCalledWith('test@example.com');
        expect(localStorage.getItem('token')).toBe('test-token');
        expect(localStorage.getItem('isLoggedIn')).toBe(JSON.stringify('test@example.com'));
    });
});
