/**
 * Auth API service (mock). Replace with real backend calls.
 */
import { api } from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export async function loginApi(payload: LoginPayload) {
  return api.post<{ token?: string; user?: unknown }>("/auth/login", payload);
}

export async function registerApi(payload: RegisterPayload) {
  return api.post<{ token?: string; user?: unknown }>("/auth/register", payload);
}
