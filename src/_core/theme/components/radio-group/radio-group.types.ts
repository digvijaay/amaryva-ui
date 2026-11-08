import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// RadioGroup Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type RadioColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type RadioSize = "small" | "medium" | "large";

export interface RadioProps extends Omit<BoxProps, "color" | "onChange"> {
  value: unknown;
  disabled?: boolean;
  color?: RadioColor;
  size?: RadioSize;
  label?: React.ReactNode;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    indicator?: Omit<BoxProps, "ref">;
    label?: Omit<BoxProps, "ref">;
  };
}

// ----------------------------------------------------------------------
// Radio Group
// ----------------------------------------------------------------------

export interface RadioGroupProps
  extends Omit<BoxProps, "defaultValue" | "onChange"> {
  value?: unknown;
  defaultValue?: unknown;
  onValueChange?: (value: unknown) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  label?: React.ReactNode;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    label?: Omit<BoxProps, "ref">;
    group?: Omit<BoxProps, "ref">;
  };
}
