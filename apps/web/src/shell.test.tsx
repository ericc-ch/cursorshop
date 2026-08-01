// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import {
  HealthEmptyBoard,
  HealthErrorPanel,
  HealthPanelSkeleton,
  HealthSuccessPanel,
  formatHealthTimestamp,
} from "./components/shell/health-panel.tsx"

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({
    invalidate: vi.fn(() => Promise.resolve()),
  }),
}))

afterEach(() => {
  cleanup()
})

describe("health shell states", () => {
  it("formats a valid health timestamp", () => {
    expect(formatHealthTimestamp("2026-08-01T06:00:00.000Z")).toMatch(/^Checked /)
  })

  it("renders the loading skeleton", () => {
    render(<HealthPanelSkeleton />)
    expect(screen.getByTestId("health-loading").getAttribute("aria-busy")).toBe("true")
  })

  it("renders the online success panel", () => {
    render(
      <HealthSuccessPanel
        health={{
          service: "api",
          status: "ok",
          timestamp: "2026-08-01T06:00:00.000Z",
        }}
      />,
    )
    expect(screen.getByTestId("health-success")).toBeTruthy()
    expect(screen.getByText("Online")).toBeTruthy()
    expect(screen.getByText("api")).toBeTruthy()
  })

  it("renders the empty board state", () => {
    render(<HealthEmptyBoard />)
    expect(screen.getByTestId("health-empty")).toBeTruthy()
    expect(screen.getByText("No active room yet")).toBeTruthy()
  })

  it("renders the error panel with a focusable retry control", async () => {
    const user = userEvent.setup()
    const reset = vi.fn()
    render(<HealthErrorPanel error={new Error("binding failed")} reset={reset} />)

    const retry = screen.getByRole("button", { name: /retry health check/i })
    expect(screen.getByTestId("health-error")).toBeTruthy()
    expect(retry).toBeTruthy()

    retry.focus()
    expect(document.activeElement).toBe(retry)

    await user.click(retry)
    expect(reset).toHaveBeenCalledTimes(1)
  })
})
