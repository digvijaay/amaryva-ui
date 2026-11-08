import * as React from "react";

// ----------------------------------------------------------------------
// Toolbar Context
// ----------------------------------------------------------------------

export type ToolbarContextValue = Record<string, unknown>;

export const ToolbarContext = React.createContext<ToolbarContextValue | null>(
  null,
);

export const useToolbarContext = () => React.useContext(ToolbarContext);
