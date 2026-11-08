import type { CommonColors } from "./CommonColors";

/**
 * Key identifiers for primary design system brand colors
 */
export type PaletteColorKey =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

/**
 * Palette color token representation without channels
 */
export interface PaletteColor {
  lighter?: string;
  light: string;
  main: string;
  dark: string;
  darker?: string;
  contrastText: string;
}

/**
 * Palette color RGB channels representation for dynamic alpha blending
 */
export interface PaletteColorChannel {
  lighterChannel?: string;
  lightChannel: string;
  mainChannel: string;
  darkChannel: string;
  darkerChannel?: string;
  contrastTextChannel: string;
}

/**
 * Complete palette color including RGB channel values
 */
export type PaletteColorWithChannels = PaletteColor & PaletteColorChannel;

/**
 * Extended text tokens with RGB channels
 */
export interface TypeText {
  primary: string;
  secondary: string;
  disabled: string;
  primaryChannel?: string;
  secondaryChannel?: string;
  disabledChannel?: string;
}

/**
 * Background layer tokens with RGB channels
 */
export interface TypeBackground {
  default: string;
  paper: string;
  neutral: string;
  defaultChannel?: string;
  paperChannel?: string;
  neutralChannel?: string;
}

/**
 * Action interactive state tokens
 */
export interface TypeAction {
  active: string;
  hover: string;
  selected: string;
  disabled: string;
  disabledBackground: string;
  focus: string;
  hoverOpacity: number;
  disabledOpacity: number;
}

/**
 * Standard 10-step grey scale
 */
export type GreyScale = Record<
  "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900",
  string
>;

/**
 * Grey scale channels for alpha calculations
 */
export type GreyScaleChannels = Record<
  | "50Channel"
  | "100Channel"
  | "200Channel"
  | "300Channel"
  | "400Channel"
  | "500Channel"
  | "600Channel"
  | "700Channel"
  | "800Channel"
  | "900Channel",
  string
>;

/**
 * Complete grey palette
 */
export type PaletteGrey = GreyScale & GreyScaleChannels;

/**
 * Common colors with channels
 */
export type PaletteCommon = CommonColors & {
  whiteChannel: string;
  blackChannel: string;
};

/**
 * Complete color palette structure for a color scheme
 */
export interface PaletteOptions {
  primary: PaletteColorWithChannels;
  secondary: PaletteColorWithChannels;
  info: PaletteColorWithChannels;
  success: PaletteColorWithChannels;
  warning: PaletteColorWithChannels;
  error: PaletteColorWithChannels;
  common: PaletteCommon;
  grey: PaletteGrey;
  text: TypeText;
  background: TypeBackground;
  action: TypeAction;
  divider: string;
  dividerChannel?: string;
}

/**
 * Color system options container
 */
export interface ColorSystemOptions {
  palette?: PaletteOptions;
}
