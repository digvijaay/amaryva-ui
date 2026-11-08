import * as React from "react";

// ----------------------------------------------------------------------
// Menubar Context
// ----------------------------------------------------------------------

export type MenubarContextValue = Record<string, unknown>;

export const MenubarContext = React.createContext<MenubarContextValue | null>(
  null,
);

export const useMenubarContext = () => React.useContext(MenubarContext);
