import * as React from "react";

// ----------------------------------------------------------------------
// Backdrop Context
// ----------------------------------------------------------------------

export type BackdropContextValue = Record<string, unknown>;

export const BackdropContext = React.createContext<BackdropContextValue | null>(
  null,
);

export const useBackdropContext = () => React.useContext(BackdropContext);
