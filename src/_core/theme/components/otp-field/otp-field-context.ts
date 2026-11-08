import * as React from "react";

// ----------------------------------------------------------------------
// OtpField Context
// ----------------------------------------------------------------------

export type OtpFieldContextValue = Record<string, unknown>;

export const OtpFieldContext = React.createContext<OtpFieldContextValue | null>(
  null,
);

export const useOtpFieldContext = () => React.useContext(OtpFieldContext);
