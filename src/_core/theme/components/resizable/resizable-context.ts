import * as React from "react";
import type { ResizableContextValue } from "./resizable.types";

export const ResizableContext = React.createContext<ResizableContextValue>({
  direction: "horizontal",
  onResizeHandle: () => {},
});

export function useResizable() {
  return React.useContext(ResizableContext);
}
