import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Tooltip Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipPopupProps extends BoxProps {}

// ----------------------------------------------------------------------
// High-Level Composed Tooltip
// ----------------------------------------------------------------------

export interface TooltipProps {
  content?: React.ReactNode;
  children: React.ReactElement;
  side?: TooltipSide;
  sideOffset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  arrow?: boolean;
  delay?: number;
  slotProps?: {
    root?: Record<string, unknown>;
    popup?: Omit<TooltipPopupProps, "ref">;
    arrow?: Omit<BoxProps, "ref">;
  };
}
