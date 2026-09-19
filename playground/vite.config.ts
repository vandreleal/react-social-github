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
  build: {
    // Match the library's target so the demo ships the same CSS the
    // package does, rather than a downlevelled `light-dark()` polyfill.
    cssTarget: ['chrome123', 'edge123', 'firefox120', 'safari17.5'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      'react-social-github': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
  },
})
