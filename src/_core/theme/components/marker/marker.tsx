import { Box } from "@mui/system";
import * as React from "react";
import type { MarkerProps } from "./marker.types";

/**
 * Marker Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (primary, success, warning, etc.)
 * - Supports text highlights, pulse status dots, and pin markers
 */
export const Marker = React.forwardRef<HTMLElement, MarkerProps>(
  (
    {
      variant = "dot",
      color = "primary",
      pulse = false,
      children,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const getColorVar = () => {
      if (color === "inherit") return "var(--theme-color-text-primary)";
      return `var(--theme-color-${color}-main)`;
    };

    const getColorChannel = () => {
      if (color === "inherit")
        return "var(--theme-color-text-primary-channel, 145 158 171)";
      return `var(--theme-color-${color}-main-channel)`;
    };

    if (variant === "text") {
      return (
        <Box
          ref={ref}
          component="mark"
          sx={{
            backgroundColor: `rgba(var(${getColorChannel()}) / 0.16)`,
            color: "inherit",
            px: 0.5,
            py: 0.1,
            borderRadius: "4px",
            fontWeight: 600,
            ...sx,
          }}
          className={`px-1 py-0.5 rounded font-semibold ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Box>
      );
    }

    if (variant === "pin") {
      return (
        <Box
          ref={ref}
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: getColorVar(),
            color: "#FFFFFF",
            boxShadow: `0 2px 8px rgba(var(${getColorChannel()}) / 0.4)`,
            ...sx,
          }}
          className={`inline-flex items-center justify-center rounded-full shadow ${className || ""}`.trim()}
          {...other}
        >
          {children || (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
              aria-hidden="true"
            >
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
          )}
        </Box>
      );
    }

    // Default "dot" variant
    return (
      <Box
        ref={ref}
        component="span"
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: getColorVar(),
          verticalAlign: "middle",
          ...(pulse && {
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: getColorVar(),
              animation: "markerPulse 1.6s cubic-bezier(0, 0, 0.2, 1) infinite",
            },
            "@keyframes markerPulse": {
              "0%": { transform: "scale(1)", opacity: 0.8 },
              "100%": { transform: "scale(2.8)", opacity: 0 },
            },
          }),
          ...sx,
        }}
        className={`inline-flex rounded-full shrink-0 ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

Marker.displayName = "Marker";

export * from "./marker.styles";
export * from "./marker.types";
export * from "./marker-context";
