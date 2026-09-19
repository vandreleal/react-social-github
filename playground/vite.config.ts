import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

/**
 * The playground resolves `react-social-github` to the library source
 * rather than to `dist/`, so editing a component hot-reloads here with
 * no build step in between.
 */
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      'react-social-github': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
  },
})
