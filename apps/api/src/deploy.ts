/**
 * Deploy constants and storage resources for the cursorshop API Worker.
 *
 * Kept separate from the Worker runtime so tests and `alchemy.run.ts` can
 * assert the intended stage, domain, Workers Free posture, and R2 PAYG
 * settings without live deploy/destroy suites.
 */
import * as Cloudflare from "alchemy/Cloudflare"

/** Single intended Alchemy deploy stage for public cursorshop hosts. */
export const CURSORSHOP_STAGE = "prod" as const

/** Public hostname for the API Worker. */
export const CURSORSHOP_API_DOMAIN = "api.cursorshop.ericc.ch" as const

/**
 * Cloudflare Workers plan target.
 *
 * Free is the default; omit Worker `limits` so paid-only CPU budgets are not
 * requested. Workers Paid remains an emergency fallback only.
 */
export const CURSORSHOP_WORKERS_PLAN = "free" as const

/** R2 billing model — pay-as-you-go, not reserved capacity. */
export const CURSORSHOP_R2_BILLING = "pay-as-you-go" as const

/** R2 storage class used for screenshot objects. */
export const CURSORSHOP_R2_STORAGE_CLASS = "Standard" as const

/** Logical ID for the D1 database resource. */
export const DATABASE_LOGICAL_ID = "Database" as const

/** Logical ID for the screenshots R2 bucket. */
export const SCREENSHOTS_LOGICAL_ID = "Screenshots" as const

/** Logical ID for the public API Worker. */
export const API_WORKER_LOGICAL_ID = "Api" as const

/**
 * D1 database for rooms, submissions, screenshot metadata, and scores.
 *
 * Migrations are applied in later tickets; this ticket only provisions the
 * binding surface.
 */
export const Database = Cloudflare.D1.Database(DATABASE_LOGICAL_ID)

/**
 * R2 bucket for submission screenshot objects (PAYG Standard class).
 */
export const Screenshots = Cloudflare.R2.Bucket(SCREENSHOTS_LOGICAL_ID, {
  storageClass: CURSORSHOP_R2_STORAGE_CLASS,
})

/**
 * Static Worker props shared by the Effect-native API Worker.
 *
 * `main` is supplied by the Worker module (`import.meta.url`). `limits` is
 * intentionally omitted for Workers Free.
 */
export const apiWorkerProps = {
  domain: CURSORSHOP_API_DOMAIN,
} as const
