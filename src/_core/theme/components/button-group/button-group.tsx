import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { ButtonColor, ButtonSize, ButtonVariant } from "../button";
import type {
  ButtonGroupOrientation,
  ButtonGroupProps,
} from "./button-group.types";
import { ButtonGroupContext, useButtonGroup } from "./button-group-context";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

/**
 * ButtonGroup Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Unifies adjacent Buttons with connected borders and shared radius
 * - Propagates variant, color, size, and orientation down to child buttons
 * - Deep slot customization via slots and slotProps
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      variant = "outlined",
      color = "primary",
      size = "medium",
      orientation = "horizontal",
      disabled = false,
      fullWidth = false,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const Component = slots?.root || "div";

    const isHorizontal = orientation === "horizontal";

    const baseSx: Record<string, unknown> = {
      display: fullWidth ? "flex" : "inline-flex",
      flexDirection: isHorizontal ? "row" : "column",
      borderRadius: "var(--theme-shape-borderRadius, 8px)",
      position: "relative",
      width: fullWidth ? "100%" : "auto",

      // Horizontal styling: merge borders & corner radiuses
      ...(isHorizontal && {
        "& > *:not(:first-of-type)": {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          marginLeft: variant === "outlined" ? "-1px" : 0,
        },
        "& > *:not(:last-of-type)": {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      }),

      // Vertical styling
      ...(!isHorizontal && {
        "& > *:not(:first-of-type)": {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          marginTop: variant === "outlined" ? "-1px" : 0,
        },
        "& > *:not(:last-of-type)": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      }),

      // Hover z-index elevation so borders aren't cut off by adjacent buttons
      "& > *:hover": {
        zIndex: 1,
      },
      "& > *:focus-visible": {
        zIndex: 2,
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
      <ButtonGroupContext.Provider
        value={{
          variant,
          color,
          size,
          disabled,
          fullWidth,
          orientation,
        }}
      >
        <Box
          ref={ref}
          component={Component}
          role="group"
          sx={mergedSx}
          className={`inline-flex rounded-lg ${fullWidth ? "w-full" : ""} ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
          {...other}
          {...slotProps?.root}
        >
          {children}
        </Box>
      </ButtonGroupContext.Provider>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

export * from "./button-group.styles";
export * from "./button-group.types";
export * from "./button-group-context";
