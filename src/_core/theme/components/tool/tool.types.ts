import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// Tool Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type ToolStatus = "pending" | "running" | "success" | "error";

// ----------------------------------------------------------------------

export interface ToolProps extends BoxProps {
  name: string;
  status?: ToolStatus;
  input?: unknown;
  output?: unknown;
  defaultExpanded?: boolean;
}
