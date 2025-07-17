import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Navbar from '../../components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

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

describe('Navbar', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('shows loading spinner initially', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('shows login/signup when not authenticated', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Signup')).toBeInTheDocument();
    });
  });

  it('shows user avatar when authenticated', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        user: {
          id: 1,
          email: 'test@example.com',
          createdAt: '',
          updatedAt: '',
        },
      }),
    });
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('T')).toBeInTheDocument();
    });
  });

  it('calls navigate on login/signup button click', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    await waitFor(() => {
      fireEvent.click(screen.getByText('Login'));
      expect(mockNavigate).toHaveBeenCalledWith('/login');
      fireEvent.click(screen.getByText('Signup'));
      expect(mockNavigate).toHaveBeenCalledWith('/signup');
    });
  });

  it('logs out when avatar is clicked', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        user: {
          id: 1,
          email: 'test@example.com',
          createdAt: '',
          updatedAt: '',
        },
      }),
    });
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    await waitFor(() => {
      const avatar = screen.getByTitle('Logout');
      fireEvent.click(avatar);
      expect(screen.queryByText('T')).not.toBeInTheDocument();
    });
  });
});
