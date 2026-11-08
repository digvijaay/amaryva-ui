import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// CheckboxGroup Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface CheckboxGroupProps
  extends Omit<BoxProps, "defaultValue" | "onChange"> {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  label?: React.ReactNode;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    label?: Omit<BoxProps, "ref">;
    group?: Omit<BoxProps, "ref">;
  };
}
