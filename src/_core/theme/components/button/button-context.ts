import * as React from "react";

// ----------------------------------------------------------------------
// Button Context
// ----------------------------------------------------------------------

export interface ButtonContextValue {
  disableHoverY?: boolean;
}

export const ButtonContext = React.createContext<ButtonContextValue>({
  disableHoverY: false,
});

export const useButtonContext = () => React.useContext(ButtonContext);
