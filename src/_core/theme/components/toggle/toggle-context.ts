import * as React from "react";

// ----------------------------------------------------------------------
// Toggle Context
// ----------------------------------------------------------------------

export type ToggleContextValue = Record<string, unknown>;

export const ToggleContext = React.createContext<ToggleContextValue | null>(
  null,
);

export const useToggleContext = () => React.useContext(ToggleContext);
