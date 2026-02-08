// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'farmer' | 'researcher' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize user from localStorage if exists
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      return null;
    }
  });

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user creation based on email
      const mockUser: User = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        email: email,
        fullName: email.split('@')[0]?.replace('.', ' ') || 'User',
        role: email.includes('research') ? 'researcher' : 
              email.includes('admin') ? 'admin' : 'farmer'
      };
      
      // Validate password (in real app, this would be done on backend)
      if (!password || password.length < 6) {
        throw new Error('Invalid password');
      }
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw so Login.tsx can catch it
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Optional: Export the context for direct usage if needed
export default AuthContext;