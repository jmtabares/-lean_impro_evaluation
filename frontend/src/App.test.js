import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';


global.fetch = jest.fn();

describe('QA Engineer Test - Front End', () => {

  beforeEach(() => {    
    fetch.mockClear();
  });

  test('renders login form correctly', () => {
    render(<App />);    
    const titleValue = screen.getByRole('heading');
    expect(titleValue).toBeInTheDocument();
    expect(titleValue).toHaveTextContent(/login/i);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error message if email or password are empty', async () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('calls fetch with correct parameters on form submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    // Assert fetch was called with the correct data
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });
  });

  test('displays error message when fetch fails', async () => {
    render(<App />);
    userEvent.type(screen.getByPlaceholderText(/email/i), 'wrong@example.com');
    userEvent.type(screen.getByPlaceholderText(/password/i), 'wrongpassword');
    
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Credenciales incorrectas' })
    });

    // Send Form
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    // Expect error message is displayed
    const errorMessage = await screen.findByText('Credenciales incorrectas');
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders welcome message after successful login', async () => {
    render(<App />);
    
    // inpur correct data
    userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    userEvent.type(screen.getByPlaceholderText(/password/i), 'password123');
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    // Send the form
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));

    // verify welcome page
    const welcomeMessage = await screen.findByText(/¡bienvenido!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

});