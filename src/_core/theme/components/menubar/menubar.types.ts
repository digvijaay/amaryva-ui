import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Menubar Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface MenubarSlots {
  root?: React.ElementType;
}

export interface MenubarSlotProps {
  root?: Omit<BoxProps, "ref">;
}

export interface MenubarProps extends BoxProps {
  slots?: MenubarSlots;
  slotProps?: MenubarSlotProps;
}
