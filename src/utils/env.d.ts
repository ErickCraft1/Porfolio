/// <reference types="@cloudflare/workers-types" />

declare global {
    interface Env {
        GITHUB_TOKEN: string;
    }
}

export { };