/**
 * Typed Cloudflare Worker env for the TanStack Start web app.
 *
 * Mirrors the Alchemy `Web` resource `env: { API: Api }` binding without
 * importing the API package into the web TypeScript project.
 */
export type WebEnv = {
  readonly API: {
    readonly fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
  }
}
