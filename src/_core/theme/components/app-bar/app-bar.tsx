import { Box } from "@mui/system";
import * as React from "react";
import type { AppBarProps } from "./app-bar.types";

// ----------------------------------------------------------------------

/**
 * AppBar Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (paper, primary, divider, shadows)
 * - Supports fixed, sticky, and static positions with frosted glass blur option
 * - Deep slot customization via slots and slotProps
 */
export const AppBar = React.forwardRef<HTMLElement, AppBarProps>(
  (
    {
      position = "sticky",
      color = "default",
      blur = true,
      bordered = true,
      elevation = false,
      children,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const Component = slots?.root || "header";

    const getColorStyles = () => {
      switch (color) {
        case "primary":
          return {
            backgroundColor: "var(--theme-color-primary-main)",
            color: "var(--theme-color-primary-contrast-text, #FFFFFF)",
          };
        case "inherit":
          return {
            backgroundColor: "inherit",
            color: "inherit",
          };
        case "transparent":
          return {
            backgroundColor: "transparent",
            color: "var(--theme-color-text-primary)",
          };
        default:
          return {
            backgroundColor: blur
              ? "rgba(var(--theme-color-background-paper-channel, 255 255 255) / 0.8)"
              : "var(--theme-color-background-paper)",
            color: "var(--theme-color-text-primary)",
          };
      }
    };

    const baseSx: Record<string, unknown> = {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      flexShrink: 0,
      position,
      top: position === "fixed" || position === "sticky" ? 0 : undefined,
      left: position === "fixed" || position === "absolute" ? 0 : undefined,
      right: position === "fixed" || position === "absolute" ? 0 : undefined,
      zIndex: 1100,
      transition: "box-shadow 200ms ease, background-color 200ms ease",
      ...(blur &&
        color !== "primary" && {
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }),
      ...(bordered && {
        borderBottom:
          "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
      }),
      ...(elevation && {
        boxShadow:
          typeof elevation === "number"
            ? `var(--theme-shadow-${elevation}, 0 4px 20px rgba(0, 0, 0, 0.08))`
            : "0 4px 20px -2px rgba(0, 0, 0, 0.08)",
      }),
      ...getColorStyles(),
      ...sx,
      ...slotProps?.root?.sx,
    };

    return (
      <Box
        ref={ref}
        component={Component}
        sx={baseSx}
        className={`w-full ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        {children}
      </Box>
    );
  },
);

AppBar.displayName = "AppBar";

export * from "./app-bar.styles";
export * from "./app-bar.types";
export * from "./app-bar-context";
