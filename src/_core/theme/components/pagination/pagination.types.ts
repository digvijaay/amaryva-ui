import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Pagination Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type PaginationSize = "small" | "medium" | "large";

export type PaginationColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export interface PaginationLinkProps extends BoxProps {
  isActive?: boolean;
  size?: PaginationSize;
  color?: PaginationColor;
  disabled?: boolean;
}

// ----------------------------------------------------------------------
// Composed High-Level Pagination
// ----------------------------------------------------------------------

export interface PaginationProps extends Omit<BoxProps, "onChange" | "ref"> {
  count?: number;
  page?: number;
  defaultPage?: number;
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  size?: PaginationSize;
  color?: PaginationColor;
  showFirstButton?: boolean;
  showLastButton?: boolean;
}
