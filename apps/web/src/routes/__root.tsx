import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router"

import { AppShell } from "@/components/shell/app-shell.tsx"
import appCss from "@/styles.css?url"

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    links: [{ href: appCss, rel: "stylesheet" }],
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { content: "#f3f5f8", name: "theme-color" },
      {
        content: "Accountless workshop rooms for submissions, judging, and published results.",
        name: "description",
      },
      { title: "cursorshop" },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const { queryClient } = Route.useRouteContext()

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-svh antialiased">
        <QueryClientProvider client={queryClient}>
          <AppShell>
            <Outlet />
          </AppShell>
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
