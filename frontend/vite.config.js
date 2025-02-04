import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', 
  build: {
    outDir: 'dist',  // Output directory for the production build
  },
  server: {
    host: '0.0.0.0',  // Allow external access
    port: 5173,
    strictPort: true,
  },
})