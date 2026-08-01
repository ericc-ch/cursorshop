import { queryOptions } from "@tanstack/react-query"
import { createServerFn } from "@tanstack/react-start"
import { Effect } from "effect"

import { env } from "../env.ts"
import { fetchApiHealth } from "./api-client.ts"

/**
 * Server function: read API health through the Cloudflare service binding.
 */
export const getHealth = createServerFn({ method: "GET" }).handler(async () => {
  return Effect.runPromise(fetchApiHealth(env.API))
})

/** Reusable Query options for API health — prefetched in route loaders. */
export const healthQueryOptions = queryOptions({
  queryKey: ["api", "health"] as const,
  queryFn: () => getHealth(),
  staleTime: 30_000,
})
