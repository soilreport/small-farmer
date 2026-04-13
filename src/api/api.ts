import { API_BASE_URL, API_TOKEN } from "../config/env";
import { refreshIdToken } from "./firebaseAuth";
import {
  getRefreshToken,
  getSessionIdToken,
  setFirebaseSessionTokens,
} from "../lib/authTokenStorage";

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  status?: number;
}

function baseHeaders(includeJson: boolean): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/json" };
  const bearer = getSessionIdToken() || API_TOKEN;
  if (bearer) h.Authorization = `Bearer ${bearer}`;
  if (includeJson) h["Content-Type"] = "application/json";
  return h;
}

async function tryRefreshFirebaseAndUpdateSession(): Promise<boolean> {
  const rt = getRefreshToken();
  if (!rt) return false;
  try {
    const next = await refreshIdToken(rt);
    setFirebaseSessionTokens(next.idToken, next.refreshToken);
    return true;
  } catch {
    return false;
  }
}

async function parseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { raw: text };
  }
}

async function request<T>(
  path: string,
  options?: RequestInit,
  retriedAfterRefresh = false
): Promise<ApiResponse<T>> {
  if (!API_BASE_URL) {
    return { ok: false, error: "VITE_API_BASE_URL is not set. Add it in .env.local." };
  }
  const url = path.startsWith("http")
    ? path
    : `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const headers: Record<string, string> = {
    ...baseHeaders(Boolean(options?.body)),
  };
  if (options?.headers && typeof options.headers === "object" && !(options.headers instanceof Headers)) {
    Object.assign(headers, options.headers as Record<string, string>);
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });
    const data = (await parseBody(res)) as T | undefined;

    if (res.status === 401 && !retriedAfterRefresh && (await tryRefreshFirebaseAndUpdateSession())) {
      return request<T>(path, options, true);
    }

    if (!res.ok) {
      const msg =
        data && typeof data === "object" && data !== null && "message" in data
          ? String((data as { message?: unknown }).message)
          : res.statusText;
      return { ok: false, error: msg || `HTTP ${res.status}`, status: res.status };
    }
    return { ok: true, data, status: res.status };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
