// src/types/auth.ts

//changed -added shared role type so we dont repeat strings everywhere
export type UserRole = "farmer" | "researcher" | "admin";

//changed -user is now the single source of truth (used by AuthContext, Navbar, etc)
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt?: string; // optional for now (backend can add later)
}

export interface LoginCredentials {
  email: string;
  password: string;
}

//changed- role uses UserRole instead of string
export interface RegisterData extends LoginCredentials {
  fullName: string;
  role: UserRole;
}
