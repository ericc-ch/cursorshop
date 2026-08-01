import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import * as NodePath from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite({ autoCodeSplitting: true, target: "react" }),
    tanstackStart(),
    react(),
  ],
  resolve: {
    alias: {
      "@": NodePath.resolve(import.meta.dirname, "./src"),
    },
  },
  ssr: {
    external: ["cloudflare:workers"],
  },
  build: {
    rolldownOptions: {
      external: ["cloudflare:workers"],
    },
  },
})
