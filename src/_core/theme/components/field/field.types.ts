import type { BoxProps } from "@mui/system";
import type * as React from "react";
import type { InputColor } from "../input";
import type { InputLabelProps } from "../input-label";

// ----------------------------------------------------------------------
// Field Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface FieldSlots {
  root?: React.ElementType;
  label?: React.ElementType;
  description?: React.ElementType;
  error?: React.ElementType;
}

export interface FieldSlotProps {
  root?: Omit<BoxProps, "ref">;
  label?: Omit<InputLabelProps, "ref">;
  description?: Omit<BoxProps, "ref">;
  error?: Omit<BoxProps, "ref">;
}

export interface FieldProps extends Omit<BoxProps, "name" | "color"> {
  name?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  color?: InputColor;
  error?: boolean | React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  slots?: FieldSlots;
  slotProps?: FieldSlotProps;
}
