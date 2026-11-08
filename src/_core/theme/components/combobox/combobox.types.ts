import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Combobox Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type ComboboxColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type ComboboxSize = "small" | "medium" | "large";

export interface ComboboxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export interface ComboboxInputProps extends Omit<BoxProps, "color" | "size"> {
  color?: ComboboxColor;
  size?: ComboboxSize;
  placeholder?: string;
  disabled?: boolean;
}

// ----------------------------------------------------------------------
// High-Level Composed Combobox
// ----------------------------------------------------------------------

export interface ComboboxProps
  extends Omit<BoxProps, "color" | "defaultValue" | "onChange"> {
  value?: unknown;
  defaultValue?: unknown;
  onValueChange?: (value: unknown) => void;
  options?: ComboboxOption[];
  placeholder?: string;
  disabled?: boolean;
  color?: ComboboxColor;
  size?: ComboboxSize;
  label?: React.ReactNode;
  emptyText?: React.ReactNode;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    input?: Omit<ComboboxInputProps, "ref">;
    popup?: Omit<BoxProps, "ref">;
    label?: Omit<BoxProps, "ref">;
  };
}
