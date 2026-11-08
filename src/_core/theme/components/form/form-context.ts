import * as React from "react";

// ----------------------------------------------------------------------
// Form Context
// ----------------------------------------------------------------------

export type FormContextValue = Record<string, unknown>;

export const FormContext = React.createContext<FormContextValue | null>(null);

export const useFormContext = () => React.useContext(FormContext);
