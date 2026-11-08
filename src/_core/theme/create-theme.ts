import { customShadows, palette, shadows, typography } from "./core";
import { themeConfig } from "./theme-config";
import type { Theme, ThemeColorScheme, ThemeOptions } from "./types";
import { breakpoints } from "./types/Breakpoint";

// ----------------------------------------------------------------------

/**
 * Creates a fully configured Theme instance matching the specified or default color scheme
 */
export function createTheme(
  colorScheme: ThemeColorScheme = themeConfig.defaultColorScheme,
  options?: Partial<ThemeOptions>,
): Theme {
  const activePalette =
    options?.colorSchemes?.[colorScheme]?.palette ?? palette[colorScheme];
  const activeShadows =
    options?.colorSchemes?.[colorScheme]?.shadows ?? shadows[colorScheme];
  const activeCustomShadows =
    options?.colorSchemes?.[colorScheme]?.customShadows ??
    customShadows[colorScheme];

  return {
    classesPrefix: themeConfig.classesPrefix,
    defaultColorScheme: themeConfig.defaultColorScheme,
    cssVariables: themeConfig.cssVariables,
    fontFamily: themeConfig.fontFamily,
    palette: activePalette,
    shadows: activeShadows,
    customShadows: activeCustomShadows,
    typography: options?.typography ?? typography,
    breakpoints: options?.breakpoints ?? breakpoints,
    colorSchemes: {
      light: {
        palette: options?.colorSchemes?.light?.palette ?? palette.light,
        shadows: options?.colorSchemes?.light?.shadows ?? shadows.light,
        customShadows:
          options?.colorSchemes?.light?.customShadows ?? customShadows.light,
      },
      dark: {
        palette: options?.colorSchemes?.dark?.palette ?? palette.dark,
        shadows: options?.colorSchemes?.dark?.shadows ?? shadows.dark,
        customShadows:
          options?.colorSchemes?.dark?.customShadows ?? customShadows.dark,
      },
    },
    ...options,
  };
}

/**
 * Global static theme instances for light and dark schemes
 */
export const lightTheme: Theme = createTheme("light");
export const darkTheme: Theme = createTheme("dark");

/**
 * Default active theme instance
 */
export const defaultTheme: Theme = lightTheme;

// ----------------------------------------------------------------------

/**
 * Generates key-value CSS custom properties for Tailwind CSS integration
 */
export function generateThemeCssVariables(
  colorScheme: ThemeColorScheme = "light",
  theme?: Theme,
): Record<string, string> {
  const activeTheme =
    theme ?? (colorScheme === "dark" ? darkTheme : lightTheme);
  const pal =
    activeTheme.colorSchemes?.[colorScheme]?.palette ?? activeTheme.palette;
  const cShadows =
    activeTheme.colorSchemes?.[colorScheme]?.customShadows ??
    activeTheme.customShadows;
  const prefix = activeTheme.cssVariables?.cssVarPrefix || "theme";

  const vars: Record<string, string> = {};

  const toVarName = (group: string, name: string) =>
    `--${prefix}-${group}-${name.replace(/([A-Z])/g, "-$1").toLowerCase()}`;

  // Font families
  if (activeTheme.fontFamily?.primary) {
    vars[`--${prefix}-font-primary`] = activeTheme.fontFamily.primary;
  }
  if (activeTheme.fontFamily?.secondary) {
    vars[`--${prefix}-font-secondary`] = activeTheme.fontFamily.secondary;
  }

  // Brand Palette (primary, secondary, info, success, warning, error)
  const brandColors = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ] as const;

  for (const brand of brandColors) {
    const col = pal[brand];
    if (col) {
      for (const [key, val] of Object.entries(col)) {
        if (typeof val === "string") {
          vars[toVarName(`color-${brand}`, key)] = val;
        }
      }
    }
  }

  // Common & Grey Palette
  for (const [key, val] of Object.entries(pal.common ?? {})) {
    if (typeof val === "string") vars[toVarName("color-common", key)] = val;
  }
  for (const [key, val] of Object.entries(pal.grey ?? {})) {
    if (typeof val === "string") vars[toVarName("color-grey", key)] = val;
  }

  // Contextual Tokens (Text, Background, Action, Divider)
  for (const [key, val] of Object.entries(pal.text ?? {})) {
    if (typeof val === "string") vars[toVarName("color-text", key)] = val;
  }
  for (const [key, val] of Object.entries(pal.background ?? {})) {
    if (typeof val === "string") vars[toVarName("color-background", key)] = val;
  }
  for (const [key, val] of Object.entries(pal.action ?? {})) {
    if (typeof val === "string") vars[toVarName("color-action", key)] = val;
  }
  if (pal.divider) {
    vars[`--${prefix}-color-divider`] = pal.divider;
  }

  // Custom Shadows
  for (const [key, val] of Object.entries(cShadows ?? {})) {
    if (typeof val === "string") vars[toVarName("shadow", key)] = val;
  }

  return vars;
}

/**
 * Converts CSS custom property definitions into a CSS string block
 */
function recordToCssBlock(
  selector: string,
  record: Record<string, string>,
): string {
  const declarations = Object.entries(record)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join("\n");
  return `${selector} {\n${declarations}\n}`;
}

/**
 * Generates complete CSS styles for :root (light) and [data-color-scheme="dark"] / .dark
 */
export function generateThemeCssString(theme?: Theme): string {
  const lightVars = generateThemeCssVariables("light", theme);
  const darkVars = generateThemeCssVariables("dark", theme);

  return [
    recordToCssBlock(':root, [data-color-scheme="light"]', lightVars),
    recordToCssBlock('[data-color-scheme="dark"], .dark', darkVars),
  ].join("\n\n");
}
