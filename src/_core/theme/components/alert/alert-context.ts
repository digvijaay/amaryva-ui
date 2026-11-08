import * as React from "react";
import type { AlertSeverity, AlertVariant } from "./alert.types";

// ----------------------------------------------------------------------
// Alert Context
// ----------------------------------------------------------------------

export interface AlertContextValue {
  severity?: AlertSeverity;
  variant?: AlertVariant;
}

export const AlertContext = React.createContext<AlertContextValue>({
  severity: "info",
  variant: "standard",
});

export const useAlertContext = () => React.useContext(AlertContext);
