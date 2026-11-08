import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Breadcrumb Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// High-Level Composed Breadcrumb
// ----------------------------------------------------------------------

export interface BreadcrumbItemData {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps extends BoxProps {
  items?: BreadcrumbItemData[];
  separator?: React.ReactNode;
  maxItems?: number;
  slots?: {
    root?: React.ElementType;
    list?: React.ElementType;
    item?: React.ElementType;
    separator?: React.ElementType;
  };
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    list?: Omit<BoxProps, "ref">;
    item?: Omit<BoxProps, "ref">;
    separator?: Omit<BoxProps, "ref">;
  };
}
