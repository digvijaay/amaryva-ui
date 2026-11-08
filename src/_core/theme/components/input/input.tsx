import { Input as BaseInput } from "@base-ui/react/input";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { InputProps, InputSize, InputVariant } from "./input.types";

// ----------------------------------------------------------------------
// Input Component
// ----------------------------------------------------------------------

/**
 * Input Component
 *
 * Implements AGENTS.md guidelines:
 * - Powered by @base-ui/react Input for accessible HTML5 input logic & Field integration
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps directly to custom theme tokens (paper, neutral, divider, primary, error)
 * - Deep slot customization via slots and slotProps
 * - Supports startAdornment, endAdornment, error state, and 3 sizing scales
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outlined",
      color = "primary",
      size = "medium",
      error = false,
      disabled = false,
      fullWidth = false,
      startAdornment,
      endAdornment,
      value,
      defaultValue,
      onValueChange,
      onChange,
      placeholder,
      type = "text",
      name,
      id,
      autoComplete,
      autoFocus,
      readOnly,
      required,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const RootComponent = slots?.root || "div";
    const InputComponent = slots?.input || "input";

    const isInherit = !error && color === "inherit";

    const colorMain = error
      ? "var(--theme-color-error-main)"
      : isInherit
        ? "var(--theme-color-text-primary)"
        : `var(--theme-color-${color}-main)`;

    const colorChannel = error
      ? "var(--theme-color-error-main-channel)"
      : isInherit
        ? "var(--theme-color-text-primary-channel, 145 158 171)"
        : `var(--theme-color-${color}-main-channel)`;

    const sizeStyles: Record<
      InputSize,
      { root: Record<string, unknown>; input: Record<string, unknown> }
    > = {
      small: {
        root: { height: 36, px: 1.5, gap: 1, borderRadius: "8px" },
        input: { fontSize: "0.8125rem" },
      },
      medium: {
        root: { height: 44, px: 2, gap: 1.25, borderRadius: "10px" },
        input: { fontSize: "0.875rem" },
      },
      large: {
        root: { height: 52, px: 2.25, gap: 1.5, borderRadius: "12px" },
        input: { fontSize: "0.9375rem" },
      },
    };

    const variantStyles: Record<InputVariant, Record<string, unknown>> = {
      outlined: {
        backgroundColor: "var(--theme-color-background-paper)",
        border: `1px solid ${error ? "var(--theme-color-error-main)" : "var(--theme-color-divider)"}`,
        "&:hover:not([data-disabled])": {
          borderColor: colorMain,
        },
        "&:focus-within": {
          borderColor: colorMain,
          boxShadow: `0 0 0 3px rgba(var(${colorChannel}) / 0.16)`,
        },
      },
      filled: {
        backgroundColor: "var(--theme-color-background-neutral)",
        border: "1px solid transparent",
        borderBottom: `2px solid ${error ? "var(--theme-color-error-main)" : "var(--theme-color-divider)"}`,
        "&:hover:not([data-disabled])": {
          backgroundColor: "var(--theme-color-action-hover)",
        },
        "&:focus-within": {
          borderColor: "transparent",
          borderBottomColor: colorMain,
          boxShadow: `0 3px 0 0 rgba(var(${colorChannel}) / 0.24)`,
        },
      },
      soft: {
        backgroundColor: isInherit
          ? "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))"
          : `rgba(var(${colorChannel}) / ${error ? "0.08" : "0.06"})`,
        border: "1px solid transparent",
        "&:hover:not([data-disabled])": {
          backgroundColor: isInherit
            ? "var(--theme-color-action-selected, rgba(145, 158, 171, 0.16))"
            : `rgba(var(${colorChannel}) / ${error ? "0.12" : "0.1"})`,
        },
        "&:focus-within": {
          borderColor: colorMain,
          boxShadow: `0 0 0 3px rgba(var(${colorChannel}) / 0.16)`,
        },
      },
    };

    const rootSx: Record<string, unknown> = {
      display: "inline-flex",
      alignItems: "center",
      width: fullWidth ? "100%" : "auto",
      boxSizing: "border-box",
      position: "relative",
      transition: "border-color 200ms ease, box-shadow 200ms ease",
      ...(isInherit && {
        color: "inherit",
      }),
      ...sizeStyles[size].root,
      ...variantStyles[variant],
      ...(disabled && {
        opacity: 0.48,
        cursor: "not-allowed",
        pointerEvents: "none",
      }),
    };

    const mergedRootSx = [
      rootSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(slotProps?.root?.sx)
        ? slotProps.root.sx
        : [slotProps?.root?.sx]),
    ] as BoxProps["sx"];

    const rootClassName =
      `inline-flex items-center transition-all ${fullWidth ? "w-full" : ""} ${className || ""} ${slotProps?.root?.className || ""}`.trim();

    const inputSx: Record<string, unknown> = {
      width: "100%",
      height: "100%",
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      color: isInherit ? "inherit" : "var(--theme-color-text-primary)",
      ...sizeStyles[size].input,
      "&::placeholder": {
        color: "var(--theme-color-text-disabled)",
        opacity: 1,
      },
      "&:disabled": {
        cursor: "not-allowed",
      },
    };

    const mergedInputSx = [
      inputSx,
      ...(Array.isArray(slotProps?.input?.sx)
        ? slotProps.input.sx
        : [slotProps?.input?.sx]),
    ] as BoxProps["sx"];

    return (
      <Box
        component={RootComponent}
        sx={mergedRootSx}
        className={rootClassName}
        data-disabled={disabled ? "" : undefined}
        {...slotProps?.root}
      >
        {startAdornment && (
          <Box
            component={slots?.startAdornment || "span"}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: isInherit
                ? "inherit"
                : "var(--theme-color-text-secondary)",
              flexShrink: 0,
              ...slotProps?.startAdornment?.sx,
            }}
            className={`inline-flex items-center justify-center shrink-0 text-neutral-400 ${slotProps?.startAdornment?.className || ""}`.trim()}
            {...slotProps?.startAdornment}
          >
            {startAdornment}
          </Box>
        )}

        <BaseInput
          disabled={disabled}
          value={value as React.ComponentProps<"input">["value"]}
          defaultValue={
            defaultValue as React.ComponentProps<"input">["defaultValue"]
          }
          onValueChange={onValueChange}
          render={
            <Box
              ref={ref}
              component={InputComponent}
              type={type}
              placeholder={placeholder}
              name={name}
              id={id}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              readOnly={readOnly}
              required={required}
              onChange={onChange}
              sx={mergedInputSx}
              className={`w-full h-full bg-transparent border-none outline-none ${slotProps?.input?.className || ""}`.trim()}
              {...other}
              {...slotProps?.input}
            />
          }
        />

        {endAdornment && (
          <Box
            component={slots?.endAdornment || "span"}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: isInherit
                ? "inherit"
                : "var(--theme-color-text-secondary)",
              flexShrink: 0,
              ...slotProps?.endAdornment?.sx,
            }}
            className={`inline-flex items-center justify-center shrink-0 text-neutral-400 ${slotProps?.endAdornment?.className || ""}`.trim()}
            {...slotProps?.endAdornment}
          >
            {endAdornment}
          </Box>
        )}
      </Box>
    );
  },
);

Input.displayName = "Input";

export * from "./input.styles";
export * from "./input.types";
export * from "./input-context";
