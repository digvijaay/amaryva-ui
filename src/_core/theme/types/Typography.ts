import type { Breakpoint } from "./Breakpoint";

export type CSSFontWeight =
  | "normal"
  | "bold"
  | "bolder"
  | "lighter"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

export type CSSTextTransform =
  | "uppercase"
  | "lowercase"
  | "capitalize"
  | "none"
  | "unset";

export type CSSFontStyle = "normal" | "italic" | "oblique" | "unset";

export type CSSTextAlign =
  | "left"
  | "right"
  | "center"
  | "justify"
  | "start"
  | "end";

export type BaseCSSProperties = Partial<
  Omit<
    {
      [K in keyof CSSStyleDeclaration as K extends string
        ? CSSStyleDeclaration[K] extends (...args: unknown[]) => unknown
          ? never
          : K
        : never]: string | number | undefined;
    },
    "length" | "parentRule" | "cssText" | "cssFloat"
  >
> & {
  fontFamily?: string;
  fontWeight?: CSSFontWeight;
  fontSize?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  textTransform?: CSSTextTransform;
  fontStyle?: CSSFontStyle;
  textAlign?: CSSTextAlign;
  color?: string;
};

export type CSSPseudos = {
  "&:hover"?: CSSObject;
  "&:focus"?: CSSObject;
  "&:focus-visible"?: CSSObject;
  "&:active"?: CSSObject;
  "&:disabled"?: CSSObject;
  "&::before"?: CSSObject;
  "&::after"?: CSSObject;
  "&::placeholder"?: CSSObject;
};

/**
 * Custom CSSObject type for styling definitions without external CSS-in-JS dependencies
 */
export interface CSSObject extends BaseCSSProperties, CSSPseudos {
  [cssVariable: `--${string}`]: string | number | undefined;
  [mediaQuery: `@media ${string}`]: CSSObject | undefined;
  [selector: string]: CSSObject | string | number | undefined;
}

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline"
  | "button";

export interface FontStyleExtend {
  fontFamily: string;
  fontSecondaryFamily: string;
  fontWeightLight: CSSFontWeight;
  fontWeightRegular: CSSFontWeight;
  fontWeightMedium: CSSFontWeight;
  fontWeightSemiBold: CSSFontWeight;
  fontWeightBold: CSSFontWeight;
}

export interface TypographyVariantsOptions extends FontStyleExtend {
  h1: CSSObject;
  h2: CSSObject;
  h3: CSSObject;
  h4: CSSObject;
  h5: CSSObject;
  h6: CSSObject;
  subtitle1: CSSObject;
  subtitle2: CSSObject;
  body1: CSSObject;
  body2: CSSObject;
  caption: CSSObject;
  overline: CSSObject;
  button: CSSObject;
  [variant: string]: CSSObject | string | CSSFontWeight | undefined;
}

export type ResponsiveFontSizesInput = Partial<Record<Breakpoint, number>>;
export type ResponsiveFontSizesResult = Record<string, { fontSize: string }>;
