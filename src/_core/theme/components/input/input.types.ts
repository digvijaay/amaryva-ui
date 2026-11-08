import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Input Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type InputVariant = "outlined" | "filled" | "soft";

export type InputSize = "small" | "medium" | "large";

export type InputColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error";

export interface InputSlots {
  root?: React.ElementType;
  input?: React.ElementType;
  startAdornment?: React.ElementType;
  endAdornment?: React.ElementType;
}

export interface InputSlotProps {
  root?: Omit<BoxProps, "ref">;
  input?: Omit<BoxProps, "ref">;
  startAdornment?: Omit<BoxProps, "ref">;
  endAdornment?: Omit<BoxProps, "ref">;
}

export interface InputProps
  extends Omit<
    BoxProps,
    "size" | "color" | "defaultValue" | "value" | "onChange"
  > {
  variant?: InputVariant;
  color?: InputColor;
  size?: InputSize;
  error?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  onValueChange?: (value: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  slots?: InputSlots;
  slotProps?: InputSlotProps;
}
