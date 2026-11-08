import * as React from "react";

// ----------------------------------------------------------------------
// Progress Context
// ----------------------------------------------------------------------

export type ProgressContextValue = Record<string, unknown>;

export const ProgressContext = React.createContext<ProgressContextValue | null>(
  null,
);

export const useProgressContext = () => React.useContext(ProgressContext);
