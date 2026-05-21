import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  // GitHub Pages project site path for https://<username>.github.io/homepage/.
  // If you later bind the custom domain xminstrel.top, change this base to '/'.
  base: '/homepage/',
})
