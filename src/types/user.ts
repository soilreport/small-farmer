/**
 * Shared user type for auth and profile.
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "farmer" | "researcher" | "admin";
}

export type UserRole = User["role"];
