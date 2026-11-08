import * as React from "react";

// ----------------------------------------------------------------------
// Drawer Context
// ----------------------------------------------------------------------

export type DrawerContextValue = Record<string, unknown>;

export const DrawerContext = React.createContext<DrawerContextValue | null>(
  null,
);

export const useDrawerContext = () => React.useContext(DrawerContext);
