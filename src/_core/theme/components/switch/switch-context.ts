import * as React from "react";

// ----------------------------------------------------------------------
// Switch Context
// ----------------------------------------------------------------------

export type SwitchContextValue = Record<string, unknown>;

export const SwitchContext = React.createContext<SwitchContextValue | null>(
  null,
);

export const useSwitchContext = () => React.useContext(SwitchContext);
