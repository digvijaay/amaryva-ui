import * as React from "react";

// ----------------------------------------------------------------------
// Attachment Context
// ----------------------------------------------------------------------

export type AttachmentContextValue = Record<string, unknown>;

export const AttachmentContext =
  React.createContext<AttachmentContextValue | null>(null);

export const useAttachmentContext = () => React.useContext(AttachmentContext);
