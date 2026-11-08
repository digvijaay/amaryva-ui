import type { Form as BaseForm } from "@base-ui/react/form";
import type { BoxProps } from "@mui/system";
import type * as React from "react";

// ----------------------------------------------------------------------
// Form Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export type FormValidationMode = "onSubmit" | "onBlur" | "onChange";

export interface FormSlots {
  root?: React.ElementType;
}

export interface FormSlotProps {
  root?: BoxProps;
}

export interface FormProps<
  FormValues extends Record<string, unknown> = Record<string, unknown>,
> extends Omit<BoxProps, "onSubmit"> {
  validationMode?: FormValidationMode;
  errors?: Record<string, string | string[]>;
  onFormSubmit?: (
    formValues: FormValues,
    eventDetails: BaseForm.SubmitEventDetails,
  ) => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  actionsRef?: React.RefObject<BaseForm.Actions | null>;
  slots?: FormSlots;
  slotProps?: FormSlotProps;
}
