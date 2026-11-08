import * as React from "react";

// ----------------------------------------------------------------------
// Trace Context
// ----------------------------------------------------------------------

export type TraceContextValue = Record<string, unknown>;

export const TraceContext = React.createContext<TraceContextValue | null>(null);

export const useTraceContext = () => React.useContext(TraceContext);
