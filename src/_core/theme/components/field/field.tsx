import { Field as BaseField } from "@base-ui/react/field";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { InputLabel, type InputLabelProps } from "../input-label";
import { Typography } from "../typography";
import type { FieldProps } from "./field.types";

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const FieldRoot = React.forwardRef<
  HTMLDivElement,
  BoxProps & { name?: string; invalid?: boolean; disabled?: boolean }
>(({ children, name, invalid, disabled, sx, className, ...other }, ref) => {
  return (
    <BaseField.Root
      name={name}
      invalid={invalid}
      disabled={disabled}
      render={
        <Box
          ref={ref}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 0.5,
            ...sx,
          }}
          className={`flex flex-col gap-1 w-full ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Box>
      }
    />
  );
});

FieldRoot.displayName = "FieldRoot";

export const FieldLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  ({ children, required, error, disabled, sx, className, ...other }, ref) => {
    return (
      <BaseField.Label
        render={
          <InputLabel
            ref={ref}
            required={required}
            error={error}
            disabled={disabled}
            sx={sx}
            className={className}
            {...other}
          >
            {children}
          </InputLabel>
        }
      />
    );
  },
);

FieldLabel.displayName = "FieldLabel";

export const FieldControl = BaseField.Control;

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  BoxProps
>(({ children, sx, className, ...other }, ref) => {
  return (
    <BaseField.Description
      render={
        <Typography
          ref={ref}
          variant="caption"
          component="p"
          color="textSecondary"
          sx={{ mt: 0.5, ...sx }}
          className={`text-xs text-[var(--theme-color-text-secondary)] mt-1 ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Typography>
      }
    />
  );
});

FieldDescription.displayName = "FieldDescription";

export const FieldError = React.forwardRef<
  HTMLParagraphElement,
  BoxProps & { match?: boolean | keyof ValidityState }
>(({ children, match, sx, className, ...other }, ref) => {
  return (
    <BaseField.Error
      match={match}
      render={
        <Typography
          ref={ref}
          variant="caption"
          component="p"
          color="error"
          sx={{ mt: 0.5, ...sx }}
          className={`text-xs text-[var(--theme-color-error-main)] mt-1 ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Typography>
      }
    />
  );
});

FieldError.displayName = "FieldError";

// ----------------------------------------------------------------------
// Composed Field Component
// ----------------------------------------------------------------------

/**
 * Field Component
 *
 * Implements AGENTS.md guidelines:
 * - Powered by @base-ui/react Field for accessible HTML5 field validation, ARIA descriptions, and errors
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (error, textSecondary, textPrimary)
 * - Deep slot customization via slots and slotProps
 * - Supports both compound subcomponents and declarative label/helperText/error props
 */
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      children,
      name,
      label,
      helperText,
      color,
      error,
      required = false,
      disabled = false,
      invalid,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const isError = Boolean(error);
    const hasDeclarativeWrapper = Boolean(label || helperText || error);

    const content = hasDeclarativeWrapper ? (
      <>
        {label && (
          <FieldLabel
            required={required}
            error={isError}
            disabled={disabled}
            color={color}
            sx={slotProps?.label?.sx}
            className={slotProps?.label?.className}
            {...slotProps?.label}
          >
            {label}
          </FieldLabel>
        )}

        {children}

        {typeof error === "string" || React.isValidElement(error) ? (
          <FieldError
            sx={slotProps?.error?.sx}
            className={slotProps?.error?.className}
            {...slotProps?.error}
          >
            {error}
          </FieldError>
        ) : (
          helperText && (
            <FieldDescription
              sx={slotProps?.description?.sx}
              className={slotProps?.description?.className}
              {...slotProps?.description}
            >
              {helperText}
            </FieldDescription>
          )
        )}
      </>
    ) : (
      children
    );

    return (
      <FieldRoot
        ref={ref}
        name={name}
        invalid={invalid ?? isError}
        disabled={disabled}
        sx={sx}
        className={className}
        {...other}
        {...slotProps?.root}
      >
        {content}
      </FieldRoot>
    );
  },
);

Field.displayName = "Field";

export * from "./field.styles";
export * from "./field.types";
export * from "./field-context";
