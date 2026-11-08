import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Fieldset Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface FieldsetLegendProps extends BoxProps {}

// ----------------------------------------------------------------------
// High-Level Composed Fieldset
// ----------------------------------------------------------------------

export interface FieldsetProps extends BoxProps {
  legend?: React.ReactNode;
  disabled?: boolean;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    legend?: Omit<FieldsetLegendProps, "ref">;
  };
}
