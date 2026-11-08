import * as React from "react";

// ----------------------------------------------------------------------
// Popover Context
// ----------------------------------------------------------------------

export type PopoverContextValue = Record<string, unknown>;

export const PopoverContext = React.createContext<PopoverContextValue | null>(
  null,
);

export const usePopoverContext = () => React.useContext(PopoverContext);
