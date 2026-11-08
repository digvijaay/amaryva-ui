import * as React from "react";

// ----------------------------------------------------------------------
// AspectRatio Context
// ----------------------------------------------------------------------

export type AspectRatioContextValue = Record<string, unknown>;

export const AspectRatioContext =
  React.createContext<AspectRatioContextValue | null>(null);

export const useAspectRatioContext = () => React.useContext(AspectRatioContext);
