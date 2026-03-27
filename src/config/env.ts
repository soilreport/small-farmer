/**
 * Vite injects VITE_* at build time. Use .env.local for secrets (gitignored via *.local).
 * Never commit real tokens.
 *
 * Base URL: use VITE_API_BASE_URL or VITE_API_URL (same meaning).
 */
function trimUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

const rawBase =
  import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? "";

export const API_BASE_URL = trimUrl(String(rawBase));
export const API_TOKEN = (import.meta.env.VITE_API_TOKEN ?? "").trim();
/** Default device id for “fetch latest” on Readings */
export const API_DEVICE_ID = (import.meta.env.VITE_API_DEVICE_ID ?? "1").trim();
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

export const isApiConfigured = (): boolean => API_BASE_URL.length > 0;
