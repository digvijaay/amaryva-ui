import type { BoxProps } from "@mui/system";
import type * as React from "react";
import type { InputColor } from "../input";

// ----------------------------------------------------------------------
// NumberField Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// Slots & Interfaces
// ----------------------------------------------------------------------

export type NumberFieldSize = "small" | "medium" | "large";

export interface NumberFieldSlots {
  root?: React.ElementType;
  group?: React.ElementType;
  input?: React.ElementType;
  increment?: React.ElementType;
  decrement?: React.ElementType;
}

export interface NumberFieldSlotProps {
  root?: Omit<BoxProps, "ref">;
  group?: Omit<BoxProps, "ref">;
  input?: Omit<BoxProps, "ref">;
  increment?: Omit<BoxProps, "ref">;
  decrement?: Omit<BoxProps, "ref">;
}

export interface NumberFieldProps
  extends Omit<
    BoxProps,
    "size" | "color" | "defaultValue" | "value" | "onChange"
  > {
  value?: number | null;
  defaultValue?: number;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  format?: Intl.NumberFormatOptions;
  size?: NumberFieldSize;
  color?: InputColor;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  slots?: NumberFieldSlots;
  slotProps?: NumberFieldSlotProps;
}
