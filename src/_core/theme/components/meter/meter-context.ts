import * as React from "react";

// ----------------------------------------------------------------------
// Meter Context
// ----------------------------------------------------------------------

export type MeterContextValue = Record<string, unknown>;

export const MeterContext = React.createContext<MeterContextValue | null>(null);

export const useMeterContext = () => React.useContext(MeterContext);
