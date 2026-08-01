import { Effect } from "effect"
import { describe, expect, it } from "vitest"

import {
  CURSORSHOP_API_DOMAIN,
  CURSORSHOP_R2_BILLING,
  CURSORSHOP_R2_STORAGE_CLASS,
  CURSORSHOP_STAGE,
  CURSORSHOP_WORKERS_PLAN,
  DATABASE_LOGICAL_ID,
  Database,
  SCREENSHOTS_LOGICAL_ID,
  Screenshots,
  apiWorkerProps,
} from "./deploy.ts"

describe("api deploy configuration", () => {
  it("targets a single production stage", () => {
    expect(CURSORSHOP_STAGE).toBe("prod")
  })

  it("publishes the API Worker on api.cursorshop.ericc.ch", () => {
    expect(CURSORSHOP_API_DOMAIN).toBe("api.cursorshop.ericc.ch")
    expect(apiWorkerProps.domain).toBe("api.cursorshop.ericc.ch")
  })

  it("defaults to Workers Free without paid CPU limits", () => {
    expect(CURSORSHOP_WORKERS_PLAN).toBe("free")
    expect("limits" in apiWorkerProps).toBe(false)
  })

  it("declares a D1 database resource effect", () => {
    expect(DATABASE_LOGICAL_ID).toBe("Database")
    expect(Effect.isEffect(Database)).toBe(true)
  })

  it("declares an R2 PAYG screenshots bucket", () => {
    expect(SCREENSHOTS_LOGICAL_ID).toBe("Screenshots")
    expect(CURSORSHOP_R2_BILLING).toBe("pay-as-you-go")
    expect(CURSORSHOP_R2_STORAGE_CLASS).toBe("Standard")
    expect(Effect.isEffect(Screenshots)).toBe(true)
  })
})
