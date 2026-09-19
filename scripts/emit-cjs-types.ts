/**
 * Emits `dist/index.d.cts`.
 *
 * `tsc` produces a single ESM-flavoured `index.d.ts`. Node resolves the
 * `require` condition against `.d.cts`, so without this file a CommonJS
 * consumer resolves the package to `any`. The re-export keeps one source
 * of truth: only the module wrapper differs.
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const target = resolve(import.meta.dir, '../dist/index.d.cts')

writeFileSync(target, "export * from './index.js'\n")

console.log(`emitted ${target}`)
