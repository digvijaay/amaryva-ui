/**
 * Converts a hex or color string to space-separated RGB channel format: "r g b"
 */
export function colorToChannel(color: string): string {
  const trimmed = color.trim();

  if (trimmed.startsWith("#")) {
    const cleanHex = trimmed.replace("#", "").trim();

    if (cleanHex.length === 3) {
      const r = parseInt(cleanHex[0] + cleanHex[0], 16);
      const g = parseInt(cleanHex[1] + cleanHex[1], 16);
      const b = parseInt(cleanHex[2] + cleanHex[2], 16);
      return `${r} ${g} ${b}`;
    }

    if (cleanHex.length === 6) {
      const r = parseInt(cleanHex.slice(0, 2), 16);
      const g = parseInt(cleanHex.slice(2, 4), 16);
      const b = parseInt(cleanHex.slice(4, 6), 16);
      return `${r} ${g} ${b}`;
    }
  }

  // Handle already channel-like strings
  const parts = trimmed.replace(/,/g, " ").trim().split(/\s+/);
  if (parts.length === 3 && parts.every((p) => !Number.isNaN(Number(p)))) {
    return `${parts[0]} ${parts[1]} ${parts[2]}`;
  }

  return trimmed;
}

export type WithChannels<T extends object> = T & {
  [K in keyof T as `${string & K}Channel`]: string;
};

/**
 * Creates palette color channels for dynamic alpha transparency blending.
 *
 * @param paletteGroup - Key-value pair of color tokens (e.g. { main: '#1877F2', light: '#73BAFB' })
 * @returns Object containing original color keys alongside generated `{key}Channel` properties
 *
 * @example
 * createPaletteChannel({ main: '#1877F2' })
 * // returns { main: '#1877F2', mainChannel: '24 119 242' }
 */
export function createPaletteChannel<T extends object>(
  paletteGroup: T,
): WithChannels<T> {
  const result = { ...paletteGroup } as Record<string, unknown>;

  for (const [key, value] of Object.entries(paletteGroup)) {
    if (typeof value === "string") {
      result[`${key}Channel`] = colorToChannel(value);
    }
  }

  return result as WithChannels<T>;
}
