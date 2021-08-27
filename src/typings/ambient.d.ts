/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

interface HTMLElement {
  _observe?: {
    init: boolean;
    observer: IntersectionObserver;
  };
}

interface Console {
  bark: typeof console.log;
  success: typeof console.log;
  __log: typeof console.log;
  __info: typeof console.info;
  __warn: typeof console.warn;
  __error: typeof console.error;
}

interface ImportMetaEnv {
  VITE_API_ROOT: string;
  VITE_API_PREFIX: string;
  VITE_PUBLIC_PATH: string;
  VITE_JSON_SERVER_PATH: string;
  VITE_APP_NAME: string;
}
