/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  VITE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
