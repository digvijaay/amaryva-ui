import * as React from "react";

// ----------------------------------------------------------------------
// Message Context
// ----------------------------------------------------------------------

export type MessageContextValue = Record<string, unknown>;

export const MessageContext = React.createContext<MessageContextValue | null>(
  null,
);

export const useMessageContext = () => React.useContext(MessageContext);
