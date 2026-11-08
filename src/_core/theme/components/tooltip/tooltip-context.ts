import * as React from "react";

// ----------------------------------------------------------------------
// Tooltip Context
// ----------------------------------------------------------------------

export type TooltipContextValue = Record<string, unknown>;

export const TooltipContext = React.createContext<TooltipContextValue | null>(
  null,
);

export const useTooltipContext = () => React.useContext(TooltipContext);
