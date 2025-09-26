import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',              //  important for static hosting
  plugins: [react()],
  server: { port: 5173 }
})
