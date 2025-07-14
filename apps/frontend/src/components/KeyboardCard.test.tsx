import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import KeyboardCard from './KeyboardCard';
import type { Keyboard } from '../types/keyboard';

const mockKeyboard: Keyboard = {
  id: 1,
  name: 'Test Keyboard',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('KeyboardCard', () => {
  it('renders keyboard name', () => {
    render(<KeyboardCard keyboard={mockKeyboard} />);
    expect(screen.getByText('Test Keyboard')).toBeInTheDocument();
  });

  it('renders keyboard preview placeholder', () => {
    render(<KeyboardCard keyboard={mockKeyboard} />);
    expect(screen.getByText('Keyboard Preview')).toBeInTheDocument();
  });
});
