import type { HealthResponse } from "@cursorshop/shared"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { AlertCircle, RefreshCw } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { healthQueryOptions } from "@/lib/health-query.ts"

/**
 * Format a health timestamp for the scoreboard panel.
 *
 * @param timestamp - ISO-8601 UTC timestamp from the API.
 */
export function formatHealthTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) {
    return "Checked just now"
  }
  return `Checked ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
}

/** Live API health from the hydrated Query cache. */
export function HealthPanel() {
  const { data: health } = useSuspenseQuery(healthQueryOptions)
  return <HealthSuccessPanel health={health} />
}

/** Online health details after a successful bound fetch. */
export function HealthSuccessPanel({ health }: { readonly health: HealthResponse }) {
  return (
    <Card className="shell-rise" data-testid="health-success">
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardDescription>Service binding</CardDescription>
          <CardTitle>API health</CardTitle>
        </div>
        <Badge className="bg-success text-success-foreground" variant="success">
          <span className="live-dot mr-1.5 inline-block size-1.5 rounded-full bg-success-foreground" />
          Online
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <HealthDetails health={health} />
        <p className="text-sm text-muted-foreground">
          The web Worker reaches the API through an Alchemy-managed binding — not a development-only
          public API URL.
        </p>
      </CardContent>
    </Card>
  )
}

/** Loading skeleton while the health Query resolves. */
export function HealthPanelSkeleton() {
  return (
    <Card aria-busy="true" aria-live="polite" data-testid="health-loading">
      <CardHeader>
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-3 h-6 w-40" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  )
}

/** Bound API failure with a focused retry control. */
export function HealthErrorPanel({
  error,
  reset,
}: {
  readonly error: Error
  readonly reset: () => void
}) {
  const router = useRouter()
  return (
    <Card className="shell-rise border-destructive/30" data-testid="health-error">
      <CardHeader>
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle aria-hidden="true" className="size-4" />
          <CardTitle className="text-base">API health unavailable</CardTitle>
        </div>
        <CardDescription>{error.message || "The bound API did not respond."}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => {
            reset()
            void router.invalidate()
          }}
          type="button"
          variant="outline"
        >
          <RefreshCw aria-hidden="true" className="size-4" />
          Retry health check
        </Button>
      </CardContent>
    </Card>
  )
}

/**
 * Empty board when the API is reachable but no workshop session has started.
 *
 * Room creation arrives in a later ticket; this state keeps the shell intentional
 * instead of leaving a blank success panel.
 */
export function HealthEmptyBoard() {
  return (
    <Card className="shell-rise border-dashed" data-testid="health-empty">
      <CardHeader>
        <CardDescription>Rooms</CardDescription>
        <CardTitle>No active room yet</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-relaxed text-muted-foreground">
        The API is online. When an organizer opens a room, submissions and judging will fill this
        board.
      </CardContent>
    </Card>
  )
}

function HealthDetails({ health }: { readonly health: HealthResponse }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {(
        [
          ["Service", health.service],
          ["Status", health.status],
          ["Timestamp", formatHealthTimestamp(health.timestamp)],
        ] as const
      ).map(([label, value]) => (
        <div className="border border-border bg-muted/50 px-4 py-3" key={label}>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </dt>
          <dd className="mt-1 font-mono text-sm">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
