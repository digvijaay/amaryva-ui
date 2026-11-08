import * as React from "react";

// ----------------------------------------------------------------------
// Badge Context
// ----------------------------------------------------------------------

export type BadgeContextValue = Record<string, unknown>;

export const BadgeContext = React.createContext<BadgeContextValue | null>(null);

export const useBadgeContext = () => React.useContext(BadgeContext);
