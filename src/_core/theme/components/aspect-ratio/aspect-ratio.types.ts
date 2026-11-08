import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// AspectRatio Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface AspectRatioSlots {
  root?: React.ElementType;
}

export interface AspectRatioSlotProps {
  root?: Omit<BoxProps, "ref">;
}

export interface AspectRatioProps extends BoxProps {
  ratio?: number | string;
  slots?: AspectRatioSlots;
  slotProps?: AspectRatioSlotProps;
}
