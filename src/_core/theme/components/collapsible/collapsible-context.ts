import * as React from "react";

// ----------------------------------------------------------------------
// Collapsible Context
// ----------------------------------------------------------------------

export type CollapsibleContextValue = Record<string, unknown>;

export const CollapsibleContext =
  React.createContext<CollapsibleContextValue | null>(null);

export const useCollapsibleContext = () => React.useContext(CollapsibleContext);
