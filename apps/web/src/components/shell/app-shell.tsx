import { Activity, Radio, Trophy } from "lucide-react"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"

export function AppShell({ children }: { readonly children: ReactNode }) {
  return (
    <div className="min-h-svh lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      <aside className="border-b border-border bg-rail px-5 py-7 text-rail-foreground lg:min-h-svh lg:border-r lg:border-b-0">
        <a
          className="group inline-flex items-center gap-3 rounded-sm font-display text-base font-bold tracking-tight transition-colors duration-150 ease-out focus-visible:outline-offset-4"
          href="/"
          aria-label="cursorshop home"
        >
          <span className="grid size-10 place-items-center bg-rail-accent text-[11px] font-extrabold text-accent-foreground transition-transform duration-150 ease-out group-active:scale-[0.97]">
            CS
          </span>
          <span className="text-lg">cursorshop</span>
        </a>

        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-rail-muted">
          Session board
        </p>

        <nav aria-label="Primary" className="mt-4 space-y-1">
          <NavItem active icon={<Radio className="size-4" />} label="Control room" />
          <NavItem icon={<Trophy className="size-4" />} label="Leaderboard" muted />
          <NavItem icon={<Activity className="size-4" />} label="Judging" muted />
        </nav>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  )
}

function NavItem({
  active = false,
  icon,
  label,
  muted = false,
}: {
  readonly active?: boolean
  readonly icon: ReactNode
  readonly label: string
  readonly muted?: boolean
}) {
  return (
    <div
      className={[
        "flex items-center justify-between rounded-sm px-3 py-2 text-sm",
        active ? "bg-white/8 text-rail-foreground" : "",
        muted ? "text-rail-muted opacity-70" : "text-rail-muted",
      ].join(" ")}
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
      {active ? (
        <Badge className="border-transparent bg-rail-accent text-accent-foreground" variant="success">
          Live
        </Badge>
      ) : null}
    </div>
  )
}
