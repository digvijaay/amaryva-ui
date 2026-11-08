import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Collapsible Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface CollapsibleProps extends Omit<BoxProps, "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  title?: React.ReactNode;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    trigger?: Omit<BoxProps, "ref">;
    panel?: Omit<BoxProps, "ref">;
  };
}
