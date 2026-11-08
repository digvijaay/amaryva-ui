import { varAlpha } from "../libs";
import type { CustomShadows, ThemeColorScheme } from "../types";
import {
  common,
  error,
  grey,
  info,
  primary,
  secondary,
  success,
  warning,
} from "./palette";

// ----------------------------------------------------------------------

export type { CustomShadows };

/**
 * Creates dynamic colored shadow glow for interactive brand elements
 */
export function createShadowColor(
  colorChannel: string,
  opacity = 0.24,
): string {
  return `0 8px 16px 0 ${varAlpha(colorChannel, opacity)}`;
}

/**
 * Generates custom component and elevation shadows
 */
function createCustomShadows(
  colorChannel: string,
  isDark = false,
): CustomShadows {
  const zAlpha = isDark ? 0.24 : 0.16;
  const brandAlpha = isDark ? 0.36 : 0.24;

  return {
    z1: `0 1px 2px 0 ${varAlpha(colorChannel, zAlpha)}`,
    z4: `0 4px 8px 0 ${varAlpha(colorChannel, zAlpha)}`,
    z8: `0 8px 16px 0 ${varAlpha(colorChannel, zAlpha)}`,
    z12: `0 12px 24px -4px ${varAlpha(colorChannel, zAlpha)}`,
    z16: `0 16px 32px -4px ${varAlpha(colorChannel, zAlpha)}`,
    z20: `0 20px 40px -4px ${varAlpha(colorChannel, zAlpha)}`,
    z24: `0 24px 48px 0 ${varAlpha(colorChannel, zAlpha)}`,
    dialog: `-40px 40px 80px -8px ${varAlpha(common.blackChannel, isDark ? 0.48 : 0.24)}`,
    card: isDark
      ? `0 0 2px 0 ${varAlpha(colorChannel, 0.4)}, 0 12px 24px -4px ${varAlpha(colorChannel, 0.32)}`
      : `0 0 2px 0 ${varAlpha(colorChannel, 0.2)}, 0 12px 24px -4px ${varAlpha(colorChannel, 0.12)}`,
    dropdown: isDark
      ? `0 0 2px 0 ${varAlpha(colorChannel, 0.4)}, -20px 20px 40px -4px ${varAlpha(colorChannel, 0.4)}`
      : `0 0 2px 0 ${varAlpha(colorChannel, 0.24)}, -20px 20px 40px -4px ${varAlpha(colorChannel, 0.24)}`,
    primary: createShadowColor(primary.mainChannel, brandAlpha),
    secondary: createShadowColor(secondary.mainChannel, brandAlpha),
    info: createShadowColor(info.mainChannel, brandAlpha),
    success: createShadowColor(success.mainChannel, brandAlpha),
    warning: createShadowColor(warning.mainChannel, brandAlpha),
    error: createShadowColor(error.mainChannel, brandAlpha),
  };
}

/**
 * Custom component and elevation shadows for Light and Dark modes
 */
export const customShadows: Record<ThemeColorScheme, CustomShadows> = {
  light: createCustomShadows(grey["500Channel"], false),
  dark: createCustomShadows(common.blackChannel, true),
};
