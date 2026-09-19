import { describe, expect, it } from 'vitest'
import { truncate } from './truncate'

describe('truncate', () => {
  it('returns an empty string for nullish input', () => {
    expect(truncate(undefined)).toBe('')
    expect(truncate(null)).toBe('')
    expect(truncate('')).toBe('')
  })

  it('leaves short values untouched', () => {
    expect(truncate('short')).toBe('short')
  })

  it('leaves a value of exactly maxLength untouched', () => {
    expect(truncate('a'.repeat(120))).toHaveLength(120)
  })

  it('clips to maxLength including the ending', () => {
    const result = truncate('a'.repeat(200))

    expect(result).toHaveLength(120)
    expect(result.endsWith('...')).toBe(true)
  })

  it('accepts a custom length and ending', () => {
    expect(truncate('abcdefghij', 5, '…')).toBe('abcd…')
  })
})
