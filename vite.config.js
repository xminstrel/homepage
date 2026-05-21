import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  // Custom domain deployment for https://xminstrel.top/.
  // If you switch back to https://<username>.github.io/homepage/, change this base to '/homepage/'.
  base: '/',
})
