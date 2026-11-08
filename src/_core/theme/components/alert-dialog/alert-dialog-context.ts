import * as React from "react";

// ----------------------------------------------------------------------
// AlertDialog Context
// ----------------------------------------------------------------------

export type AlertDialogContextValue = Record<string, unknown>;

export const AlertDialogContext =
  React.createContext<AlertDialogContextValue | null>(null);

export const useAlertDialogContext = () => React.useContext(AlertDialogContext);
