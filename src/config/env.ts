function trimUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

const rawBase = "https://soil-repo-gcp-git-678290165816.europe-west1.run.app";

export const API_BASE_URL = trimUrl(String(rawBase));
export const API_TOKEN = (import.meta.env.VITE_API_TOKEN ?? "").trim();
export const FIREBASE_WEB_API_KEY = (import.meta.env.VITE_FIREBASE_WEB_API_KEY ?? "").trim();
export const API_DEVICE_ID = (import.meta.env.VITE_API_DEVICE_ID ?? "1").trim();
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

export const isApiConfigured = (): boolean => API_BASE_URL.length > 0;
