import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Empty Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// Composed Empty Component
// ----------------------------------------------------------------------

export interface EmptyProps extends Omit<BoxProps, "title"> {
  image?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  slots?: {
    root?: React.ElementType;
    image?: React.ElementType;
    title?: React.ElementType;
    description?: React.ElementType;
    action?: React.ElementType;
  };
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    image?: Omit<BoxProps, "ref">;
    title?: Omit<BoxProps, "ref">;
    description?: Omit<BoxProps, "ref">;
    action?: Omit<BoxProps, "ref">;
  };
}
