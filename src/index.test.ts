import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// jsdom hands `import.meta.url` an http: URL, so resolve from the project
// root instead — vitest always runs there.
const read = (relative: string) => readFileSync(resolve(process.cwd(), relative), 'utf8')

const pkg = JSON.parse(read('package.json')) as { sideEffects: string[] }

describe('package side effects', () => {
  /*
   * `src/index.ts` imports the token sheet for its side effect alone.
   * With only `*.css` listed, a bundler treats the barrel as pure, prunes
   * it when a consumer imports a single named export, and drops the
   * token import with it — leaving every var(--rsg-*) unresolved and the
   * cards unstyled. Caught in the deployed playground; keep the entry
   * listed so it cannot happen again.
   */
  it('marks the barrel as side-effectful so the token sheet survives', () => {
    expect(pkg.sideEffects).toContain('./src/index.ts')
  })

  it('marks stylesheets as side-effectful', () => {
    expect(pkg.sideEffects).toContain('*.css')
  })

  it('still imports the token sheet from the barrel', () => {
    const source = read('src/index.ts')

    expect(source).toContain("import './styles/tokens.css'")
  })
})
