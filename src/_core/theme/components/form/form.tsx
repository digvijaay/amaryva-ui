import { Form as BaseForm } from "@base-ui/react/form";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { FormProps } from "./form.types";

// ----------------------------------------------------------------------
// Form Component
// ----------------------------------------------------------------------

/**
 * Form Component
 *
 * Implements AGENTS.md guidelines:
 * - Powered by @base-ui/react Form for accessible HTML5 form validation and Field integration
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens
 * - Deep slot customization via slots and slotProps
 */
const FormComponent = React.forwardRef<
  HTMLFormElement,
  FormProps<Record<string, unknown>>
>(
  (
    {
      children,
      validationMode = "onSubmit",
      errors,
      onFormSubmit,
      onSubmit,
      actionsRef,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const Component = slots?.root || "form";

    const baseSx: Record<string, unknown> = {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: 2,
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(slotProps?.root?.sx)
        ? slotProps.root.sx
        : [slotProps?.root?.sx]),
    ] as BoxProps["sx"];

    return (
      <BaseForm
        ref={ref}
        validationMode={validationMode}
        errors={errors}
        onFormSubmit={onFormSubmit}
        actionsRef={actionsRef}
        render={
          <Box
            component={Component}
            onSubmit={onSubmit}
            sx={mergedSx}
            className={`flex flex-col gap-4 w-full ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          />
        }
      >
        {children}
      </BaseForm>
    );
  },
);

FormComponent.displayName = "Form";

export const Form = FormComponent as <
  FormValues extends Record<string, unknown> = Record<string, unknown>,
>(
  props: FormProps<FormValues> & { ref?: React.Ref<HTMLFormElement> },
) => React.ReactElement;

export * from "./form.styles";
export * from "./form.types";
export * from "./form-context";
