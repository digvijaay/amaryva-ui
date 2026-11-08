import * as React from "react";
import type { ToastLayout, ToastPosition } from "./toast.types";

export interface ToastViewportContextValue {
  layout: ToastLayout;
  position: ToastPosition;
}

export const ToastViewportContext =
  React.createContext<ToastViewportContextValue>({
    layout: "stack",
    position: "bottom-right",
  });

export const useToastViewportContext = () =>
  React.useContext(ToastViewportContext);
