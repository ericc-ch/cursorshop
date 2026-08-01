# Use Alchemy v2 on Cloudflare

Showcase will use Alchemy v2 as its infrastructure-as-code layer for one Cloudflare stage on `workers.dev`, with Workers Free, D1 for relational data, and R2 PAYG for screenshots. This replaces the starter's Netlify/Railway targets and keeps application resources, bindings, and deployment in one Effect-based stack.

**Status:** accepted

**Consequences:** Cloudflare's 10 ms Free-plan CPU limit is a known risk; Workers Paid is a fallback rather than a requirement.
