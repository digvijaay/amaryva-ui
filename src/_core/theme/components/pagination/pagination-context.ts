import * as React from "react";

// ----------------------------------------------------------------------
// Pagination Context
// ----------------------------------------------------------------------

export type PaginationContextValue = Record<string, unknown>;

export const PaginationContext =
  React.createContext<PaginationContextValue | null>(null);

export const usePaginationContext = () => React.useContext(PaginationContext);
