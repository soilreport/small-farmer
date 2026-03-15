/**
 * General API service – re-exports and helpers.
 */
import { api } from "./api";

export { api };

export async function healthCheck(): Promise<boolean> {
  const res = await api.get<{ status?: string }>("/health");
  return res.ok && res.data?.status === "ok";
}
