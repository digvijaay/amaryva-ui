import type { BoxProps } from "@mui/system";
import type * as React from "react";

export type ToastSeverity =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info";
export type ToastLayout = "stack" | "list";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProps {
  toast?: any;
  layout?: ToastLayout;
  severity?: ToastSeverity;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  showClose?: boolean;
  closeText?: string;
  sx?: BoxProps["sx"];
  className?: string;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    title?: Omit<BoxProps, "ref">;
    description?: Omit<BoxProps, "ref">;
    action?: Omit<BoxProps, "ref">;
    close?: Omit<BoxProps, "ref">;
  };
}

export interface ToastViewportProps extends BoxProps {
  position?: ToastPosition;
  layout?: ToastLayout;
  children?: React.ReactNode;
}

export interface ToastActionProps extends Omit<BoxProps, "onClick"> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface ToastCloseProps extends BoxProps {
  children?: React.ReactNode;
  variant?: "icon" | "button";
}
