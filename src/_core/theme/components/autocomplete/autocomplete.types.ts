import type { BoxProps } from "@mui/system";
import type * as React from "react";
import type { InputColor } from "../input";

// ----------------------------------------------------------------------
// Autocomplete Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AutocompleteSlots {
  root?: React.ElementType;
  inputGroup?: React.ElementType;
  input?: React.ElementType;
  popup?: React.ElementType;
  list?: React.ElementType;
  item?: React.ElementType;
  empty?: React.ElementType;
}

export interface AutocompleteSlotProps {
  root?: Omit<BoxProps, "ref">;
  inputGroup?: Omit<BoxProps, "ref">;
  input?: Omit<BoxProps, "ref">;
  popup?: Omit<BoxProps, "ref">;
  list?: Omit<BoxProps, "ref">;
  item?: Omit<BoxProps, "ref">;
  empty?: Omit<BoxProps, "ref">;
}

export interface AutocompleteProps<Option = AutocompleteOption | string>
  extends Omit<BoxProps, "color" | "defaultValue" | "value" | "onChange"> {
  options?: readonly Option[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  color?: InputColor;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  emptyText?: React.ReactNode;
  slots?: AutocompleteSlots;
  slotProps?: AutocompleteSlotProps;
}
