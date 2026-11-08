import * as React from "react";

// ----------------------------------------------------------------------
// Table Context
// ----------------------------------------------------------------------

export type TableContextValue = Record<string, unknown>;

export const TableContext = React.createContext<TableContextValue | null>(null);

export const useTableContext = () => React.useContext(TableContext);
