import type { BoxProps } from "@mui/system";
import type * as React from "react";

export interface CommandContextValue {
  search: string;
  setSearch: (query: string) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  itemCount: number;
  registerItem: (id: string, text: string) => () => void;
  hasMatches: boolean;
}

export interface CommandProps extends Omit<BoxProps, "onSelect"> {
  placeholder?: string;
  onSelect?: (value: string) => void;
  children?: React.ReactNode;
}

export interface CommandInputProps extends Omit<BoxProps, "onChange"> {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface CommandListProps extends BoxProps {
  children?: React.ReactNode;
}

export interface CommandEmptyProps extends BoxProps {
  children?: React.ReactNode;
}

export interface CommandGroupProps extends BoxProps {
  heading?: React.ReactNode;
  children?: React.ReactNode;
}

export interface CommandItemProps extends Omit<BoxProps, "onSelect"> {
  value?: string;
  onSelect?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface CommandSeparatorProps extends BoxProps {}

export interface CommandShortcutProps extends BoxProps {
  children?: React.ReactNode;
}

export interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}
