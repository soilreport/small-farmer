export const ID_TOKEN_KEY = "sf-id-token";
export const REFRESH_TOKEN_KEY = "sf-refresh-token";

export function getSessionIdToken(): string | null {
  try {
    return localStorage.getItem(ID_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setSessionIdToken(token: string | null): void {
  try {
    if (!token) {
      localStorage.removeItem(ID_TOKEN_KEY);
      return;
    }
    localStorage.setItem(ID_TOKEN_KEY, token);
  } catch {}
}

export function getRefreshToken(): string | null {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setRefreshToken(token: string | null): void {
  try {
    if (!token) {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      return;
    }
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } catch {}
}

export function clearFirebaseSession(): void {
  setSessionIdToken(null);
  setRefreshToken(null);
}

export function setFirebaseSessionTokens(idToken: string, refreshToken: string): void {
  setSessionIdToken(idToken);
  setRefreshToken(refreshToken);
}
