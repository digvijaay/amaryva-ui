import * as React from "react";

// ----------------------------------------------------------------------
// Separator Context
// ----------------------------------------------------------------------

export type SeparatorContextValue = Record<string, unknown>;

export const SeparatorContext =
  React.createContext<SeparatorContextValue | null>(null);

export const useSeparatorContext = () => React.useContext(SeparatorContext);
