import { Effect } from "effect"
import { describe, expect, it } from "vitest"

import Web, { CURSORSHOP_WEB_DOMAIN, WEB_WORKER_LOGICAL_ID, webWorkerProps } from "./web.ts"

describe("web deploy configuration", () => {
  it("publishes the web Worker on cursorshop.ericc.ch", () => {
    expect(CURSORSHOP_WEB_DOMAIN).toBe("cursorshop.ericc.ch")
    expect(webWorkerProps.domain).toBe("cursorshop.ericc.ch")
  })

  it("declares a TanStack Start website resource effect", () => {
    expect(WEB_WORKER_LOGICAL_ID).toBe("Web")
    expect(Effect.isEffect(Web)).toBe(true)
  })

  it("defaults to Workers Free without paid CPU limits", () => {
    expect("limits" in webWorkerProps).toBe(false)
  })
})
