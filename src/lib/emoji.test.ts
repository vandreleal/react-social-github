import { describe, expect, it } from 'vitest'
import { replaceEmoji } from './emoji'

describe('replaceEmoji', () => {
  it('replaces known shortcodes with unicode', () => {
    expect(replaceEmoji(':rocket: ship it')).toBe('🚀 ship it')
  })

  it('leaves unknown shortcodes alone', () => {
    expect(replaceEmoji(':not_a_real_emoji:')).toBe(':not_a_real_emoji:')
  })

  it('returns an empty string for nullish input', () => {
    expect(replaceEmoji(undefined)).toBe('')
    expect(replaceEmoji(null)).toBe('')
  })
})
