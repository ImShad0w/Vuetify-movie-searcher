/**
 * utils/poster.ts
 *
 * Single source of truth for poster handling so every card and the detail
 * dialog render an identical fallback image (CRAP: Repetition).
 */
import fallbackPoster from '@/assets/poster-placeholder.svg'

export const FALLBACK_POSTER = fallbackPoster

/**
 * OMDb returns the literal string "N/A" when a poster is missing, so fall
 * back to the shared placeholder instead of rendering a broken image.
 */
export function posterUrl (poster?: string | null): string {
  return poster && poster !== 'N/A' ? poster : FALLBACK_POSTER
}
