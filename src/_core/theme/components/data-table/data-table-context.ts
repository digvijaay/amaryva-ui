import * as React from "react";

// ----------------------------------------------------------------------
// DataTable Context
// ----------------------------------------------------------------------

export type DataTableContextValue = Record<string, unknown>;

export const DataTableContext =
  React.createContext<DataTableContextValue | null>(null);

export const useDataTableContext = () => React.useContext(DataTableContext);
