/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_API_TOKEN?: string;
  readonly VITE_API_DEVICE_ID?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
  readonly VITE_FIREBASE_WEB_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
