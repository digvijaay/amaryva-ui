import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// ContextMenu Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type ContextMenuItemColor =
  | "default"
  | "primary"
  | "error"
  | "warning"
  | "success"
  | "info";

export interface ContextMenuItemProps extends BoxProps {
  color?: ContextMenuItemColor;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

// ----------------------------------------------------------------------
// High-Level Composed ContextMenu
// ----------------------------------------------------------------------

export interface ContextMenuProps {
  children: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  slotProps?: {
    root?: Record<string, unknown>;
    trigger?: Omit<BoxProps, "ref">;
    popup?: Omit<BoxProps, "ref">;
  };
}
