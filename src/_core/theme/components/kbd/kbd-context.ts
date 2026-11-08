import * as React from "react";

// ----------------------------------------------------------------------
// Kbd Context
// ----------------------------------------------------------------------

export type KbdContextValue = Record<string, unknown>;

export const KbdContext = React.createContext<KbdContextValue | null>(null);

export const useKbdContext = () => React.useContext(KbdContext);
