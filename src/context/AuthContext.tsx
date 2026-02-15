// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, type ReactNode } from "react";

interface User {
  id: string;
  email: string;
  fullName: string;
  role: "farmer" | "researcher" | "admin";
}

type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
  role: "farmer" | "researcher";
};

type LoginOptions = {
  //changed- allow overriding role/fullName when needed (ex: after register)
  fullName?: string;
  role?: User["role"];
};

interface AuthContextType {
  user: User | null;

  // changed -login returns Promise so UI can await it
  //changed-optional options allow setting name/role instead of guessing from email
  login: (email: string, password: string, options?: LoginOptions) => Promise<void>;

  // changed -register() so Register.tsx can call it 
  register: (data: RegisterPayload) => Promise<void>;

  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //load user from localStorage (keeps user logged in on refresh)
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  //LOGIN
  const login = async (email: string, password: string, options?: LoginOptions) => {
    try {
      //simulate api delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      //basic validation (demo-level). in real app backend validates.
      if (!password || password.length < 6) {
        throw new Error("Invalid password");
      }

      // changed-create a mock user
      //if options.role/fullName are provided, use them.
      // Otherwise, keep your old behavior (guess role from email).
      const derivedRole: User["role"] =
        options?.role ??
        (email.includes("research") ? "researcher" : email.includes("admin") ? "admin" : "farmer");

      const derivedFullName: string =
        options?.fullName ??
        (email.split("@")[0]?.replace(".", " ") || "User");

      const mockUser: User = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        email,
        fullName: derivedFullName,
        role: derivedRole,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  //REGISTER
  const register = async (data: RegisterPayload) => {
    try {
      //added-simulate api delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      //added-basic validation
      if (!data.fullName.trim()) throw new Error("Full name is required");
      if (!data.email.trim()) throw new Error("Email is required");
      if (!data.password || data.password.length < 6) throw new Error("Password too short");

      //added-create user exactly from form input
      const newUser: User = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        email: data.email,
        fullName: data.fullName,
        role: data.role, // keeps farmer/researcher from select
      };

      // added-set user & persist like login does
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  };

  //LOGOUT 
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextValue: AuthContextType = {
    user,
    login,
    register, //ADDED
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default AuthContext;
