import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Meter Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type MeterColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type MeterSize = "small" | "medium" | "large" | number;

export interface MeterProps extends Omit<BoxProps, "color"> {
  value?: number;
  max?: number;
  min?: number;
  color?: MeterColor;
  size?: MeterSize;
  label?: React.ReactNode;
  showValue?: boolean;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    track?: Omit<BoxProps, "ref">;
    indicator?: Omit<BoxProps, "ref">;
    label?: Omit<BoxProps, "ref">;
    value?: Omit<BoxProps, "ref">;
  };
}
