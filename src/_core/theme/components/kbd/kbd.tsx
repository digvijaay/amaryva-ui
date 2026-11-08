import { Box } from "@mui/system";
import * as React from "react";
import type { KbdProps, KbdSize, KbdVariant } from "./kbd.types";

// ----------------------------------------------------------------------

/**
 * Kbd Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Styled keycap presentation with theme tokens and mono font
 * - Supports 3 size scales and 3 styling variants
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  (
    {
      size = "medium",
      variant = "outlined",
      children,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const sizeStyles: Record<KbdSize, Record<string, unknown>> = {
      small: {
        height: 18,
        minWidth: 18,
        px: 0.5,
        fontSize: "0.6875rem",
        borderRadius: "4px",
      },
      medium: {
        height: 22,
        minWidth: 22,
        px: 0.75,
        fontSize: "0.75rem",
        borderRadius: "5px",
      },
      large: {
        height: 26,
        minWidth: 26,
        px: 1,
        fontSize: "0.8125rem",
        borderRadius: "6px",
      },
    };

    const variantStyles: Record<KbdVariant, Record<string, unknown>> = {
      outlined: {
        backgroundColor: "var(--theme-color-background-paper)",
        color: "var(--theme-color-text-secondary)",
        border:
          "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.24))",
        boxShadow:
          "0 1px 0 1px var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
      },
      filled: {
        backgroundColor: "var(--theme-color-background-neutral)",
        color: "var(--theme-color-text-primary)",
        border: "1px solid transparent",
        boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.2)",
      },
      subtle: {
        backgroundColor:
          "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
        color: "var(--theme-color-text-secondary)",
        border: "1px solid transparent",
        boxShadow: "none",
      },
    };

    const baseSx: Record<string, unknown> = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily:
        "var(--theme-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)",
      fontWeight: 600,
      lineHeight: 1,
      userSelect: "none",
      verticalAlign: "middle",
      whiteSpace: "nowrap",
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...sx,
    };

    return (
      <Box
        ref={ref}
        component="kbd"
        sx={baseSx}
        className={`inline-flex items-center justify-center font-mono font-semibold select-none ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

Kbd.displayName = "Kbd";

export * from "./kbd.styles";
export * from "./kbd.types";
export * from "./kbd-context";
