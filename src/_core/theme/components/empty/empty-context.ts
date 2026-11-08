import * as React from "react";

// ----------------------------------------------------------------------
// Empty Context
// ----------------------------------------------------------------------

export type EmptyContextValue = Record<string, unknown>;

export const EmptyContext = React.createContext<EmptyContextValue | null>(null);

export const useEmptyContext = () => React.useContext(EmptyContext);
