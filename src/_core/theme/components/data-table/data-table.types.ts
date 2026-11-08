import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// DataTable Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface DataTableColumn<T = Record<string, unknown>> {
  id: string;
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: number | string;
  sortable?: boolean;
}

export interface DataTableProps<T = Record<string, unknown>>
  extends Omit<BoxProps, "children" | "title"> {
  columns: DataTableColumn<T>[];
  data: T[];
  pagination?: boolean;
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (row: T, query: string) => boolean;
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selected: T[]) => void;
  onRowClick?: (row: T, index: number) => void;
  emptyText?: React.ReactNode;
  title?: React.ReactNode;
  toolbarActions?: React.ReactNode;
}
