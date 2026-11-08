import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// ScrollArea Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface ScrollAreaProps extends BoxProps {
  scrollbarSize?: number;
  hideDelay?: number;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    viewport?: Omit<BoxProps, "ref">;
    scrollbar?: Omit<BoxProps, "ref">;
    thumb?: Omit<BoxProps, "ref">;
  };
}
