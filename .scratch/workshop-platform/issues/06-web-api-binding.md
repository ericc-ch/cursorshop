# 06 — Web → API transport

Type: grilling

Question: How does the TanStack Start Worker call the API Worker?

Answer: **Cloudflare service binding** managed by Alchemy from the web Worker to the API Worker. The web Worker wraps the bound fetcher as an Effect `HttpClient` and derives a typed `HttpApiClient` from the shared contract. The API also has a public `workers.dev` URL for external HTTP clients.
