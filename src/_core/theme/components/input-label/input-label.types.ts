import type { BoxProps } from "@mui/system";
import type * as React from "react";
import type { InputColor } from "../input";

// ----------------------------------------------------------------------
// InputLabel Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type InputLabelSize = "small" | "medium" | "large";

export type InputLabelColor = InputColor | "inherit";

export interface InputLabelSlots {
  root?: React.ElementType;
  asterisk?: React.ElementType;
}

export interface InputLabelSlotProps {
  root?: Omit<BoxProps, "ref">;
  asterisk?: Omit<BoxProps, "ref">;
}

export interface InputLabelProps extends Omit<BoxProps, "size" | "color"> {
  size?: InputLabelSize;
  color?: InputLabelColor;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  slots?: InputLabelSlots;
  slotProps?: InputLabelSlotProps;
}
