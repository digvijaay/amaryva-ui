import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// NavigationMenu Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// High-Level Composed NavigationMenu
// ----------------------------------------------------------------------

export interface NavigationMenuProps extends BoxProps {
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
  };
}
