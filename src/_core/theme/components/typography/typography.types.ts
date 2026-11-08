import type { BoxProps } from "@mui/system";
import type { HTMLMotionProps } from "motion/react";
import type * as React from "react";

// ----------------------------------------------------------------------
// Typography Types
// ----------------------------------------------------------------------

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

export type TypographyColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "textPrimary"
  | "textSecondary"
  | "textDisabled"
  | "error"
  | "warning"
  | "info"
  | "success"
  | (string & {});

export type TypographyAlign =
  | "inherit"
  | "left"
  | "center"
  | "right"
  | "justify";

export interface TypographySlots {
  root?: React.ElementType;
}

export interface TypographySlotProps {
  root?: BoxProps;
}

export interface TypographyProps extends Omit<BoxProps, "color"> {
  variant?: TypographyVariant;
  component?: React.ElementType;
  color?: TypographyColor;
  align?: TypographyAlign;
  noWrap?: boolean;
  gutterBottom?: boolean;
  animated?: boolean;
  motionProps?: HTMLMotionProps<"div">;
  slots?: TypographySlots;
  slotProps?: TypographySlotProps;
}
