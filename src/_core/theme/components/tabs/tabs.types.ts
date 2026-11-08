import type { BoxProps } from "@mui/system";
import type * as React from "react";

export type TabsVariant =
  | "standard"
  | "contained"
  | "soft"
  | "underline"
  | "pill";
export type TabsColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type TabsOrientation = "horizontal" | "vertical";

export interface TabsContextValue {
  variant?: TabsVariant;
  color?: TabsColor;
  orientation?: TabsOrientation;
}

export interface TabsSlots {
  root?: React.ElementType;
}

export interface TabsSlotProps {
  root?: BoxProps;
}

export interface TabsProps
  extends Omit<
    BoxProps,
    "defaultValue" | "value" | "onValueChange" | "children"
  > {
  value?: string | number | null;
  defaultValue?: string | number;
  onValueChange?: (value: any) => void;
  orientation?: TabsOrientation;
  variant?: TabsVariant;
  color?: TabsColor;
  children: React.ReactNode;
  slots?: TabsSlots;
  slotProps?: TabsSlotProps;
}

export interface TabsListProps extends BoxProps {
  children: React.ReactNode;
  activateOnFocus?: boolean;
  loop?: boolean;
}

export interface TabsTabProps extends Omit<BoxProps, "value"> {
  value: string | number;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface TabsPanelProps extends Omit<BoxProps, "value"> {
  value: string | number;
  children: React.ReactNode;
  keepMounted?: boolean;
}

export interface TabsIndicatorProps extends BoxProps {}
