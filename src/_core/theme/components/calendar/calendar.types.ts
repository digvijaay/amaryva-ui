import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// Calendar Types
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export interface CalendarProps
  extends Omit<BoxProps, "onChange" | "defaultValue"> {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
}
