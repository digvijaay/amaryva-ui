import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Attachment Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type AttachmentVariant = "card" | "chip";

export interface AttachmentProps extends BoxProps {
  filename: string;
  size?: string;
  icon?: React.ReactNode;
  variant?: AttachmentVariant;
  url?: string;
  progress?: number;
  onRemove?: () => void;
  onDownload?: () => void;
}
