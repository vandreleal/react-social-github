import { describe, expect, it } from 'vitest'
import { cx, toCssLength } from './class-names'

describe('cx', () => {
  it('joins truthy values in order', () => {
    expect(cx('a', 'b')).toBe('a b')
  })

  it('drops falsy values', () => {
    expect(cx('a', false, null, undefined, '', 'b')).toBe('a b')
  })
})

describe('toCssLength', () => {
  it('reads a bare number as pixels', () => {
    expect(toCssLength(48)).toBe('48px')
  })

  it('passes a CSS length through', () => {
    expect(toCssLength('2rem')).toBe('2rem')
  })

  it('returns undefined for no value', () => {
    expect(toCssLength(undefined)).toBeUndefined()
    expect(toCssLength('')).toBeUndefined()
  })
})
