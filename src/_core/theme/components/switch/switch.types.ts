import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Switch Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type SwitchColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type SwitchSize = "small" | "medium" | "large";

export interface SwitchProps
  extends Omit<BoxProps, "color" | "defaultChecked" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  color?: SwitchColor;
  size?: SwitchSize;
  label?: React.ReactNode;
  slotProps?: {
    root?: BoxProps;
    thumb?: BoxProps;
    label?: BoxProps;
  };
}
