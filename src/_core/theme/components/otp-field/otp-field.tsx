import { OTPField as BaseOTPField } from "@base-ui/react/otp-field";
import { Box } from "@mui/system";
import * as React from "react";
import { Field } from "../field";
import type {
  OTPFieldInputProps,
  OTPFieldProps,
  OTPFieldSize,
} from "./otp-field.types";

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const OTPFieldRoot = BaseOTPField.Root;
export const OTPFieldSeparator = BaseOTPField.Separator;

export const OTPFieldInput = React.forwardRef<
  HTMLInputElement,
  OTPFieldInputProps
>(({ color = "primary", error = false, sx, className, ...other }, ref) => {
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

  return (
    <BaseOTPField.Input
      render={(props) => (
        <Box
          ref={ref}
          component="input"
          {...props}
          sx={{
            width: 44,
            height: 52,
            textAlign: "center",
            fontSize: "1.25rem",
            fontWeight: 700,
            borderRadius: "10px",
            border: `1px solid ${error ? "var(--theme-color-error-main)" : "var(--theme-color-divider)"}`,
            backgroundColor: "var(--theme-color-background-paper)",
            color: isInherit ? "inherit" : "var(--theme-color-text-primary)",
            outline: "none",
            transition: "border-color 150ms ease, box-shadow 150ms ease",
            "&:hover:not([data-disabled])": {
              borderColor: colorMain,
            },
            "&:focus": {
              borderColor: colorMain,
              boxShadow: `0 0 0 3px rgba(var(${colorChannel}) / 0.16)`,
            },
            "&[data-disabled]": {
              opacity: 0.48,
              cursor: "not-allowed",
            },
            ...sx,
          }}
          className={`w-11 h-13 text-center text-xl font-bold rounded-xl border border-divider bg-paper outline-none transition-all ${className || ""}`.trim()}
          {...other}
        />
      )}
    />
  );
});

OTPFieldInput.displayName = "OTPFieldInput";

// ----------------------------------------------------------------------
// Composed OTPField Component
// ----------------------------------------------------------------------

/**
 * OTPField Component
 *
 * Implements AGENTS.md guidelines:
 * - Powered by @base-ui/react OTPField for accessible PIN / One-Time Password verification inputs
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (paper, divider, primary, error)
 * - Deep slot customization via slots and slotProps
 * - Supports automatic focus advancement, paste distribution, and onComplete callback
 */
export const OTPField = React.forwardRef<HTMLDivElement, OTPFieldProps>(
  (
    {
      length = 6,
      value,
      defaultValue,
      onValueChange,
      onComplete,
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
    const sizeDimensions: Record<
      OTPFieldSize,
      { width: number; height: number; fontSize: string }
    > = {
      small: { width: 38, height: 44, fontSize: "1rem" },
      medium: { width: 46, height: 54, fontSize: "1.25rem" },
      large: { width: 54, height: 64, fontSize: "1.5rem" },
    };

    const activeColor = error ? "error" : color;
    const slotsArray = Array.from({ length }, (_, i) => i);

    const inputSlotSx = {
      ...sizeDimensions[size],
      "&:hover:not([data-disabled])": {
        borderColor: error
          ? "var(--theme-color-error-main)"
          : `var(--theme-color-${activeColor}-main)`,
      },
      "&:focus": {
        borderColor: `var(--theme-color-${activeColor}-main)`,
        boxShadow: `0 0 0 3px rgba(var(--theme-color-${activeColor}-main-channel) / 0.16)`,
      },
      ...(error && {
        borderColor: "var(--theme-color-error-main)",
      }),
      ...slotProps?.input?.sx,
    };

    const content = (
      <BaseOTPField.Root
        length={length}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onValueComplete={onComplete}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        render={(props) => (
          <Box
            ref={ref}
            {...props}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.25,
              ...sx,
            }}
            className={`inline-flex items-center gap-3 ${className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          />
        )}
      >
        {slotsArray.map((index) => (
          <React.Fragment key={index}>
            <OTPFieldInput sx={inputSlotSx} {...slotProps?.input} />
            {/* Show subtle divider midway if length is 6 */}
            {length === 6 && index === 2 && (
              <Box
                component="span"
                sx={{
                  color: "var(--theme-color-text-disabled)",
                  fontWeight: 600,
                  userSelect: "none",
                  ...slotProps?.separator?.sx,
                }}
                className={`text-neutral-400 font-bold select-none ${slotProps?.separator?.className || ""}`.trim()}
                {...slotProps?.separator}
              >
                —
              </Box>
            )}
          </React.Fragment>
        ))}
      </BaseOTPField.Root>
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

OTPField.displayName = "OTPField";

export * from "./otp-field.styles";
export * from "./otp-field.types";
export * from "./otp-field-context";
