import type { BoxProps } from "@mui/system";
import type { InputSize } from "../input";

// ----------------------------------------------------------------------
// DatePicker Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface DatePickerProps
  extends Omit<BoxProps, "onChange" | "defaultValue" | "value"> {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  size?: InputSize;
  error?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
}
