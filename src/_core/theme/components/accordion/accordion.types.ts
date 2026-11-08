import type { BoxProps } from "@mui/system";
import type * as React from "react";

export type AccordionVariant = "outlined" | "elevation" | "contained" | "ghost";

export interface AccordionContextValue {
  variant: AccordionVariant;
  transitionDuration: number;
  disableHover: boolean;
  activeColor?: string;
  disableTopPadding?: boolean;
}

export interface AccordionSlots {
  root?: React.ElementType;
}

export interface AccordionSlotProps {
  root?: BoxProps;
}

export interface AccordionItemData {
  value: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  disableHover?: boolean;
  activeColor?: string;
  disableTopPadding?: boolean;
}

export interface AccordionProps
  extends Omit<
    BoxProps,
    "defaultValue" | "value" | "onValueChange" | "children"
  > {
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  multiple?: boolean;
  openMultiple?: boolean;
  disabled?: boolean;
  variant?: AccordionVariant;
  transitionDuration?: number;
  disableHover?: boolean;
  activeColor?: string;
  disableTopPadding?: boolean;
  items?: AccordionItemData[];
  children?: React.ReactNode;
  slots?: AccordionSlots;
  slotProps?: AccordionSlotProps;
}

export interface AccordionItemProps extends Omit<BoxProps, "defaultValue"> {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface AccordionTriggerProps extends BoxProps {
  children: React.ReactNode;
  expandIcon?: React.ReactNode;
  disableHover?: boolean;
  activeColor?: string;
}

export interface AccordionPanelProps extends BoxProps {
  children: React.ReactNode;
  disableTopPadding?: boolean;
}
