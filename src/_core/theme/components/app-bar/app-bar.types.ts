import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// AppBar Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type AppBarPosition =
  | "fixed"
  | "absolute"
  | "sticky"
  | "static"
  | "relative";

export type AppBarColor = "default" | "inherit" | "primary" | "transparent";

export interface AppBarSlots {
  root?: React.ElementType;
}

export interface AppBarSlotProps {
  root?: Omit<BoxProps, "ref">;
}

export interface AppBarProps extends Omit<BoxProps, "color"> {
  position?: AppBarPosition;
  color?: AppBarColor;
  blur?: boolean;
  bordered?: boolean;
  elevation?: number | boolean;
  slots?: AppBarSlots;
  slotProps?: AppBarSlotProps;
}
