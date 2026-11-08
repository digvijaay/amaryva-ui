/**
 * Standard cross-platform system font fallback chain
 */
export const SYSTEM_FONT_FALLBACK =
  'apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';

/**
 * Formats a font name into a complete font-family declaration including resilient system fallbacks.
 *
 * @param fontName - Primary font family name (e.g. 'Google Sans Flex')
 * @returns Fully formatted font-family string with fallbacks
 *
 * @example
 * setFont('Google Sans Flex')
 * // '"Google Sans Flex", apple-system, BlinkMacSystemFont, "Segoe UI", ...'
 */
export function setFont(fontName?: string): string {
  if (!fontName) {
    return SYSTEM_FONT_FALLBACK;
  }

  const trimmed = fontName.trim();

  if (trimmed.includes(",")) {
    return trimmed;
  }

  return `"${trimmed}", ${SYSTEM_FONT_FALLBACK}`;
}
