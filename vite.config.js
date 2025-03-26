import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    host: '0.0.0.0',
    https: true, // Enables HTTPS
    port: 5173,
    strictPort: true
  }, // <-- THIS COMMA WAS MISSING
  build: {
    chunkSizeWarningLimit: 1000 // Set limit to 1000 kB
  }
})
