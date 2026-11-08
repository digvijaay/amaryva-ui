import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Popover Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface PopoverSlots {
  root?: React.ElementType;
  trigger?: React.ElementType;
  popup?: React.ElementType;
  arrow?: React.ElementType;
}

export interface PopoverSlotProps {
  root?: Omit<BoxProps, "ref">;
  trigger?: Omit<BoxProps, "ref">;
  popup?: Omit<BoxProps, "ref">;
  arrow?: Omit<BoxProps, "ref">;
}

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  arrow?: boolean;
  blur?: boolean | number | string;
  slots?: PopoverSlots;
  slotProps?: PopoverSlotProps;
}
