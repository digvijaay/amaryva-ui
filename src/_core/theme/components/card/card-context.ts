import * as React from "react";

// ----------------------------------------------------------------------
// Card Context
// ----------------------------------------------------------------------

export type CardContextValue = Record<string, unknown>;

export const CardContext = React.createContext<CardContextValue | null>(null);

export const useCardContext = () => React.useContext(CardContext);
