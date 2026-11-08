import * as React from "react";

// ----------------------------------------------------------------------
// Spinner Context
// ----------------------------------------------------------------------

export type SpinnerContextValue = Record<string, unknown>;

export const SpinnerContext = React.createContext<SpinnerContextValue | null>(
  null,
);

export const useSpinnerContext = () => React.useContext(SpinnerContext);
