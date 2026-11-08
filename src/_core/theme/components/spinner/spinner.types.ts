import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// Spinner Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type SpinnerSize = "small" | "medium" | "large" | number;

export type SpinnerColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type SpinnerVariant = "circular" | "dots";

export interface SpinnerProps extends Omit<BoxProps, "color"> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  thickness?: number;
  variant?: SpinnerVariant;
  label?: string;
}
