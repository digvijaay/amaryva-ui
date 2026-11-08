import * as React from "react";
import type { SidebarContextValue } from "./sidebar.types";

// ----------------------------------------------------------------------
// Sidebar Context
// ----------------------------------------------------------------------

export const SidebarContext = React.createContext<SidebarContextValue>({
  open: true,
  setOpen: () => {},
  toggleSidebar: () => {},
  collapsedWidth: 72,
  expandedWidth: 260,
});

export function useSidebar() {
  return React.useContext(SidebarContext);
}
