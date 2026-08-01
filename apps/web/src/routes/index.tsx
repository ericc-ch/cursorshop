import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"

import {
  HealthEmptyBoard,
  HealthErrorPanel,
  HealthPanel,
  HealthPanelSkeleton,
} from "@/components/shell/health-panel.tsx"
import { Badge } from "@/components/ui/badge"
import { healthQueryOptions } from "@/lib/health-query.ts"

export const Route = createFileRoute("/")({
  errorComponent: ({ error, reset }) => <HealthErrorPanel error={error} reset={reset} />,
  loader: ({ context }) => context.queryClient.ensureQueryData(healthQueryOptions),
  component: HomePage,
})

function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="shell-rise border-b border-border pb-10">
        <p className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          cursorshop
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Submit projects, score them fairly, and publish the board — without spreadsheets
          or chat threads.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge variant="muted">Workshop control room</Badge>
          <Badge className="bg-success text-success-foreground" variant="success">
            Bound API path
          </Badge>
        </div>
      </header>

      <section
        aria-labelledby="health-heading"
        className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
      >
        <h2 className="sr-only" id="health-heading">
          API health
        </h2>
        <Suspense fallback={<HealthPanelSkeleton />}>
          <HealthPanel />
        </Suspense>
        <HealthEmptyBoard />
      </section>
    </main>
  )
}
