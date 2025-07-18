import { createContext } from 'react';

export interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserContextType {
  user: User | null;
  loading: boolean;
  checkAuthStatus: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
