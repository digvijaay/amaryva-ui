import * as React from "react";

// ----------------------------------------------------------------------
// InputLabel Context
// ----------------------------------------------------------------------

export type InputLabelContextValue = Record<string, unknown>;

export const InputLabelContext =
  React.createContext<InputLabelContextValue | null>(null);

export const useInputLabelContext = () => React.useContext(InputLabelContext);
