import * as React from "react";

// ----------------------------------------------------------------------
// NavigationMenu Context
// ----------------------------------------------------------------------

export type NavigationMenuContextValue = Record<string, unknown>;

export const NavigationMenuContext =
  React.createContext<NavigationMenuContextValue | null>(null);

export const useNavigationMenuContext = () =>
  React.useContext(NavigationMenuContext);
