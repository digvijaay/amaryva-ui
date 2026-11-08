import * as React from "react";

// ----------------------------------------------------------------------
// Avatar Context
// ----------------------------------------------------------------------

export type AvatarContextValue = Record<string, unknown>;

export const AvatarContext = React.createContext<AvatarContextValue | null>(
  null,
);

export const useAvatarContext = () => React.useContext(AvatarContext);
