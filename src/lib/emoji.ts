import { EMOJI_DATA } from './emoji-map.generated'

/** Matches `:shortcode:` — letters, digits, `_`, `+` and `-`. */
const SHORTCODE = /:([a-z0-9_+-]+):/gi

/**
 * Built on first use, not on module evaluation.
 *
 * Only repository descriptions carry shortcodes, so a page showing
 * profile cards never needs the table at all. Decoding it lazily keeps
 * that page from paying for 1,570 Map insertions it will not read.
 */
let table: Map<string, string> | undefined

function lookup(name: string): string | undefined {
  if (table === undefined) {
    table = new Map()

    const parts = EMOJI_DATA.split(' ')
    for (let index = 0; index + 1 < parts.length; index += 2) {
      const key = parts[index]
      const emoji = parts[index + 1]
      if (key !== undefined && emoji !== undefined) {
        table.set(key, emoji)
      }
    }
  }

  return table.get(name)
}

/**
 * Replaces `:shortcode:` sequences with the matching unicode emoji.
 *
 * Repository descriptions on GitHub are stored with shortcodes, so
 * ":rocket: Fast" has to become "🚀 Fast" before it is rendered. v2 used
 * `emoji-js`, which is unmaintained and shipped an image sprite sheet.
 *
 * Unknown shortcodes are left as they are, which is what v2 did too.
 */
export function replaceEmoji(value: string | null | undefined): string {
  if (!value) {
    return ''
  }

  // Skip the table entirely for the common case: a description with no
  // shortcode in it at all.
  if (!value.includes(':')) {
    return value
  }

  return value.replace(
    SHORTCODE,
    (match, name: string) => lookup(name.toLowerCase()) ?? match,
  )
}
