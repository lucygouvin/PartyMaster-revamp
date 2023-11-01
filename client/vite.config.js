import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
    '/graphql': {
      tartget: "http://localhost:3001",
      changeOrigin: true,
      secure: false,
    }
  },
  port: 3000,
  open: true,
  }
})
