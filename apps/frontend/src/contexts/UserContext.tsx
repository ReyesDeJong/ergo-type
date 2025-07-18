import React, { useState, useEffect } from 'react';
import { UserContext, type User } from './UserContext';

export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, checkAuthStatus, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
