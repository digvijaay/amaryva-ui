/**
 * Converts a hex string into [r, g, b] components
 */
function hexToRgb(hex: string): [number, number, number] | null {
  const cleanHex = hex.replace("#", "").trim();

  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return [r, g, b];
  }

  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    return [r, g, b];
  }

  return null;
}

/**
 * Creates an rgba color with specified opacity from a hex code, channel string, or CSS variable.
 *
 * @param color - Hex color ('#1877F2'), RGB channels ('24 119 242' or '24, 119, 242'), or CSS var ('var(--...)')
 * @param opacity - Opacity number between 0 and 1 (default 1)
 * @returns Formatted rgba string
 *
 * @example
 * varAlpha('#1877F2', 0.24) // 'rgba(24, 119, 242, 0.24)'
 * varAlpha('24 119 242', 0.16) // 'rgba(24, 119, 242, 0.16)'
 * varAlpha('var(--palette-primary-mainChannel)', 0.5) // 'rgba(var(--palette-primary-mainChannel) / 0.5)'
 */
export function varAlpha(color?: string, opacity: number = 1): string {
  if (!color) {
    return `rgba(0, 0, 0, ${opacity})`;
  }

  const trimmed = color.trim();

  // Handle CSS Variables e.g. var(--color-channel)
  if (trimmed.startsWith("var(")) {
    return `rgba(${trimmed} / ${opacity})`;
  }

  // Handle Hex Colors e.g. #1877F2 or #fff
  if (trimmed.startsWith("#")) {
    const rgb = hexToRgb(trimmed);
    if (rgb) {
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
    }
  }

  // Handle existing rgb/rgba strings
  if (trimmed.startsWith("rgb")) {
    const matches = trimmed.match(/\d+(\.\d+)?/g);
    if (matches && matches.length >= 3) {
      return `rgba(${matches[0]}, ${matches[1]}, ${matches[2]}, ${opacity})`;
    }
  }

  // Handle channel string format: "24 119 242" or "24, 119, 242"
  const channels = trimmed.replace(/,/g, " ").trim().split(/\s+/);
  if (channels.length === 3) {
    const r = Number(channels[0]);
    const g = Number(channels[1]);
    const b = Number(channels[2]);
    if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }

  // Fallback for modern CSS slash notation
  return `rgba(${trimmed} / ${opacity})`;
}
