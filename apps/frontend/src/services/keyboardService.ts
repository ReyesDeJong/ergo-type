import type { Keyboard } from '../types/keyboard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const keyboardService = {
  async getAllKeyboards(): Promise<Keyboard[]> {
    const response = await fetch(`${API_BASE_URL}/keyboards`);
    if (!response.ok) {
      throw new Error('Failed to fetch keyboards');
    }
    return response.json();
  },

  async getKeyboardById(id: number): Promise<Keyboard> {
    const response = await fetch(`${API_BASE_URL}/keyboards/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch keyboard');
    }
    return response.json();
  },
};
