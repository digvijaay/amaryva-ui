import type { BoxProps } from "@mui/system";
import type * as React from "react";
import type { ButtonColor, ButtonSize, ButtonVariant } from "../button";

export type ButtonGroupOrientation = "horizontal" | "vertical";

export interface ButtonGroupSlots {
  root?: React.ElementType;
}

export interface ButtonGroupSlotProps {
  root?: Omit<BoxProps, "ref">;
}

export interface ButtonGroupProps extends Omit<BoxProps, "size" | "color"> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  orientation?: ButtonGroupOrientation;
  disabled?: boolean;
  fullWidth?: boolean;
  slots?: ButtonGroupSlots;
  slotProps?: ButtonGroupSlotProps;
}
