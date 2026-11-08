import * as React from "react";

// ----------------------------------------------------------------------
// Fieldset Context
// ----------------------------------------------------------------------

export type FieldsetContextValue = Record<string, unknown>;

export const FieldsetContext = React.createContext<FieldsetContextValue | null>(
  null,
);

export const useFieldsetContext = () => React.useContext(FieldsetContext);
