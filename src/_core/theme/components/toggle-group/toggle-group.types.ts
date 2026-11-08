import type { BoxProps } from "@mui/system";

// ----------------------------------------------------------------------
// ToggleGroup Types
// ----------------------------------------------------------------------

export interface ToggleGroupProps
  extends Omit<BoxProps, "defaultValue" | "onChange"> {
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  exclusive?: boolean;
  multiple?: boolean;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
  };
}
