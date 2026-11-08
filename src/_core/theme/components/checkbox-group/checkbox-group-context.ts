import * as React from "react";

// ----------------------------------------------------------------------
// CheckboxGroup Context
// ----------------------------------------------------------------------

export type CheckboxGroupContextValue = Record<string, unknown>;

export const CheckboxGroupContext =
  React.createContext<CheckboxGroupContextValue | null>(null);

export const useCheckboxGroupContext = () =>
  React.useContext(CheckboxGroupContext);
