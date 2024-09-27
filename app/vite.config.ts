import ViteReact from "@vitejs/plugin-react"
import {resolve} from "path"
import {defineConfig} from "vite"

export default defineConfig({
  root: resolve(import.meta.dirname, "."),
  build: {outDir: "build/browser"}, // relative to "root"
  esbuild: {legalComments: "none"}, // hide comments in the output
  server: {port: 3000},
  plugins: [
    ViteReact({
      babel: {
        // ... babel plugin npm package currently broken ...
        // plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
})
