import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Dialog Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export interface DialogBackdropProps extends BoxProps {
  blur?: boolean;
  blurValue?: string;
}

export interface DialogPopupProps extends BoxProps {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
}

// ----------------------------------------------------------------------
// High-Level Composed Dialog
// ----------------------------------------------------------------------

export interface DialogSlots {
  root?: React.ElementType;
  backdrop?: React.ElementType;
  popup?: React.ElementType;
  title?: React.ElementType;
  description?: React.ElementType;
  close?: React.ElementType;
}

export interface DialogSlotProps {
  root?: Record<string, unknown>;
  backdrop?: Omit<DialogBackdropProps, "ref">;
  popup?: Omit<DialogPopupProps, "ref">;
  title?: Omit<BoxProps, "ref">;
  description?: Omit<BoxProps, "ref">;
  close?: Omit<BoxProps, "ref" | "color">;
}

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: DialogPopupProps["maxWidth"];
  blurBackdrop?: boolean;
  showCloseButton?: boolean;
  slots?: DialogSlots;
  slotProps?: DialogSlotProps;
}
