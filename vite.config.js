import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),basicSsl()],
server: {
    host: '0.0.0.0',
    https: true, // Enables HTTPS
    port: 5173,
    strictPort: true
  }
build: {
    chunkSizeWarningLimit: 1000, // Set limit to 1000 kB
  }
})
