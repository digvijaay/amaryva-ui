import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Avatar Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type AvatarVariant = "circular" | "rounded" | "square";

export type AvatarSize = "small" | "medium" | "large" | "xlarge" | number;

export interface AvatarProps extends BoxProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  variant?: AvatarVariant;
  size?: AvatarSize;
  badge?: React.ReactNode;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
    image?: Omit<BoxProps, "ref">;
    fallback?: Omit<BoxProps, "ref">;
    badge?: Omit<BoxProps, "ref">;
  };
}
