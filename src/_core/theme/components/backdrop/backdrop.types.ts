import type { BoxProps } from "@mui/system";
import type { HTMLMotionProps } from "motion/react";
import type * as React from "react";

// ----------------------------------------------------------------------
// Backdrop Types
// ----------------------------------------------------------------------

export interface BackdropSlots {
  root?: React.ElementType;
}

export interface BackdropSlotProps {
  root?: BoxProps;
}

export interface BackdropProps extends Omit<BoxProps, "children"> {
  open?: boolean;
  blur?: boolean | number | string;
  invisible?: boolean;
  transitionDuration?: number;
  zIndex?: number;
  children?: React.ReactNode;
  motionProps?: HTMLMotionProps<"div">;
  slots?: BackdropSlots;
  slotProps?: BackdropSlotProps;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
