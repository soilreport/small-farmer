import { FIREBASE_WEB_API_KEY } from "../config/env";

const SIGN_IN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";

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
      "Firebase Web API key is not set. Add VITE_FIREBASE_WEB_API_KEY to .env.local (see Postman /signin)."
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
      "Firebase Web API key is not set. Add VITE_FIREBASE_WEB_API_KEY to .env.local (see Postman /register)."
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
