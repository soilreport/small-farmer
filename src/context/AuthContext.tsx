// src/context/AuthContext.tsx
import { createContext, useState, useContext, type ReactNode } from "react";
import {
  signInWithPassword as firebaseSignIn,
  signUpWithPassword as firebaseSignUp,
} from "../api/firebaseAuth";
import { setSessionIdToken } from "../lib/authTokenStorage";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "farmer" | "researcher" | "admin";
}

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  role: "farmer" | "researcher";
};

type LoginOptions = {
  fullName?: string;
  role?: User["role"];
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, options?: LoginOptions) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = "user";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUser(): User | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    return null;
  }
}

function deriveRoleFromEmail(email: string): User["role"] {
  if (email.includes("research")) return "researcher";
  if (email.includes("admin")) return "admin";
  return "farmer";
}

function deriveNameFromEmail(email: string): string {
  return email.split("@")[0]?.replace(".", " ") || "User";
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string, options?: LoginOptions) => {
    setLoading(true);
    setError(null);
    try {
      const cleanEmail = email.trim();
      if (!cleanEmail) throw new Error("Email is required");
      if (!password || password.length < 6) throw new Error("Password is too short");

      const fb = await firebaseSignIn(cleanEmail, password);
      setSessionIdToken(fb.idToken);

      const nextUser: User = {
        id: fb.localId,
        email: fb.email,
        fullName: options?.fullName?.trim() || deriveNameFromEmail(fb.email),
        role: options?.role || deriveRoleFromEmail(fb.email),
      };

      setUser(nextUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const fullName = data.fullName.trim();
      const email = data.email.trim();

      if (!fullName) throw new Error("Full name is required");
      if (!email) throw new Error("Email is required");
      if (!data.password || data.password.length < 6) throw new Error("Password too short");

      const fb = await firebaseSignUp(email, data.password);
      setSessionIdToken(fb.idToken);

      const newUser: User = {
        id: fb.localId,
        email: fb.email,
        fullName,
        role: data.role,
      };

      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (err: unknown) {
      console.error("Register failed:", err);
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    setSessionIdToken(null);
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default AuthContext;