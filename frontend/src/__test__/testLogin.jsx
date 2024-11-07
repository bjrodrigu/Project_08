import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import BadgerLogin from '../components/auth/BadgerLogin';
import { useLoginState } from '../components/contexts/LoginContext';

// Mock useLoginState hook
jest.mock('../contexts/LoginContext', () => ({
  useLoginState: jest.fn(),
}));

describe('BadgerLogin Component', () => {
  const mockSetLogin = jest.fn();
  const mockSetUser = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useLoginState.mockReturnValue({
      user: null,
      setUser: mockSetUser,
      login: false,
      setLogin: mockSetLogin,
    });
  });

  test('renders login form', () => {
    render(
      <BrowserRouter>
        <BadgerLogin />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('shows error when username or password is empty', () => {
    render(
      <BrowserRouter>
        <BadgerLogin />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    expect(screen.getByText(/You must provide both a username and password/i)).toBeTruthy();
  });

  test('calls fetch on successful login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
      })
    );

    render(
      <BrowserRouter>
        <BadgerLogin />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await screen.findByText(/Your login is successful/i);

    expect(mockSetLogin).toHaveBeenCalledWith(true);
    expect(mockSetUser).toHaveBeenCalledWith('testuser');
    expect(fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockClear();
  });

  test('shows error on incorrect login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
        json: () => Promise.resolve({}),
      })
    );

    render(
      <BrowserRouter>
        <BadgerLogin />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await screen.findByText(/Error: Incorrect login, please try again/i);

    expect(fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockClear();
  });
});
