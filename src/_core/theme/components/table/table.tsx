import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { TableCellProps, TableProps, TableRowProps } from "./table.types";

export const TableContainer = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        overflowX: "auto",
        borderRadius: "var(--theme-shape-borderRadius, 10px)",
        border:
          "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
        backgroundColor: "var(--theme-color-background-paper)",
        ...sx,
      }}
      className={`w-full overflow-x-auto ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
TableContainer.displayName = "TableContainer";

const TableRoot = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      size = "medium",
      stickyHeader = false,
      sx,
      className,
      children,
      ...other
    },
    ref,
  ) => (
    <Box
      ref={ref}
      component="table"
      data-size={size}
      data-sticky={stickyHeader ? "" : undefined}
      sx={{
        display: "table",
        width: "100%",
        borderCollapse: "collapse",
        borderSpacing: 0,
        fontSize: size === "small" ? "0.8125rem" : "0.875rem",
        ...sx,
      }}
      className={`w-full caption-bottom text-sm ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
TableRoot.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      component="thead"
      sx={{
        display: "table-header-group",
        backgroundColor:
          "var(--theme-color-background-neutral, rgba(145, 158, 171, 0.08))",
        ...sx,
      }}
      className={`[&_tr]:border-b ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      component="tbody"
      sx={{
        display: "table-row-group",
        ...sx,
      }}
      className={`[&_tr:last-child]:border-0 ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<HTMLTableSectionElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      component="tfoot"
      sx={{
        display: "table-footer-group",
        borderTop:
          "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
        backgroundColor: "var(--theme-color-background-neutral)",
        fontWeight: 600,
        ...sx,
      }}
      className={`border-t font-medium ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    { selected = false, hover = true, sx, className, children, ...other },
    ref,
  ) => (
    <Box
      ref={ref}
      component="tr"
      data-selected={selected ? "" : undefined}
      sx={{
        display: "table-row",
        color: "inherit",
        borderBottom:
          "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.16))",
        transition: "background-color 150ms ease",
        ...(hover && {
          "&:hover": {
            backgroundColor:
              "var(--theme-color-action-hover, rgba(145, 158, 171, 0.04))",
          },
        }),
        ...(selected && {
          backgroundColor:
            "rgba(var(--theme-color-primary-main-channel) / 0.08) !important",
        }),
        ...sx,
      }}
      className={`border-b transition-colors ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    { align = "left", padding = "normal", sx, className, children, ...other },
    ref,
  ) => (
    <Box
      ref={ref}
      component="th"
      sx={{
        display: "table-cell",
        fontWeight: 600,
        textAlign: align,
        color: "var(--theme-color-text-secondary)",
        py: padding === "none" ? 0 : 1.75,
        px: padding === "none" ? 0 : padding === "checkbox" ? 1 : 2,
        userSelect: "none",
        whiteSpace: "nowrap",
        ...sx,
      }}
      className={`text-left align-middle font-medium ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      align = "left",
      padding = "normal",
      component = "td",
      sx,
      className,
      children,
      ...other
    },
    ref,
  ) => (
    <Box
      ref={ref}
      component={component}
      sx={{
        display: "table-cell",
        textAlign: align,
        color: "var(--theme-color-text-primary)",
        py: padding === "none" ? 0 : 1.75,
        px: padding === "none" ? 0 : padding === "checkbox" ? 1 : 2,
        ...sx,
      }}
      className={`align-middle ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      component="caption"
      sx={{
        display: "table-caption",
        captionSide: "bottom",
        pt: 1.5,
        fontSize: "0.8125rem",
        color: "var(--theme-color-text-disabled)",
        textAlign: "center",
        ...sx,
      }}
      className={`mt-2 text-sm text-center ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
TableCaption.displayName = "TableCaption";

export const Table = Object.assign(TableRoot, {
  Container: TableContainer,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
});

export * from "./table.styles";
export * from "./table.types";
export * from "./table-context";
