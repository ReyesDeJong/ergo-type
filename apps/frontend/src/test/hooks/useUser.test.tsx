import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserProvider } from '../../contexts/UserContext.tsx';
import { useUser } from '../../hooks/useUser';

const TestComponent = () => {
  const { user, loading } = useUser();
  return (
    <div>
      <span data-testid='loading'>{loading ? 'loading' : 'loaded'}</span>
      {user && <span data-testid='email'>{user.email}</span>}
    </div>
  );
};

describe('useUser hook with UserProvider', () => {
  it('shows loading then no user when /auth/me returns 401', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    expect(screen.getByTestId('loading').textContent).toBe('loading');
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('loaded');
      expect(screen.queryByTestId('email')).not.toBeInTheDocument();
    });
  });

  it('provides user when /auth/me returns user', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        user: {
          id: 2,
          email: 'alice@example.com',
          createdAt: '',
          updatedAt: '',
        },
      }),
    });
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('email').textContent).toBe('alice@example.com');
    });
  });
});
