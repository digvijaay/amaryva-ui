import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// Toolbar Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// High-Level Composed Toolbar
// ----------------------------------------------------------------------

export interface ToolbarProps extends BoxProps {
  orientation?: "horizontal" | "vertical";
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
  };
}
