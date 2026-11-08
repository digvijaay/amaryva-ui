import * as React from "react";

// ----------------------------------------------------------------------
// Select Context
// ----------------------------------------------------------------------

export type SelectContextValue = Record<string, unknown>;

export const SelectContext = React.createContext<SelectContextValue | null>(
  null,
);

export const useSelectContext = () => React.useContext(SelectContext);
