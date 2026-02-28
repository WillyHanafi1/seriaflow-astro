/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ADMIN_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
