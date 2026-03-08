// src/hooks/useAuth.ts

import { useMemo, useState } from "react";
import type { UserRole } from "../utils/constants";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface LoginInput {
  email: string;
  password: string;
}

interface UseAuthResult {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (data: LoginInput) => Promise<boolean>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

/**
 * Hook for basic authentication state
 * Right now it supports local/mock auth structure
 * Later can connect to Firebase, JWT, backend api, etc
 */
export function useAuth(initialUser: AuthUser | null = null): UseAuthResult {
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = useMemo(() => user !== null, [user]);

  const login = async (data: LoginInput): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // basic frontend validation
      if (!data.email.trim() || !data.password.trim()) {
        setError("Email and password are required.");
        return false;
      }

      /**
       * Mock auth logic for now
       * Replace later with real api/Firebase request
       */
      const mockUser: AuthUser = {
        id: "user-1",
        name: "Demo User",
        email: data.email,
        role: "user",
      };

      setUser(mockUser);
      return true;
    } catch (err) {
      setError("Login failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    setUser,
  };
}