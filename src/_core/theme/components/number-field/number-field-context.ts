import * as React from "react";

// ----------------------------------------------------------------------
// NumberField Context
// ----------------------------------------------------------------------

export type NumberFieldContextValue = Record<string, unknown>;

export const NumberFieldContext =
  React.createContext<NumberFieldContextValue | null>(null);

export const useNumberFieldContext = () => React.useContext(NumberFieldContext);
