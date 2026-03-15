/**
 * Mock database helpers for local/demo use.
 * Replace with real DB or API calls later.
 */
const storageKey = "small-farmer-db";

export function getFromDb<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(`${storageKey}:${key}`);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setInDb<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${storageKey}:${key}`, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function removeFromDb(key: string): void {
  try {
    localStorage.removeItem(`${storageKey}:${key}`);
  } catch {
    // ignore
  }
}
