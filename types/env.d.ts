/// <reference types="vite/client" />
interface ImportMetaEnv {
    // Define your environment variables here
    readonly VITE_API_BASE_URL: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}