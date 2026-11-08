import * as React from "react";

// ----------------------------------------------------------------------
// ToggleGroup Context
// ----------------------------------------------------------------------

export type ToggleGroupContextValue = Record<string, unknown>;

export const ToggleGroupContext =
  React.createContext<ToggleGroupContextValue | null>(null);

export const useToggleGroupContext = () => React.useContext(ToggleGroupContext);
