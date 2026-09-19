/** Joins the truthy class names, in order. */
export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}

/** Reads a bare number as pixels, and passes any CSS length through. */
export function toCssLength(value: number | string | undefined): string | undefined {
  if (value === undefined || value === '') {
    return undefined
  }

  return typeof value === 'number' ? `${value}px` : value
}
