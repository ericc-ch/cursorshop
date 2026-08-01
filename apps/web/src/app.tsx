import { parseHealthResponse, type HealthResponse } from "@cursorshop/shared"
import { Result } from "effect"
import { useEffect, useState } from "react"

const navigation = [
  { index: "01", label: "Overview" },
  { index: "02", label: "Collections" },
  { index: "03", label: "Settings" },
] as const

type NavigationLabel = (typeof navigation)[number]["label"]
type RequestState = "loading" | "online" | "offline"

const starterNotes = [
  {
    eyebrow: "Structure",
    title: "Apps stay focused",
    description: "The browser and API have their own release seams, scripts, and entrypoints.",
  },
  {
    eyebrow: "Contracts",
    title: "Share the important shape",
    description: "Runtime-checked response contracts live in one small package between both sides.",
  },
  {
    eyebrow: "Workflow",
    title: "Keep the loop short",
    description:
      "One command checks types, tests, and linting before a build proves the edges connect.",
  },
] as const

function formatHealthTime(timestamp: string | undefined): string {
  if (timestamp === undefined) {
    return "Waiting for the API"
  }

  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) {
    return "Connected just now"
  }

  return `Checked ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
}

export function App() {
  const [activeView, setActiveView] = useState<NavigationLabel>("Overview")
  const [health, setHealth] = useState<HealthResponse>()
  const [requestState, setRequestState] = useState<RequestState>("loading")

  useEffect(() => {
    const controller = new AbortController()

    const loadHealth = async (): Promise<void> => {
      try {
        const response = await fetch("/api/health", { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Health request failed with ${response.status}`)
        }

        const payload = (await response.json()) as unknown
        const parsed = parseHealthResponse(payload)
        if (Result.isFailure(parsed)) {
          setRequestState("offline")
          return
        }

        setHealth(parsed.success)
        setRequestState("online")
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }

        setRequestState("offline")
      }
    }

    void loadHealth()

    return () => controller.abort()
  }, [])

  const statusLabel =
    requestState === "online"
      ? "API online"
      : requestState === "offline"
        ? "API offline"
        : "Checking API"

  return (
    <div className="app-shell">
      <aside className="side-rail">
        <a className="brand" href="/" aria-label="Cursor Shop home">
          <span className="brand-mark">CS</span>
          <span>Cursor Shop</span>
        </a>

        <div className="rail-content">
          <p className="rail-label">Workspace</p>
          <nav aria-label="Primary navigation">
            <ul className="nav-list">
              {navigation.map((item) => (
                <li key={item.label}>
                  <button
                    className={activeView === item.label ? "nav-item active" : "nav-item"}
                    type="button"
                    aria-current={activeView === item.label ? "page" : undefined}
                    onClick={() => setActiveView(item.label)}
                  >
                    <span>{item.label}</span>
                    <span className="nav-index">{item.index}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="rail-footer">
          <span className="rail-footer-mark">+</span>
          <div>
            <p>New workspace</p>
            <span>Start with a clean surface</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb" aria-label="Breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-slash">/</span>
            <strong>{activeView}</strong>
          </div>
          <div className="topbar-meta">
            <span className="live-pill">
              <span className="live-dot" aria-hidden="true" />
              Local mode
            </span>
            <span className="avatar" aria-label="Cursor Shop">
              CS
            </span>
          </div>
        </header>

        <div className="page-content">
          <section className="hero" aria-labelledby="page-title">
            <div className="hero-copy">
              <p className="eyebrow">Cursor Shop / starter surface</p>
              <h1 id="page-title">A sharp start for your next web app.</h1>
              <p className="hero-description">
                A calm, connected baseline for shipping the next idea. Keep the pieces small, make
                the boundaries obvious, and let the product take over from here.
              </p>
              <a className="hero-link" href="#starter-notes">
                See the setup <span aria-hidden="true">-&gt;</span>
              </a>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="visual-orbit orbit-large" />
              <div className="visual-orbit orbit-small" />
              <div className="visual-card">
                <span className="visual-card-label">Current signal</span>
                <strong>Build with intent.</strong>
                <div className="visual-card-line" />
                <div className="visual-card-line short" />
                <span className="visual-card-index">01 / 03</span>
              </div>
              <span className="visual-cross cross-one">+</span>
              <span className="visual-cross cross-two">+</span>
            </div>
          </section>

          <section className="signal-section" aria-labelledby="signal-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Right now</p>
                <h2 id="signal-title">The workspace is ready.</h2>
              </div>
              <p className="section-note">A small health check makes the local boundary visible.</p>
            </div>

            <div className="signal-grid">
              <article className="signal-card primary-signal">
                <div className="card-topline">
                  <span className="card-label">API signal</span>
                  <span className={`signal-indicator ${requestState}`} aria-hidden="true" />
                </div>
                <strong>{statusLabel}</strong>
                <p>{formatHealthTime(health?.timestamp)}</p>
              </article>

              <article className="signal-card">
                <div className="card-topline">
                  <span className="card-label">Web app</span>
                  <span className="card-number">01</span>
                </div>
                <strong>Vite + React</strong>
                <p>Fast feedback with a browser-first entrypoint.</p>
              </article>

              <article className="signal-card">
                <div className="card-topline">
                  <span className="card-label">Shared layer</span>
                  <span className="card-number">02</span>
                </div>
                <strong>One contract</strong>
                <p>Types and runtime validation travel with the data.</p>
              </article>
            </div>
          </section>

          <section className="notes-section" id="starter-notes" aria-labelledby="notes-title">
            <div className="section-heading notes-heading">
              <div>
                <p className="eyebrow">Starter notes</p>
                <h2 id="notes-title">Make the first change yours.</h2>
              </div>
              <span className="section-count">03 pieces</span>
            </div>

            <div className="notes-grid">
              {starterNotes.map((note, index) => (
                <article className="note-card" key={note.eyebrow}>
                  <span className="note-index">0{index + 1}</span>
                  <p className="card-label">{note.eyebrow}</p>
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
