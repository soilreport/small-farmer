/**
 * CRM routes from Postman collection "Soil-Report" → CRM folder.
 */
import { api, type ApiResponse } from "./api";

/** GET /users */
export function getUsers(): Promise<ApiResponse<unknown>> {
  return api.get("/users");
}

/** POST /register */
export function postRegister(body: unknown): Promise<ApiResponse<unknown>> {
  return api.post("/register", body);
}

/** POST /lookup */
export function postLookup(body: unknown): Promise<ApiResponse<unknown>> {
  return api.post("/lookup", body);
}

/** POST /signin */
export function postSignin(body: unknown): Promise<ApiResponse<unknown>> {
  return api.post("/signin", body);
}

/** POST /sendOTP */
export function postSendOTP(body: unknown): Promise<ApiResponse<unknown>> {
  return api.post("/sendOTP", body);
}

/** POST /auth/bootstrap */
export function postAuthBootstrap(body: unknown): Promise<ApiResponse<unknown>> {
  return api.post("/auth/bootstrap", body);
}
