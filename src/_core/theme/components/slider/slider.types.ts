import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Slider Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type SliderColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type SliderSize = "small" | "medium";

export interface SliderProps
  extends Omit<BoxProps, "color" | "defaultValue" | "onChange"> {
  value?: number | number[];
  defaultValue?: number | number[];
  onValueChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  color?: SliderColor;
  size?: SliderSize;
  label?: React.ReactNode;
  showValue?: boolean;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    control?: Omit<BoxProps, "ref">;
    track?: Omit<BoxProps, "ref">;
    indicator?: Omit<BoxProps, "ref">;
    thumb?: Omit<BoxProps, "ref">;
    value?: Omit<BoxProps, "ref">;
  };
}
