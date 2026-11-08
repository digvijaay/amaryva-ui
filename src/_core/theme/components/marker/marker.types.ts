import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// Marker Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type MarkerVariant = "text" | "dot" | "pin";

export type MarkerColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "inherit";

export interface MarkerProps extends Omit<BoxProps, "color"> {
  variant?: MarkerVariant;
  color?: MarkerColor;
  pulse?: boolean;
}
