/**
 * Lightweight auth store (localStorage sync).
 * Use with AuthContext for app-wide auth; this can back token/session persistence.
 */
const AUTH_STORAGE_KEY = "sf-auth-store";

export interface AuthStoreState {
  token: string | null;
  email: string | null;
}

export function getAuthStore(): AuthStoreState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthStoreState) : { token: null, email: null };
  } catch {
    return { token: null, email: null };
  }
}

export function setAuthStore(state: AuthStoreState): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function clearAuthStore(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // ignore
  }
}
