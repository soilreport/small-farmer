/**
 * Auth helpers aligned with CRM Postman routes (/signin, /register).
 * App login still uses AuthContext mock unless you call these explicitly.
 */
import { postSignin, postRegister } from "./crmApi";

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

/** POST /signin */
export async function loginApi(payload: LoginPayload) {
  return postSignin({
    email: payload.email,
    password: payload.password,
  });
}

/** POST /register */
export async function registerApi(payload: RegisterPayload) {
  return postRegister({
    fullName: payload.fullName,
    email: payload.email,
    password: payload.password,
    role: payload.role,
  });
}
