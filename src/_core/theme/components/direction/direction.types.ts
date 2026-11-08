import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Direction Types
// ----------------------------------------------------------------------

export type DirectionType = "ltr" | "rtl";

export interface DirectionContextValue {
  direction: DirectionType;
  isRtl: boolean;
}

export interface DirectionProviderProps {
  direction?: DirectionType;
  children: React.ReactNode;
}

export interface DirectionProps extends BoxProps {
  dir?: DirectionType;
}
