/// Ambient types for Cloudflare Worker modules during TypeScript checking.
declare module "cloudflare:workers" {
  export const env: Record<string, unknown>
}
