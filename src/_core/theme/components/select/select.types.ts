import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Select Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type SelectColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type SelectSize = "small" | "medium" | "large";

export interface SelectOption {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
}

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export interface SelectTriggerProps extends BoxProps {
  color?: SelectColor;
  size?: SelectSize;
}

// ----------------------------------------------------------------------
// High-Level Composed Select
// ----------------------------------------------------------------------

export interface SelectProps
  extends Omit<BoxProps, "color" | "defaultValue" | "onChange"> {
  value?: unknown;
  defaultValue?: unknown;
  onValueChange?: (value: unknown) => void;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  color?: SelectColor;
  size?: SelectSize;
  options?: SelectOption[];
  label?: React.ReactNode;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    trigger?: Omit<SelectTriggerProps, "ref">;
    popup?: Omit<BoxProps, "ref">;
    label?: Omit<BoxProps, "ref">;
  };
}
