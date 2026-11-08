import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Progress Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type ProgressColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export type ProgressSize = "small" | "medium" | "large" | number;

export interface ProgressProps extends Omit<BoxProps, "color"> {
  value?: number | null;
  max?: number;
  min?: number;
  color?: ProgressColor;
  size?: ProgressSize;
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
