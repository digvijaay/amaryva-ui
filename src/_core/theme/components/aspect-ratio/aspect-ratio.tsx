import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { AspectRatioProps } from "./aspect-ratio.types";

// ----------------------------------------------------------------------

/**
 * AspectRatio Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maintains fixed proportional width/height ratio (e.g. 16/9, 4/3, 1)
 * - Deep slot customization via slots and slotProps
 */
export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    { ratio = 16 / 9, children, sx, className, slots, slotProps, ...other },
    ref,
  ) => {
    const Component = slots?.root || "div";

    const baseSx: Record<string, unknown> = {
      position: "relative",
      width: "100%",
      aspectRatio: typeof ratio === "number" ? `${ratio}` : ratio,
      overflow: "hidden",
      "& > img, & > video, & > iframe": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(slotProps?.root?.sx)
        ? slotProps.root.sx
        : [slotProps?.root?.sx]),
    ] as BoxProps["sx"];

    return (
      <Box
        ref={ref}
        component={Component}
        sx={mergedSx}
        className={`relative w-full overflow-hidden ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        {children}
      </Box>
    );
  },
);

AspectRatio.displayName = "AspectRatio";

export * from "./aspect-ratio.styles";
export * from "./aspect-ratio.types";
export * from "./aspect-ratio-context";
