import * as React from "react";

// ----------------------------------------------------------------------
// RadioGroup Context
// ----------------------------------------------------------------------

export type RadioGroupContextValue = Record<string, unknown>;

export const RadioGroupContext =
  React.createContext<RadioGroupContextValue | null>(null);

export const useRadioGroupContext = () => React.useContext(RadioGroupContext);
