import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// Bubble Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type BubbleVariant = "filled" | "soft" | "outlined";

export type BubbleColor = "primary" | "secondary" | "default" | "inherit";

export type BubblePointer = "left" | "right" | "top" | "bottom" | "none";

export interface BubbleProps extends Omit<BoxProps, "color"> {
  variant?: BubbleVariant;
  color?: BubbleColor;
  pointer?: BubblePointer;
}
