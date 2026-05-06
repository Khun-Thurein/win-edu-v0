/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional: Meta app ID for Facebook Page Plugin (Social page). */
  readonly VITE_FACEBOOK_APP_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
