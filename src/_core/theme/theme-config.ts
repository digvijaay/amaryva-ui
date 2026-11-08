import { Google_Sans_Code, Google_Sans_Flex } from "next/font/google";

import type {
  CommonColors,
  PaletteColorNoChannels,
  ThemeColorScheme,
  ThemeCssVariables,
} from "./types";

// ----------------------------------------------------------------------

export const primaryFont = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary",
  fallback: [
    "apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Noto Sans",
    "Helvetica",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
  ],
});

export const secondaryFont = Google_Sans_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-secondary",
  fallback: [
    "apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Noto Sans",
    "Helvetica",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
  ],
});

// ----------------------------------------------------------------------

export type ThemeConfig = {
  classesPrefix: string;
  defaultColorScheme: ThemeColorScheme;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<"primary" | "secondary", string>;
  palette: Record<
    "primary" | "secondary" | "info" | "success" | "warning" | "error",
    PaletteColorNoChannels
  > & {
    common: CommonColors;
    grey: Record<
      | "50"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900",
      string
    >;
  };
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  classesPrefix: "minimal",
  defaultColorScheme: "light",

  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: primaryFont.style.fontFamily,
    secondary: secondaryFont.style.fontFamily,
  },

  /** **************************************
   * Palette
   *************************************** */
  palette: {
    // primary: {
    //   lighter: '#DCEAF1',
    //   light: '#8EAFBF',
    //   main: '#063757',
    //   dark: '#042B45',
    //   darker: '#021B2D',
    //   contrastText: '#FFFFFF',
    // },
    // secondary: {
    //   lighter: '#FFF0E5',
    //   light: '#FFB77A',
    //   main: '#E56800',
    //   dark: '#B94D00',
    //   darker: '#7A3100',
    //   contrastText: '#FFFFFF',
    // },
    primary: {
      lighter: "#D0ECFE",
      light: "#73BAFB",
      main: "#1877F2",
      dark: "#0C44AE",
      darker: "#042174",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#EFD6FF",
      light: "#C684FF",
      main: "#8E33FF",
      dark: "#5119B7",
      darker: "#27097A",
      contrastText: "#FFFFFF",
    },
    info: {
      lighter: "#CAFDF5",
      light: "#61F3F3",
      main: "#00B8D9",
      dark: "#006C9C",
      darker: "#003768",
      contrastText: "#FFFFFF",
    },
    success: {
      lighter: "#D3FCD2",
      light: "#77ED8B",
      main: "#22C55E",
      dark: "#118D57",
      darker: "#065E49",
      contrastText: "#FFFFFF",
    },
    warning: {
      lighter: "#FFF5CC",
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#B76E00",
      darker: "#7A4100",
      contrastText: "#1C252E",
    },
    error: {
      lighter: "#FFE9D5",
      light: "#FFAC82",
      main: "#FF5630",
      dark: "#B71D18",
      darker: "#7A0916",
      contrastText: "#FFFFFF",
    },
    grey: {
      "50": "#FCFDFD",
      "100": "#F9FAFB",
      "200": "#F4F6F8",
      "300": "#DFE3E8",
      "400": "#C4CDD5",
      "500": "#919EAB",
      "600": "#637381",
      "700": "#454F5B",
      "800": "#1C252E",
      "900": "#141A21",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
  },

  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: "theme",
    colorSchemeSelector: "data-color-scheme",
  },
};
