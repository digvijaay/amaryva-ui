import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { InputLabelProps, InputLabelSize } from "./input-label.types";

// ----------------------------------------------------------------------
// InputLabel Component
// ----------------------------------------------------------------------

/**
 * InputLabel Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (textPrimary, error, textDisabled)
 * - Accessible label for form controls with optional required asterisk
 * - Deep slot customization via slots and slotProps
 */
export const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  (
    {
      children,
      size = "medium",
      color = "inherit",
      required = false,
      error = false,
      disabled = false,
      htmlFor,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const Component = slots?.root || "label";

    const sizeStyles: Record<InputLabelSize, Record<string, unknown>> = {
      small: { fontSize: "0.8125rem", mb: 0.5 },
      medium: { fontSize: "0.875rem", mb: 0.75 },
      large: { fontSize: "0.9375rem", mb: 1 },
    };

    const baseSx: Record<string, unknown> = {
      display: "inline-flex",
      alignItems: "center",
      fontWeight: 600,
      lineHeight: 1.4,
      cursor: disabled ? "not-allowed" : "pointer",
      color: error
        ? "var(--theme-color-error-main)"
        : disabled
          ? "var(--theme-color-text-disabled)"
          : color && color !== "inherit"
            ? `var(--theme-color-${color}-main)`
            : "var(--theme-color-text-primary)",
      ...sizeStyles[size],
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
        htmlFor={htmlFor}
        sx={mergedSx}
        className={`inline-flex items-center font-semibold select-none ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        {children}
        {required && (
          <Box
            component={slots?.asterisk || "span"}
            sx={{
              color: "var(--theme-color-error-main)",
              ml: 0.5,
              ...slotProps?.asterisk?.sx,
            }}
            className={`text-red-500 ml-1 ${slotProps?.asterisk?.className || ""}`.trim()}
            {...slotProps?.asterisk}
          >
            *
          </Box>
        )}
      </Box>
    );
  },
);

InputLabel.displayName = "InputLabel";

export * from "./input-label.styles";
export * from "./input-label.types";
export * from "./input-label-context";
