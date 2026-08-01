/**
 * TanStack Start web Worker resource for the cursorshop Alchemy stack.
 *
 * Declared next to the stack so TypeScript project references stay acyclic:
 * the website `rootDir` points at `apps/web`, and `env.API` binds the API Worker.
 */
import * as Cloudflare from "alchemy/Cloudflare"
import * as NodePath from "node:path"
import { fileURLToPath } from "node:url"

import Api from "./worker.ts"

/** Public hostname for the TanStack Start web Worker. */
export const CURSORSHOP_WEB_DOMAIN = "cursorshop.ericc.ch" as const

/** Logical ID for the web Worker website resource. */
export const WEB_WORKER_LOGICAL_ID = "Web" as const

/** Static website props shared by the TanStack Start Worker. */
export const webWorkerProps = {
  domain: CURSORSHOP_WEB_DOMAIN,
  compatibility: { flags: ["nodejs_compat"] },
  assets: { runWorkerFirst: true as const },
  memo: {
    include: ["**/*", "../../packages/shared/src/**"],
    lockfile: true as const,
  },
}

const webRoot = NodePath.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../web")

/** TanStack Start site on `cursorshop.ericc.ch`, bound to the API Worker. */
export default class Web extends Cloudflare.Website.Vite<Web>()(WEB_WORKER_LOGICAL_ID, {
  ...webWorkerProps,
  rootDir: webRoot,
  env: { API: Api },
}) {}

/** Typed Cloudflare `env` for the web Worker. */
export type WebEnv = Cloudflare.InferEnv<typeof Web>
