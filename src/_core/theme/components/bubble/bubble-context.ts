import * as React from "react";

// ----------------------------------------------------------------------
// Bubble Context
// ----------------------------------------------------------------------

export type BubbleContextValue = Record<string, unknown>;

export const BubbleContext = React.createContext<BubbleContextValue | null>(
  null,
);

export const useBubbleContext = () => React.useContext(BubbleContext);
