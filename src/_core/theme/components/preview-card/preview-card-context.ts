import * as React from "react";

// ----------------------------------------------------------------------
// PreviewCard Context
// ----------------------------------------------------------------------

export type PreviewCardContextValue = Record<string, unknown>;

export const PreviewCardContext =
  React.createContext<PreviewCardContextValue | null>(null);

export const usePreviewCardContext = () => React.useContext(PreviewCardContext);
