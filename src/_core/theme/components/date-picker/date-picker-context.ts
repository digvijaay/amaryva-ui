import * as React from "react";

// ----------------------------------------------------------------------
// DatePicker Context
// ----------------------------------------------------------------------

export type DatePickerContextValue = Record<string, unknown>;

export const DatePickerContext =
  React.createContext<DatePickerContextValue | null>(null);

export const useDatePickerContext = () => React.useContext(DatePickerContext);
