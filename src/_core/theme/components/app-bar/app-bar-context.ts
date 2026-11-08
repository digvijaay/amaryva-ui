import * as React from "react";

// ----------------------------------------------------------------------
// AppBar Context
// ----------------------------------------------------------------------

export type AppBarContextValue = Record<string, unknown>;

export const AppBarContext = React.createContext<AppBarContextValue | null>(
  null,
);

export const useAppBarContext = () => React.useContext(AppBarContext);
