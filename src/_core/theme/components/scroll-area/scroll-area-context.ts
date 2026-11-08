import * as React from "react";

// ----------------------------------------------------------------------
// ScrollArea Context
// ----------------------------------------------------------------------

export type ScrollAreaContextValue = Record<string, unknown>;

export const ScrollAreaContext =
  React.createContext<ScrollAreaContextValue | null>(null);

export const useScrollAreaContext = () => React.useContext(ScrollAreaContext);
