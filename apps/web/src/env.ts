import * as cf from "cloudflare:workers"

import type { WebEnv } from "./web-env.ts"

/** Typed Cloudflare Worker `env` deferred until request handlers run. */
export const env = new Proxy({} as WebEnv, {
  get(_, prop) {
    return cf.env[prop as keyof typeof cf.env]
  },
})
