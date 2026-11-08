import * as React from "react";

// ----------------------------------------------------------------------
// Menu Context
// ----------------------------------------------------------------------

export type MenuContextValue = Record<string, unknown>;

export const MenuContext = React.createContext<MenuContextValue | null>(null);

export const useMenuContext = () => React.useContext(MenuContext);
