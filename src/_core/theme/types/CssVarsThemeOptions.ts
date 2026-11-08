/**
 * Options for configuring CSS custom properties (variables)
 */
export interface ThemeCssVariables {
  cssVarPrefix?: string;
  colorSchemeSelector?: "class" | "data-color-scheme" | "media" | string;
  disableCssColorScheme?: boolean;
  shouldSkipGeneratingVar?: (keys: string[], value: string | number) => boolean;
}

/**
 * High level CSS variables theme options
 */
export interface CssVarsThemeOptions {
  cssVarPrefix?: string;
  colorSchemeSelector?: string;
  defaultColorScheme?: "light" | "dark";
}
