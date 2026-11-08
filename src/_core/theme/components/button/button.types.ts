import type { BoxProps } from "@mui/system";
import type { HTMLMotionProps } from "motion/react";
import type * as React from "react";

// ----------------------------------------------------------------------
// Button Types
// ----------------------------------------------------------------------

export type ButtonVariant =
  | "contained"
  | "outlined"
  | "soft"
  | "text"
  | "glass";

export type ButtonColor =
  | "inherit"
  | "transparent"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonLoadingPosition = "start" | "end" | "center";

export interface ButtonSlots {
  root?: React.ElementType;
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
  loadingIndicator?: React.ElementType;
}

export interface ButtonSlotProps {
  root?: BoxProps;
  startIcon?: BoxProps;
  endIcon?: BoxProps;
  loadingIndicator?: BoxProps;
}

export interface ButtonProps extends Omit<BoxProps, "color" | "size"> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  loadingIndicator?: React.ReactNode;
  loadingPosition?: ButtonLoadingPosition;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  animated?: boolean;
  disableHoverY?: boolean;
  disableHoverEffect?: boolean;
  blur?: boolean | number | string;
  glass?: boolean;
  focusableWhenDisabled?: boolean;
  motionProps?: HTMLMotionProps<"button">;
  slots?: ButtonSlots;
  slotProps?: ButtonSlotProps;
  type?: "button" | "submit" | "reset";
}
