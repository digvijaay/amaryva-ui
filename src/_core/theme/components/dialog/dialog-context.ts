import * as React from "react";

// ----------------------------------------------------------------------
// Dialog Context
// ----------------------------------------------------------------------

export type DialogContextValue = Record<string, unknown>;

export const DialogContext = React.createContext<DialogContextValue | null>(
  null,
);

export const useDialogContext = () => React.useContext(DialogContext);
