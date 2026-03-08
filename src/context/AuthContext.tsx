// src/context/AuthContext.tsx

import {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from "react";

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
  login: (
    email: string,
    password: string,
    options?: LoginOptions
  ) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const STORAGE_KEY = "user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUser(): User | null {
  try {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
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

  const login = async (
    email: string,
    password: string,
    options?: LoginOptions
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const cleanEmail = email.trim();
      if (!cleanEmail) {
        throw new Error("Email is required");
      }

      if (!password || password.length < 6) {
        throw new Error("Invalid password");
      }

      const mockUser: User = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        email: cleanEmail,
        fullName: options?.fullName?.trim() || deriveNameFromEmail(cleanEmail),
        role: options?.role || deriveRoleFromEmail(cleanEmail),
      };

      setUser(mockUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (data: RegisterPayload) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const fullName = data.fullName.trim();
      const email = data.email.trim();

      if (!fullName) throw new Error("Full name is required");
      if (!email) throw new Error("Email is required");
      if (!data.password || data.password.length < 6) {
        throw new Error("Password too short");
      }

      const newUser: User = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        email,
        fullName,
        role: data.role,
      };

      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const contextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default AuthContext;