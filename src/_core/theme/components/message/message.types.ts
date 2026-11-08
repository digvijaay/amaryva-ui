import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Message Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type MessageRole = "user" | "assistant" | "system";

export interface MessageActionProps extends BoxProps {
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
}

// ----------------------------------------------------------------------
// High-Level Composed Message
// ----------------------------------------------------------------------

export interface MessageProps extends Omit<BoxProps, "role"> {
  messageRole?: MessageRole;
  role?: MessageRole;
  sender?: React.ReactNode;
  timestamp?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
}
