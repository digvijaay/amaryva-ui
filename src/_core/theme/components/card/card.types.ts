import type { BoxProps } from "@mui/system";
import type { HTMLMotionProps } from "motion/react";
import type * as React from "react";

// ----------------------------------------------------------------------
// Card Types
// ----------------------------------------------------------------------

export type CardVariant = "elevation" | "outlined" | "filled";

export interface CardSlots {
  root?: React.ElementType;
}

export interface CardSlotProps {
  root?: BoxProps;
}

export interface CardProps extends BoxProps {
  variant?: CardVariant;
  animated?: boolean;
  hoverEffect?: boolean;
  motionProps?: HTMLMotionProps<"div">;
  slots?: CardSlots;
  slotProps?: CardSlotProps;
}

// ----------------------------------------------------------------------
// CardContent
// ----------------------------------------------------------------------

export interface CardContentSlots {
  root?: React.ElementType;
}

export interface CardContentSlotProps {
  root?: BoxProps;
}

export interface CardContentProps extends BoxProps {
  slots?: CardContentSlots;
  slotProps?: CardContentSlotProps;
}

// ----------------------------------------------------------------------
// CardActions
// ----------------------------------------------------------------------

export interface CardActionsSlots {
  root?: React.ElementType;
}

export interface CardActionsSlotProps {
  root?: BoxProps;
}

export interface CardActionsProps extends BoxProps {
  disableSpacing?: boolean;
  slots?: CardActionsSlots;
  slotProps?: CardActionsSlotProps;
}

// ----------------------------------------------------------------------
// CardHeader
// ----------------------------------------------------------------------

export interface CardHeaderSlots {
  root?: React.ElementType;
  title?: React.ElementType;
  subheader?: React.ElementType;
  avatar?: React.ElementType;
  action?: React.ElementType;
}

export interface CardHeaderSlotProps {
  root?: BoxProps;
  title?: BoxProps;
  subheader?: BoxProps;
  avatar?: BoxProps;
  action?: BoxProps;
}

export interface CardHeaderProps extends Omit<BoxProps, "title"> {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  slots?: CardHeaderSlots;
  slotProps?: CardHeaderSlotProps;
}
