import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const resolvePath = (relative: string) =>
  fileURLToPath(new URL(relative, import.meta.url))

/**
 * Library build.
 *
 * Emits:
 *   dist/index.js   — ESM bundle
 *   dist/index.cjs  — CJS bundle (for `require` consumers)
 *   dist/index.css  — every component stylesheet, concatenated
 *
 * Type declarations are emitted separately by `tsc -p tsconfig.build.json`
 * so the published types stay source-accurate rather than bundler-inferred.
 *
 * `react`, `react-dom` and every runtime dependency are externalised: this
 * package must never ship a second copy of React or of Base UI.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    /*
     * Baseline support for `oklch()` and `light-dark()`. Without it Vite
     * downlevels the token sheet, flattening the palette a consumer
     * would otherwise extend in the same colour space, and expanding
     * `light-dark()` back into the duplicated ramps it replaced.
     */
    cssTarget: ['chrome123', 'edge123', 'firefox120', 'safari17.5'],
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: resolvePath('./src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@base-ui\/react($|\/)/,
        /^@primer\/octicons-react($|\/)/,
      ],
      output: {
        assetFileNames: 'index.css',
      },
    },
  },
})
