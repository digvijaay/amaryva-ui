import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// Toggle Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type ToggleVariant =
  | "contained"
  | "outlined"
  | "soft"
  | "glass"
  | "text";

export type ToggleColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type ToggleSize = "small" | "medium" | "large";

export interface ToggleProps
  extends Omit<BoxProps, "color" | "defaultValue" | "onChange"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  value?: string;
  variant?: ToggleVariant;
  color?: ToggleColor;
  size?: ToggleSize;
}
