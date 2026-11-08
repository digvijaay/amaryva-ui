import { Box } from "@mui/system";
import * as React from "react";
import type { BubbleProps } from "./bubble.types";

/**
 * Bubble Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (paper, neutral, primary, divider)
 * - Tailored for conversational bubbles, comments, and AI dialogue messages
 */
export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  (
    {
      variant = "soft",
      color = "default",
      pointer = "none",
      children,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const getPointerRadius = () => {
      switch (pointer) {
        case "left":
          return { borderTopLeftRadius: "2px" };
        case "right":
          return { borderTopRightRadius: "2px" };
        case "bottom":
          return { borderBottomRightRadius: "2px" };
        case "top":
          return { borderTopLeftRadius: "2px" };
        default:
          return {};
      }
    };

    const getVariantStyles = () => {
      if (color === "primary") {
        if (variant === "filled") {
          return {
            backgroundColor: "var(--theme-color-primary-main)",
            color: "var(--theme-color-primary-contrast-text, #FFFFFF)",
            border: "1px solid transparent",
          };
        }
        if (variant === "soft") {
          return {
            backgroundColor:
              "rgba(var(--theme-color-primary-main-channel) / 0.12)",
            color:
              "var(--theme-color-primary-dark, var(--theme-color-primary-main))",
            border: "1px solid transparent",
          };
        }
        return {
          backgroundColor: "var(--theme-color-background-paper)",
          color: "var(--theme-color-text-primary)",
          border: "1px solid var(--theme-color-primary-main)",
        };
      }

      // Default
      if (variant === "filled") {
        return {
          backgroundColor: "var(--theme-color-background-neutral)",
          color: "var(--theme-color-text-primary)",
          border: "1px solid transparent",
        };
      }
      if (variant === "soft") {
        return {
          backgroundColor:
            "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
          color: "var(--theme-color-text-primary)",
          border: "1px solid transparent",
        };
      }
      return {
        backgroundColor: "var(--theme-color-background-paper)",
        color: "var(--theme-color-text-primary)",
        border:
          "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
      };
    };

    const baseSx: Record<string, unknown> = {
      display: "inline-block",
      maxWidth: "100%",
      px: 2,
      py: 1.25,
      borderRadius: "16px",
      fontSize: "0.875rem",
      lineHeight: 1.5,
      wordBreak: "break-word",
      ...getPointerRadius(),
      ...getVariantStyles(),
      ...sx,
    };

    return (
      <Box
        ref={ref}
        sx={baseSx}
        className={`inline-block text-sm rounded-2xl ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

Bubble.displayName = "Bubble";

export * from "./bubble.styles";
export * from "./bubble.types";
export * from "./bubble-context";
