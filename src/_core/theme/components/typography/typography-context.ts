import * as React from "react";

// ----------------------------------------------------------------------
// Typography Context
// ----------------------------------------------------------------------

export type TypographyContextValue = Record<string, unknown>;

export const TypographyContext =
  React.createContext<TypographyContextValue | null>(null);

export const useTypographyContext = () => React.useContext(TypographyContext);
