import * as React from "react";

// ----------------------------------------------------------------------
// Tool Context
// ----------------------------------------------------------------------

export type ToolContextValue = Record<string, unknown>;

export const ToolContext = React.createContext<ToolContextValue | null>(null);

export const useToolContext = () => React.useContext(ToolContext);
