import * as React from "react";
import type { BottomNavigationContextValue } from "./bottom-navigation.types";

export const BottomNavigationContext =
  React.createContext<BottomNavigationContextValue>({});

export const useBottomNavigation = () =>
  React.useContext(BottomNavigationContext);
