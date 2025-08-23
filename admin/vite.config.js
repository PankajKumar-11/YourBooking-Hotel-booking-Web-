import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': 'http://localhost:8800',
      '/hotels': 'http://localhost:8800',
      '/rooms': 'http://localhost:8800',
      '/auth': 'http://localhost:8800',
    }
  }
});
