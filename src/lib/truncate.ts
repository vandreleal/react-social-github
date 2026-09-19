/**
 * Shortens `value` to `maxLength` characters, `ending` included.
 *
 * Same defaults as v2 (120 characters, `...`) so repository
 * descriptions keep breaking at the same place.
 */
export function truncate(
  value: string | null | undefined,
  maxLength = 120,
  ending = '...',
): string {
  if (!value) {
    return ''
  }

  if (value.length <= maxLength) {
    return value
  }

  return value.slice(0, Math.max(0, maxLength - ending.length)) + ending
}
