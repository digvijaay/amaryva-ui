import type { BoxProps } from "@mui/system";
import type * as React from "react";

export interface BottomNavigationContextValue {
  value?: unknown;
  onChange?: (event: React.SyntheticEvent, value: unknown) => void;
  showLabels?: boolean;
}

export interface BottomNavigationProps
  extends Omit<BoxProps, "onChange" | "defaultValue"> {
  value?: unknown;
  defaultValue?: unknown;
  onChange?: (event: React.SyntheticEvent, value: unknown) => void;
  showLabels?: boolean;
  children: React.ReactNode;
}

export interface BottomNavigationActionProps
  extends Omit<BoxProps, "value" | "onChange"> {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  value?: unknown;
  showLabel?: boolean;
  selected?: boolean;
}
