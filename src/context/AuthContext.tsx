// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, type ReactNode } from "react";

//cyhanged- import shared User type from src/types/auth.ts
import type { User } from "../types/auth";

//changed-  removed duplicate User interface from this file
interface AuthContextType {
  user: User | null;

  //note - we keep this signature same so your app doesnt break
  login: (email: string, password: string, role?: User["role"], fullName?: string) => Promise<void>;

  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //initialize user from localStorage if exists
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  //changed -login now can accept role + fullName (used by Register)
  const login = async (
    email: string,
    password: string,
    role?: User["role"],
    fullName?: string
  ) => {
    try {
      //simulate api call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      //changed- password check stays same
      if (!password || password.length < 6) {
        throw new Error("Invalid password");
      }

      //role priority:
      // 1) role passed from Register (role param)
      // 2) otherwise detect from email (old logic)
      const finalRole: User["role"] =
        role ??
        (email.includes("research")
          ? "researcher"
          : email.includes("admin")
          ? "admin"
          : "farmer");

      //fullName priority:
      // 1) fullName passed from Register
      // 2) otherwise generate from email
      const finalFullName =
        fullName ??
        (email.split("@")[0]?.replace(".", " ") || "User");

      const mockUser: User = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        email,
        fullName: finalFullName,
        role: finalRole,
        createdAt: new Date().toISOString(), //changed - optional
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextValue: AuthContextType = {
    user,
    login,
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
