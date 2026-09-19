import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { clearGithubCache } from '../lib/github-api'

beforeEach(() => {
  clearGithubCache()
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})
