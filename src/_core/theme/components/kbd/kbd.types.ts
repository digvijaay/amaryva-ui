import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// Kbd Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type KbdSize = "small" | "medium" | "large";

export type KbdVariant = "outlined" | "filled" | "subtle";

export interface KbdProps extends BoxProps {
  size?: KbdSize;
  variant?: KbdVariant;
}
