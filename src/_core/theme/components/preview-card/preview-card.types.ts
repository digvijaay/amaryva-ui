import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// PreviewCard Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// High-Level Composed PreviewCard
// ----------------------------------------------------------------------

export interface PreviewCardProps {
  trigger: React.ReactElement;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  arrow?: boolean;
  slotProps?: {
    root?: Record<string, unknown>;
    popup?: Omit<BoxProps, "ref">;
    arrow?: Omit<BoxProps, "ref">;
  };
}
