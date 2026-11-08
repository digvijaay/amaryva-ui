import type { BoxProps } from "@mui/system";
import type * as React from "react";

export type ResizableDirection = "horizontal" | "vertical";

export interface ResizableContextValue {
  direction: ResizableDirection;
  onResizeHandle: (index: number, deltaPercent: number) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export interface ResizablePanelGroupProps extends BoxProps {
  direction?: ResizableDirection;
  children?: React.ReactNode;
}

export interface ResizablePanelProps extends BoxProps {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  children?: React.ReactNode;
}

export interface ResizableHandleProps extends BoxProps {
  withHandle?: boolean;
  disabled?: boolean;
  index?: number;
  handleIndex?: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}
