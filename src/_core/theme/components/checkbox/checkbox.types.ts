import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Checkbox Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type CheckboxColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type CheckboxSize = "small" | "medium" | "large";

export interface CheckboxProps
  extends Omit<BoxProps, "color" | "defaultChecked" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  color?: CheckboxColor;
  size?: CheckboxSize;
  label?: React.ReactNode;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    indicator?: Omit<BoxProps, "ref">;
    label?: Omit<BoxProps, "ref">;
  };
}
