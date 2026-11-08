import * as React from "react";

// ----------------------------------------------------------------------
// Field Context
// ----------------------------------------------------------------------

export type FieldContextValue = Record<string, unknown>;

export const FieldContext = React.createContext<FieldContextValue | null>(null);

export const useFieldContext = () => React.useContext(FieldContext);
