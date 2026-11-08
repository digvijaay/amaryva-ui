import * as React from "react";

// ----------------------------------------------------------------------
// MessageScroller Context
// ----------------------------------------------------------------------

export type MessageScrollerContextValue = Record<string, unknown>;

export const MessageScrollerContext =
  React.createContext<MessageScrollerContextValue | null>(null);

export const useMessageScrollerContext = () =>
  React.useContext(MessageScrollerContext);
