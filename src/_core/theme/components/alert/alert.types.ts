import type { BoxProps } from "@mui/system/Box";
import type * as React from "react";

// ----------------------------------------------------------------------
// Alert Types
// ----------------------------------------------------------------------

export type AlertSeverity = "success" | "info" | "warning" | "error";
export type AlertVariant = "standard" | "filled" | "outlined";

export interface AlertProps extends Omit<BoxProps, "title"> {
  severity?: AlertSeverity;
  variant?: AlertVariant;
  title?: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
}
