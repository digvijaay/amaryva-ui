import * as React from "react";

// ----------------------------------------------------------------------
// Checkbox Context
// ----------------------------------------------------------------------

export type CheckboxContextValue = Record<string, unknown>;

export const CheckboxContext = React.createContext<CheckboxContextValue | null>(
  null,
);

export const useCheckboxContext = () => React.useContext(CheckboxContext);
