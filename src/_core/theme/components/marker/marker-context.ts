import * as React from "react";

// ----------------------------------------------------------------------
// Marker Context
// ----------------------------------------------------------------------

export type MarkerContextValue = Record<string, unknown>;

export const MarkerContext = React.createContext<MarkerContextValue | null>(
  null,
);

export const useMarkerContext = () => React.useContext(MarkerContext);
