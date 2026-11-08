import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { Field } from "../field";
import type { NumberFieldProps, NumberFieldSize } from "./number-field.types";

// ----------------------------------------------------------------------

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <title>Increment</title>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <title>Decrement</title>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const NumberFieldRoot = BaseNumberField.Root;
export const NumberFieldGroup = BaseNumberField.Group;
export const NumberFieldScrubArea = BaseNumberField.ScrubArea;
export const NumberFieldScrubAreaCursor = BaseNumberField.ScrubAreaCursor;

export const NumberFieldInput = React.forwardRef<HTMLInputElement, BoxProps>(
  ({ sx, className, ...other }, ref) => {
    return (
      <BaseNumberField.Input
        render={
          <Box
            ref={ref}
            component="input"
            sx={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              color: "var(--theme-color-text-primary)",
              fontWeight: 500,
              fontSize: "0.875rem",
              "&::placeholder": {
                color: "var(--theme-color-text-disabled)",
              },
              ...sx,
            }}
            className={`w-full h-full text-center bg-transparent border-none outline-none font-medium ${className || ""}`.trim()}
            {...other}
          />
        }
      />
    );
  },
);

NumberFieldInput.displayName = "NumberFieldInput";

export const NumberFieldDecrement = React.forwardRef<
  HTMLButtonElement,
  BoxProps
>(({ children, sx, className, ...other }, ref) => {
  return (
    <BaseNumberField.Decrement
      render={
        <Box
          ref={ref}
          component="button"
          type="button"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "6px",
            border: "none",
            backgroundColor: "transparent",
            color: "var(--theme-color-text-secondary)",
            cursor: "pointer",
            transition: "background-color 150ms ease, color 150ms ease",
            "&:hover:not([data-disabled])": {
              backgroundColor: "var(--theme-color-action-hover)",
              color: "var(--theme-color-text-primary)",
            },
            "&[data-disabled]": {
              opacity: 0.35,
              cursor: "not-allowed",
            },
            ...sx,
          }}
          className={`inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors ${className || ""}`.trim()}
          {...other}
        >
          {children || <MinusIcon />}
        </Box>
      }
    />
  );
});

NumberFieldDecrement.displayName = "NumberFieldDecrement";

export const NumberFieldIncrement = React.forwardRef<
  HTMLButtonElement,
  BoxProps
>(({ children, sx, className, ...other }, ref) => {
  return (
    <BaseNumberField.Increment
      render={
        <Box
          ref={ref}
          component="button"
          type="button"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "6px",
            border: "none",
            backgroundColor: "transparent",
            color: "var(--theme-color-text-secondary)",
            cursor: "pointer",
            transition: "background-color 150ms ease, color 150ms ease",
            "&:hover:not([data-disabled])": {
              backgroundColor: "var(--theme-color-action-hover)",
              color: "var(--theme-color-text-primary)",
            },
            "&[data-disabled]": {
              opacity: 0.35,
              cursor: "not-allowed",
            },
            ...sx,
          }}
          className={`inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors ${className || ""}`.trim()}
          {...other}
        >
          {children || <PlusIcon />}
        </Box>
      }
    />
  );
});

NumberFieldIncrement.displayName = "NumberFieldIncrement";

// ----------------------------------------------------------------------
// Composed NumberField Component
// ----------------------------------------------------------------------

/**
 * NumberField Component
 *
 * Implements AGENTS.md guidelines:
 * - Powered by @base-ui/react NumberField for accessible numeric keyboard control, step incrementing, and clamping
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (paper, neutral, divider, primary)
 * - Deep slot customization via slots and slotProps
 * - Supports stepper buttons, scrubbing, format options, and Field integration
 */
export const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      min,
      max,
      step = 1,
      format,
      size = "medium",
      color = "primary",
      disabled = false,
      readOnly = false,
      required = false,
      error = false,
      label,
      helperText,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const sizeHeights: Record<NumberFieldSize, number> = {
      small: 36,
      medium: 44,
      large: 52,
    };

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

    const groupSx: Record<string, unknown> = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: sizeHeights[size],
      px: 0.75,
      borderRadius: "10px",
      backgroundColor: "var(--theme-color-background-paper)",
      border: `1px solid ${error ? "var(--theme-color-error-main)" : "var(--theme-color-divider)"}`,
      transition: "border-color 200ms ease, box-shadow 200ms ease",
      "&:hover:not([data-disabled])": {
        borderColor: colorMain,
      },
      "&:focus-within": {
        borderColor: colorMain,
        boxShadow: `0 0 0 3px rgba(var(${colorChannel}) / 0.16)`,
      },
      ...(disabled && {
        opacity: 0.48,
        pointerEvents: "none",
        cursor: "not-allowed",
      }),
      ...slotProps?.group?.sx,
    };

    const content = (
      <BaseNumberField.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        format={format}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        render={
          <Box
            ref={ref}
            sx={{ display: "inline-flex", flexDirection: "column", ...sx }}
            className={`inline-flex flex-col ${className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          />
        }
      >
        <BaseNumberField.Group
          render={
            <Box
              sx={groupSx}
              className={`inline-flex items-center justify-between border rounded-xl ${slotProps?.group?.className || ""}`.trim()}
              {...slotProps?.group}
            />
          }
        >
          <NumberFieldDecrement
            sx={slotProps?.decrement?.sx}
            {...slotProps?.decrement}
          />
          <NumberFieldInput sx={slotProps?.input?.sx} {...slotProps?.input} />
          <NumberFieldIncrement
            sx={slotProps?.increment?.sx}
            {...slotProps?.increment}
          />
        </BaseNumberField.Group>
      </BaseNumberField.Root>
    );

    if (label || helperText || error) {
      return (
        <Field
          label={label}
          helperText={helperText}
          error={error}
          required={required}
          disabled={disabled}
        >
          {content}
        </Field>
      );
    }

    return content;
  },
);

NumberField.displayName = "NumberField";

export * from "./number-field.styles";
export * from "./number-field.types";
export * from "./number-field-context";
