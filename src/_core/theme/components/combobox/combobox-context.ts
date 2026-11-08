import * as React from "react";

// ----------------------------------------------------------------------
// Combobox Context
// ----------------------------------------------------------------------

export type ComboboxContextValue = Record<string, unknown>;

export const ComboboxContext = React.createContext<ComboboxContextValue | null>(
  null,
);

export const useComboboxContext = () => React.useContext(ComboboxContext);
