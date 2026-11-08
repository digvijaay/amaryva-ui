import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Menu Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type MenuItemColor = "inherit" | "primary" | "error";

export interface MenuItemProps extends Omit<BoxProps, "color"> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: MenuItemColor;
  disabled?: boolean;
}

export interface MenuItemData {
  key?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: MenuItemColor;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  separatorAfter?: boolean;
}

export interface MenuSlots {
  root?: React.ElementType;
  trigger?: React.ElementType;
  popup?: React.ElementType;
  item?: React.ElementType;
}

export interface MenuSlotProps {
  root?: Omit<BoxProps, "ref">;
  trigger?: Omit<BoxProps, "ref">;
  popup?: Omit<BoxProps, "ref">;
  item?: Omit<MenuItemProps, "ref">;
}

export interface MenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  items?: MenuItemData[];
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  blur?: boolean | number | string;
  slots?: MenuSlots;
  slotProps?: MenuSlotProps;
}
