import * as React from "react";

// ----------------------------------------------------------------------
// Input Context
// ----------------------------------------------------------------------

export type InputContextValue = Record<string, unknown>;

export const InputContext = React.createContext<InputContextValue | null>(null);

export const useInputContext = () => React.useContext(InputContext);
