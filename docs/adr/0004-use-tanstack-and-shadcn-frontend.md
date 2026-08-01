# Use TanStack and shadcn for the frontend

cursorshop will use TanStack Start and Router, TanStack Query for server state, and TanStack Form for form state. Route loaders prefetch reusable Query options; components read through Query hooks; mutations update or invalidate the Query cache. TanStack Form validates with shared Effect schemas adapted through Effect's Standard Schema support.

The component system will use Tailwind CSS and shadcn initialized with Base UI. Implementers must prefer an existing shadcn component, then compose existing shadcn components, then use a Base UI primitive, and create a custom interaction component only as a final fallback. Each fallback must record why the earlier options were insufficient.

**Status:** accepted

**Options Considered:** Direct Start loader data without Query; client-only Query; native React form state; direct Base UI usage; custom primitives; Radix-backed shadcn.

**Consequences:** The application has one server-state convention and one form-state convention. Base UI supplies accessible behavior beneath shadcn's styled components, while copied shadcn source remains locally adaptable. The extra TanStack packages increase the frontend toolchain, so implementation must consult current official documentation before using APIs and avoid abstractions that duplicate framework behavior.

**References:**
- [TanStack Start React Query example](https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query)
- [TanStack Form validation](https://tanstack.com/form/latest/docs/framework/react/guides/validation)
- [Effect Schema to Standard Schema](https://effect.website/docs/schema/standard-schema/)
- [shadcn for TanStack Start](https://ui.shadcn.com/docs/installation/tanstack)
- [shadcn Base UI default](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)
- [Base UI overview](https://base-ui.com/react/overview/about)
