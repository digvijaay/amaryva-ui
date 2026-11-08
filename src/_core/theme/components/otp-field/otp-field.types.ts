import type { BoxProps } from "@mui/system";
import type * as React from "react";
import type { InputColor } from "../input";

// ----------------------------------------------------------------------
// OtpField Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type OTPFieldSize = "small" | "medium" | "large";

export interface OTPFieldSlots {
  root?: React.ElementType;
  input?: React.ElementType;
  separator?: React.ElementType;
}

export interface OTPFieldInputProps extends Omit<BoxProps, "color"> {
  color?: InputColor;
  error?: boolean;
}

export interface OTPFieldSlotProps {
  root?: Omit<BoxProps, "ref">;
  input?: Omit<OTPFieldInputProps, "ref">;
  separator?: Omit<BoxProps, "ref">;
}

export interface OTPFieldProps
  extends Omit<
    BoxProps,
    "size" | "color" | "defaultValue" | "value" | "onChange"
  > {
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  size?: OTPFieldSize;
  color?: InputColor;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  slots?: OTPFieldSlots;
  slotProps?: OTPFieldSlotProps;
}
