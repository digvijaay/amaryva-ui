import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Trace Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type TraceStatus = "pending" | "running" | "success" | "error";

// ----------------------------------------------------------------------

export interface TraceStepProps extends Omit<BoxProps, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: TraceStatus;
  duration?: string;
  timestamp?: string;
  isLast?: boolean;
}

// ----------------------------------------------------------------------
// Trace Root
// ----------------------------------------------------------------------

export interface TraceProps extends BoxProps {
  steps?: {
    title: React.ReactNode;
    description?: React.ReactNode;
    status?: TraceStatus;
    duration?: string;
    timestamp?: string;
  }[];
}
