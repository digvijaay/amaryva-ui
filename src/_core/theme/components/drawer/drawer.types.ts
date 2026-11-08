import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Drawer Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type DrawerAnchor = "left" | "right" | "top" | "bottom";

// ----------------------------------------------------------------------

export interface DrawerBackdropProps extends BoxProps {
  blur?: boolean;
  blurValue?: string;
}

// ----------------------------------------------------------------------

export interface DrawerViewportProps extends BoxProps {}

// ----------------------------------------------------------------------

export interface DrawerPopupProps extends BoxProps {
  anchor?: DrawerAnchor;
  width?: string | number;
  height?: string | number;
}

// ----------------------------------------------------------------------
// High-Level Composed Drawer
// ----------------------------------------------------------------------

export interface DrawerSlots {
  root?: React.ElementType;
  backdrop?: React.ElementType;
  viewport?: React.ElementType;
  popup?: React.ElementType;
  title?: React.ElementType;
  description?: React.ElementType;
  close?: React.ElementType;
}

export interface DrawerSlotProps {
  root?: Record<string, unknown>;
  backdrop?: Omit<DrawerBackdropProps, "ref">;
  viewport?: Omit<DrawerViewportProps, "ref">;
  popup?: Omit<DrawerPopupProps, "ref">;
  title?: Omit<BoxProps, "ref">;
  description?: Omit<BoxProps, "ref">;
  close?: Omit<BoxProps, "ref" | "color">;
}

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  anchor?: DrawerAnchor;
  width?: string | number;
  height?: string | number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  blurBackdrop?: boolean;
  showCloseButton?: boolean;
  slots?: DrawerSlots;
  slotProps?: DrawerSlotProps;
}
