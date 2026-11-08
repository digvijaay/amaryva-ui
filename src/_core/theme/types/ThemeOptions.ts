import type { BreakpointHelpers } from "./Breakpoint";
import type { ColorSystemOptions, PaletteOptions } from "./ColorSystemOptions";
import type { ThemeCssVariables } from "./CssVarsThemeOptions";
import type { Shadows } from "./Shadows";
import type { ThemeColorScheme } from "./SupportedColorScheme";
import type { TypographyVariantsOptions } from "./Typography";

export interface CustomShadows {
  z1?: string;
  z4?: string;
  z8?: string;
  z12?: string;
  z16?: string;
  z20?: string;
  z24?: string;
  primary?: string;
  secondary?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
  card?: string;
  dialog?: string;
  dropdown?: string;
}

export interface ColorSchemeOptionsExtended extends ColorSystemOptions {
  palette?: PaletteOptions;
  shadows?: Shadows;
  customShadows?: CustomShadows;
}

export interface ThemeOptions {
  classesPrefix?: string;
  defaultColorScheme?: ThemeColorScheme;
  colorSchemes?: Partial<Record<ThemeColorScheme, ColorSchemeOptionsExtended>>;
  cssVariables?: ThemeCssVariables;
  palette?: PaletteOptions;
  shadows?: Shadows;
  customShadows?: CustomShadows;
  typography?: TypographyVariantsOptions;
  breakpoints?: BreakpointHelpers;
  fontFamily?: {
    primary: string;
    secondary: string;
  };
}

export interface Theme extends ThemeOptions {
  classesPrefix: string;
  palette: PaletteOptions;
  shadows: Shadows;
  customShadows: CustomShadows;
  typography: TypographyVariantsOptions;
  breakpoints: BreakpointHelpers;
}
