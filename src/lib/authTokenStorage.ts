export const ID_TOKEN_KEY = "sf-id-token";

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
