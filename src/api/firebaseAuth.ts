import { API_BASE_URL, FIREBASE_WEB_API_KEY } from "../config/env";

const SIGN_IN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";

const SECURE_TOKEN_URL = "https://securetoken.googleapis.com/v1/token";

export interface FirebaseSignInResponse {
  localId: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

function mapFirebaseMessage(message?: string): string {
  if (!message) return "Sign in failed";
  const map: Record<string, string> = {
    EMAIL_NOT_FOUND: "No account found for this email.",
    INVALID_PASSWORD: "Invalid password.",
    INVALID_LOGIN_CREDENTIALS: "Invalid email or password.",
    INVALID_EMAIL: "Invalid email address.",
    USER_DISABLED: "This account has been disabled.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "Too many attempts. Try again later.",
    EMAIL_EXISTS: "This email is already registered. Try logging in instead.",
    WEAK_PASSWORD: "Password is too weak. Use a stronger password.",
  };
  return map[message] ?? message.replace(/_/g, " ");
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<FirebaseSignInResponse> {
  const key = FIREBASE_WEB_API_KEY.trim();
  if (!key) {
    throw new Error(
      "Firebase Web API key is not set. Add VITE_FIREBASE_WEB_API_KEY to local env or deployment secrets (see Postman /signin)."
    );
  }

  const url = `${SIGN_IN_URL}?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      password,
      returnSecureToken: true,
    }),
  });

  const data = (await res.json()) as {
    idToken?: string;
    localId?: string;
    email?: string;
    refreshToken?: string;
    expiresIn?: string;
    error?: { message?: string };
  };

  if (!res.ok || !data.idToken) {
    const msg = data.error?.message;
    throw new Error(mapFirebaseMessage(msg));
  }

  return {
    localId: data.localId ?? "",
    email: data.email ?? email.trim(),
    idToken: data.idToken,
    refreshToken: data.refreshToken ?? "",
    expiresIn: data.expiresIn ?? "",
  };
}

export async function signUpWithPassword(
  email: string,
  password: string
): Promise<FirebaseSignInResponse> {
  const key = FIREBASE_WEB_API_KEY.trim();
  if (!key) {
    throw new Error(
      "Firebase Web API key is not set. Add VITE_FIREBASE_WEB_API_KEY to local env or deployment secrets (see Postman /register)."
    );
  }

  const url = `${SIGN_UP_URL}?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      password,
      returnSecureToken: true,
    }),
  });

  const data = (await res.json()) as {
    idToken?: string;
    localId?: string;
    email?: string;
    refreshToken?: string;
    expiresIn?: string;
    error?: { message?: string };
  };

  if (!res.ok || !data.idToken) {
    const msg = data.error?.message;
    throw new Error(mapFirebaseMessage(msg));
  }

  return {
    localId: data.localId ?? "",
    email: data.email ?? email.trim(),
    idToken: data.idToken,
    refreshToken: data.refreshToken ?? "",
    expiresIn: data.expiresIn ?? "",
  };
}

export async function refreshIdToken(refreshToken: string): Promise<{
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}> {
  const key = FIREBASE_WEB_API_KEY.trim();
  if (!key) {
    throw new Error(
      "Firebase Web API key is not set. Add VITE_FIREBASE_WEB_API_KEY to local env or deployment secrets."
    );
  }

  const url = `${SECURE_TOKEN_URL}?key=${encodeURIComponent(key)}`;
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = (await res.json()) as {
    id_token?: string;
    refresh_token?: string;
    expires_in?: string;
    error?: { message?: string };
  };

  if (!res.ok || !data.id_token) {
    const msg = data.error?.message ?? "Token refresh failed";
    throw new Error(msg);
  }

  return {
    idToken: data.id_token,
    refreshToken: data.refresh_token ?? refreshToken,
    expiresIn: String(data.expires_in ?? "3600"),
  };
}

export type AuthBootstrapPayload = {
  fullName: string;
  phoneNumber: string;
};

export async function postAuthBootstrap(
  idToken: string,
  payload: AuthBootstrapPayload
): Promise<void> {
  const base = API_BASE_URL.replace(/\/+$/, "");
  const url = `${base}/auth/bootstrap`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      fullName: payload.fullName.trim(),
      phoneNumber: payload.phoneNumber.trim(),
    }),
  });

  const text = await res.text();
  let errMsg = res.statusText;
  if (text) {
    try {
      const j = JSON.parse(text) as { message?: string };
      if (j.message) errMsg = j.message;
    } catch {
      errMsg = text;
    }
  }

  if (!res.ok) {
    throw new Error(errMsg || `Bootstrap failed (${res.status})`);
  }
}
