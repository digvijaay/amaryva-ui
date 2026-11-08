import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { TooltipPopupProps, TooltipProps } from "./tooltip.types";

export const TooltipPopup = React.forwardRef<HTMLDivElement, TooltipPopupProps>(
  ({ sx, className, children, ...other }, ref) => {
    const baseSx: Record<string, unknown> = {
      backgroundColor: "var(--theme-color-grey-800, #1C252E)",
      color: "#FFFFFF",
      borderRadius: "6px",
      padding: "6px 10px",
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 1.4,
      boxShadow: "var(--theme-shadow-dropdown, 0 8px 16px rgba(0,0,0,0.2))",
      pointerEvents: "none",
      zIndex: 1300,
      maxWidth: 320,
      transition: "opacity 120ms ease, transform 120ms ease",
      opacity: 1,
      transform: "scale(1)",
      "&[data-starting-style], &[data-ending-style]": {
        opacity: 0,
        transform: "scale(0.96)",
      },
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
    ] as BoxProps["sx"];

    return (
      <BaseTooltip.Popup
        render={
          <Box
            ref={ref}
            sx={mergedSx}
            className={`pointer-events-none select-none ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
TooltipPopup.displayName = "TooltipPopup";

export const TooltipArrow = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, ...other }, ref) => {
    return (
      <BaseTooltip.Arrow
        render={
          <Box
            ref={ref}
            sx={{
              width: 8,
              height: 8,
              backgroundColor: "var(--theme-color-grey-800, #1C252E)",
              transform: "rotate(45deg)",
              ...sx,
            }}
            className={className}
            {...other}
          />
        }
      />
    );
  },
);
TooltipArrow.displayName = "TooltipArrow";

export function Tooltip({
  content,
  children,
  side = "top",
  sideOffset = 6,
  open,
  defaultOpen,
  onOpenChange,
  arrow = true,
  delay = 300,
  slotProps,
}: TooltipProps) {
  if (!content) {
    return children;
  }

  return (
    <BaseTooltip.Provider delay={delay}>
      <BaseTooltip.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        {...slotProps?.root}
      >
        <BaseTooltip.Trigger render={children} />

        <BaseTooltip.Portal>
          <BaseTooltip.Positioner side={side} sideOffset={sideOffset}>
            <TooltipPopup {...slotProps?.popup}>
              {content}
              {arrow && <TooltipArrow {...slotProps?.arrow} />}
            </TooltipPopup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}

// ----------------------------------------------------------------------
// Compound Exports
// ----------------------------------------------------------------------

Tooltip.Provider = BaseTooltip.Provider;
Tooltip.Root = BaseTooltip.Root;
Tooltip.Trigger = BaseTooltip.Trigger;
Tooltip.Portal = BaseTooltip.Portal;
Tooltip.Positioner = BaseTooltip.Positioner;
Tooltip.Popup = TooltipPopup;
Tooltip.Arrow = TooltipArrow;

export * from "./tooltip.styles";
export * from "./tooltip.types";
export * from "./tooltip-context";
