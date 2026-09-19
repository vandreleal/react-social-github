import { EMOJI } from './emoji-map.generated'

/** Matches `:shortcode:` — letters, digits, `_`, `+` and `-`. */
const SHORTCODE = /:([a-z0-9_+-]+):/gi

/**
 * Replaces `:shortcode:` sequences with the matching unicode emoji.
 *
 * Repository descriptions on GitHub are stored with shortcodes, so
 * ":rocket: Fast" has to become "🚀 Fast" before it is rendered. v2 used
 * `emoji-js`, which is unmaintained and shipped an image sprite sheet.
 *
 * The table is generated from `node-emoji` at development time — see
 * `scripts/generate-emoji-map.ts` — so the runtime carries the 1,570
 * shortcode pairs without the search keywords that make `emojilib`
 * eleven times the size of this entire library.
 *
 * Unknown shortcodes are left as they are, which is what v2 did too.
 */
export function replaceEmoji(value: string | null | undefined): string {
  if (!value) {
    return ''
  }

  return value.replace(
    SHORTCODE,
    (match, name: string) => EMOJI[name.toLowerCase()] ?? match,
  )
}
