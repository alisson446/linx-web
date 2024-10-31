import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.NODE_ENV === 'production' ? 80 : 3000,
    host: process.env.NODE_ENV === 'production' ? "host.docker.internal" : '127.0.0.1'
  },
  plugins: [svgr(), react()],
  build: {
    chunkSizeWarningLimit: 5000
  }
})
