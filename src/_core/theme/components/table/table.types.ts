import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Table Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type TablePadding = "normal" | "checkbox" | "none";

export type TableSize = "small" | "medium";

export interface TableProps extends BoxProps {
  size?: TableSize;
  stickyHeader?: boolean;
}

export interface TableRowProps extends BoxProps {
  selected?: boolean;
  hover?: boolean;
}

export interface TableCellProps extends BoxProps {
  align?: "left" | "center" | "right" | "justify";
  padding?: TablePadding;
  component?: React.ElementType;
  colSpan?: number;
  rowSpan?: number;
}
