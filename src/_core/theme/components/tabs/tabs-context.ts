import * as React from "react";
import type { TabsContextValue } from "./tabs.types";

export const TabsContext = React.createContext<TabsContextValue>({
  variant: "standard",
  color: "primary",
  orientation: "horizontal",
});

export const useTabsContext = () => React.useContext(TabsContext);
