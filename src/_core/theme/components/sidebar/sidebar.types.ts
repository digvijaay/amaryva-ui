import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Sidebar Types
// ----------------------------------------------------------------------

export interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  collapsedWidth: number;
  expandedWidth: number;
}

export interface SidebarProviderProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsedWidth?: number;
  expandedWidth?: number;
  children: React.ReactNode;
}

export interface SidebarProps extends BoxProps {
  children: React.ReactNode;
}

export interface SidebarHeaderProps extends BoxProps {}
export interface SidebarContentProps extends BoxProps {}
export interface SidebarFooterProps extends BoxProps {}
export interface SidebarGroupProps extends BoxProps {
  label?: React.ReactNode;
}
export interface SidebarGroupLabelProps extends BoxProps {}
export interface SidebarItemProps extends BoxProps {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
}
export interface SidebarToggleProps extends BoxProps {}
