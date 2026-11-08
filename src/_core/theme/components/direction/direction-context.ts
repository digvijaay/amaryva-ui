import * as React from "react";
import type { DirectionContextValue } from "./direction.types";

// ----------------------------------------------------------------------
// Direction Context
// ----------------------------------------------------------------------

export const DirectionContext = React.createContext<DirectionContextValue>({
  direction: "ltr",
  isRtl: false,
});

export function useDirection() {
  return React.useContext(DirectionContext);
}
