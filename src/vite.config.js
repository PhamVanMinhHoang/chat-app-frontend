import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: false,
    port: 5175,
    host: true,
    watch : {
      usePolling: true, // Use polling for file watching
      interval: 1000, // Polling interval in milliseconds
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
})
