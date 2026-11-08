import * as React from "react";

// ----------------------------------------------------------------------
// ContextMenu Context
// ----------------------------------------------------------------------

export type ContextMenuContextValue = Record<string, unknown>;

export const ContextMenuContext =
  React.createContext<ContextMenuContextValue | null>(null);

export const useContextMenuContext = () => React.useContext(ContextMenuContext);
