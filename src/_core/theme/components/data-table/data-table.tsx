import { Box } from "@mui/system";
import * as React from "react";
import { Checkbox } from "../checkbox";
import { Empty } from "../empty";
import { Input } from "../input";
import { Pagination } from "../pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import type { DataTableProps } from "./data-table.types";

// ----------------------------------------------------------------------

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ArrowUpDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pagination = true,
  pageSize = 5,
  searchable = true,
  searchPlaceholder = "Search records...",
  searchFilter,
  selectable = false,
  selectedRows: selectedProp,
  onSelectionChange,
  onRowClick,
  emptyText = "No records found",
  title,
  toolbarActions,
  sx,
  className,
  ...other
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc",
  );
  const [selectedInternal, setSelectedInternal] = React.useState<T[]>([]);

  const selected = selectedProp !== undefined ? selectedProp : selectedInternal;

  // Search Filtering
  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    if (searchFilter) {
      return data.filter((row) => searchFilter(row, q));
    }
    return data.filter((row) =>
      Object.values(row).some(
        (val) =>
          val !== null &&
          val !== undefined &&
          String(val).toLowerCase().includes(q),
      ),
    );
  }, [data, searchQuery, searchFilter]);

  // Sorting
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;
    const col = columns.find((c) => c.id === sortColumn);
    if (!col || !col.accessorKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[col.accessorKey as keyof T];
      const bVal = b[col.accessorKey as keyof T];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      const compare = aVal < bVal ? -1 : 1;
      return sortDirection === "asc" ? compare : -compare;
    });
  }, [filteredData, sortColumn, sortDirection, columns]);

  // Pagination Slice
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  const handleSort = (colId: string) => {
    if (sortColumn === colId) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(colId);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    const nextSelected = checked ? [...paginatedData] : [];
    if (selectedProp === undefined) setSelectedInternal(nextSelected);
    onSelectionChange?.(nextSelected);
  };

  const handleSelectRow = (row: T, checked: boolean) => {
    let nextSelected: T[];
    if (checked) {
      nextSelected = [...selected, row];
    } else {
      nextSelected = selected.filter((r) => r !== row);
    }
    if (selectedProp === undefined) setSelectedInternal(nextSelected);
    onSelectionChange?.(nextSelected);
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((r) => selected.includes(r));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
        ...sx,
      }}
      className={`flex flex-col w-full gap-4 ${className || ""}`.trim()}
      {...other}
    >
      {/* Top Header & Toolbar */}
      {(title || searchable || toolbarActions) && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          {title && (
            <Box
              sx={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--theme-color-text-primary)",
              }}
            >
              {title}
            </Box>
          )}

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto" }}
          >
            {searchable && (
              <Input
                size="small"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                startAdornment={<SearchIcon />}
                sx={{ width: 240 }}
              />
            )}
            {toolbarActions}
          </Box>
        </Box>
      )}

      {/* Main Table */}
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow hover={false}>
              {selectable && (
                <TableHead padding="checkbox">
                  <Checkbox
                    size="small"
                    checked={isAllSelected}
                    onCheckedChange={(checked) =>
                      handleSelectAll(checked === true)
                    }
                  />
                </TableHead>
              )}
              {columns.map((column) => {
                const isSorted = sortColumn === column.id;
                return (
                  <TableHead
                    key={column.id}
                    align={column.align || "left"}
                    sx={{ width: column.width }}
                  >
                    {column.sortable ? (
                      <Box
                        component="button"
                        type="button"
                        onClick={() => handleSort(column.id)}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.75,
                          background: "none",
                          border: "none",
                          p: 0,
                          cursor: "pointer",
                          fontWeight: "inherit",
                          color: "inherit",
                          "&:hover": {
                            color: "var(--theme-color-text-primary)",
                          },
                        }}
                      >
                        {column.header}
                        <ArrowUpDownIcon
                          style={{
                            opacity: isSorted ? 1 : 0.4,
                            transform:
                              isSorted && sortDirection === "desc"
                                ? "rotate(180deg)"
                                : "none",
                            transition: "transform 150ms ease",
                          }}
                        />
                      </Box>
                    ) : (
                      column.header
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow hover={false}>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  sx={{ py: 6, textAlign: "center" }}
                >
                  <Empty title="No data" description={emptyText} />
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                const isSelected = selected.includes(row);
                const rowKey = (row as { id?: string | number }).id ?? index;
                return (
                  <TableRow
                    key={rowKey}
                    selected={isSelected}
                    onClick={() => onRowClick?.(row, index)}
                    sx={onRowClick ? { cursor: "pointer" } : undefined}
                  >
                    {selectable && (
                      <TableCell
                        padding="checkbox"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          size="small"
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleSelectRow(row, checked === true)
                          }
                        />
                      </TableCell>
                    )}
                    {columns.map((col) => (
                      <TableCell key={col.id} align={col.align || "left"}>
                        {col.cell
                          ? col.cell(row, index)
                          : ((row[
                              col.accessorKey as keyof T
                            ] as React.ReactNode) ?? null)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Footer */}
      {pagination && sortedData.length > pageSize && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 1,
          }}
          className="flex items-center justify-between"
        >
          <Box
            sx={{
              fontSize: "0.8125rem",
              color: "var(--theme-color-text-secondary)",
            }}
          >
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
            {sortedData.length} entries
            {selectable &&
              selected.length > 0 &&
              ` (${selected.length} selected)`}
          </Box>

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, p) => setCurrentPage(p)}
            size="small"
          />
        </Box>
      )}
    </Box>
  );
}

DataTable.displayName = "DataTable";

export * from "./data-table.styles";
export * from "./data-table.types";
export * from "./data-table-context";
