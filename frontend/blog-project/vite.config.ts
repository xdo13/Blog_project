import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/blog',
  server: {
    proxy: {
      '/api': 'http://localhost:9090',
    },
  },
});