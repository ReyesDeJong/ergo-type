import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginPage from '../../pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../../contexts/UserContext.tsx';

let mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate = vi.fn();
  });

  const renderWithProvider = () =>
    render(
      <BrowserRouter>
        <UserProvider>
          <LoginPage />
        </UserProvider>
      </BrowserRouter>
    );

  it('validates email and password before submit', async () => {
    renderWithProvider();
    const form = screen
      .getByRole('button', { name: 'Login' })
      .closest('form') as HTMLFormElement;
    fireEvent.submit(form);
    await waitFor(() => {
      expect(
        screen.getByText('Please enter a valid email address')
      ).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('calls login endpoint and navigates home on success', async () => {
    // First fetch from UserProvider -> /auth/me returns 401
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: false })
      // Second fetch from LoginPage -> /auth/login returns success
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: { id: 1, email: 'bob@example.com' } }),
      })
      // Third fetch from checkAuthStatus after login -> /auth/me returns user
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          user: {
            id: 1,
            email: 'bob@example.com',
            createdAt: '',
            updatedAt: '',
          },
        }),
      });

    renderWithProvider();

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'bob@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Password123!' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({ method: 'POST' })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
