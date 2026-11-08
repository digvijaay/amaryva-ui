import * as React from "react";

// ----------------------------------------------------------------------
// Calendar Context
// ----------------------------------------------------------------------

export type CalendarContextValue = Record<string, unknown>;

export const CalendarContext = React.createContext<CalendarContextValue | null>(
  null,
);

export const useCalendarContext = () => React.useContext(CalendarContext);
