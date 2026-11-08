import type { BoxProps } from "@mui/system";
import type * as React from "react";
import type { ButtonColor } from "../button";

// ----------------------------------------------------------------------
// AlertDialog Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type AlertDialogSeverity = "error" | "warning" | "info" | "success";

// ----------------------------------------------------------------------
// Slots & Interfaces
// ----------------------------------------------------------------------

export interface AlertDialogSlots {
  root?: React.ElementType;
  backdrop?: React.ElementType;
  popup?: React.ElementType;
  header?: React.ElementType;
  title?: React.ElementType;
  description?: React.ElementType;
  actions?: React.ElementType;
}

export interface AlertDialogSlotProps {
  root?: BoxProps;
  backdrop?: BoxProps;
  popup?: BoxProps;
  header?: BoxProps;
  title?: BoxProps;
  description?: BoxProps;
  actions?: BoxProps;
}

export interface AlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  severity?: AlertDialogSeverity;
  icon?: React.ReactNode;
  confirmText?: React.ReactNode;
  confirmColor?: ButtonColor;
  cancelText?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  blur?: boolean | number | string;
  maxWidth?: number | string;
  slots?: AlertDialogSlots;
  slotProps?: AlertDialogSlotProps;
  children?: React.ReactNode;
}

// --- Backdrop ---
export interface AlertDialogBackdropProps extends BoxProps {
  blur?: boolean | number | string;
}
