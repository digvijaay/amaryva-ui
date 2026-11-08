import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// Skeleton Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";

export type SkeletonAnimation = "pulse" | "wave" | false;

export interface SkeletonProps extends BoxProps {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: number | string;
  height?: number | string;
}
