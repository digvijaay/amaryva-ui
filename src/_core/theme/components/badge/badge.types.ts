import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Badge Types
// ----------------------------------------------------------------------

export type BadgeVariant = "standard" | "dot";

export type BadgeColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "inherit";

export type BadgeSize = "small" | "medium" | "large";

export interface BadgeOrigin {
  vertical: "top" | "bottom";
  horizontal: "right" | "left";
}

export interface BadgeSlots {
  root?: React.ElementType;
  badge?: React.ElementType;
}

export interface BadgeSlotProps {
  root?: Omit<BoxProps, "ref">;
  badge?: Omit<BoxProps, "ref">;
}

export interface BadgeProps extends Omit<BoxProps, "color"> {
  badgeContent?: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  invisible?: boolean;
  max?: number;
  showZero?: boolean;
  overlap?: "rectangular" | "circular";
  anchorOrigin?: BadgeOrigin;
  slots?: BadgeSlots;
  slotProps?: BadgeSlotProps;
}
