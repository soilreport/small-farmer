/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend origin (no trailing slash). Same as VITE_API_URL if you prefer that name. */
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_URL?: string;
  /** Optional Bearer token for Cloud Run / protected APIs (still visible in client bundle). */
  readonly VITE_API_TOKEN?: string;
  /** Default device id for device-state-latest */
  readonly VITE_API_DEVICE_ID?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
