import { Popover as BasePopover } from "@base-ui/react/popover";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { PopoverProps } from "./popover.types";

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const PopoverRoot = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverPortal = BasePopover.Portal;
export const PopoverPositioner = BasePopover.Positioner;
export const PopoverClose = BasePopover.Close;
export const PopoverTitle = BasePopover.Title;
export const PopoverDescription = BasePopover.Description;
export const PopoverBackdrop = BasePopover.Backdrop;

export const PopoverPopup = React.forwardRef<
  HTMLDivElement,
  BoxProps & { blur?: boolean | number | string }
>(({ children, blur, sx, className, ...other }, ref) => {
  const blurValue =
    typeof blur === "number"
      ? `${blur}px`
      : typeof blur === "string"
        ? blur
        : "8px";

  const blurStyles = blur
    ? {
        backdropFilter: `blur(${blurValue})`,
        WebkitBackdropFilter: `blur(${blurValue})`,
      }
    : {};

  return (
    <BasePopover.Popup
      render={
        <Box
          ref={ref}
          sx={{
            backgroundColor: "var(--theme-color-background-paper)",
            borderRadius: "12px",
            border: "1px solid var(--theme-color-divider)",
            boxShadow:
              "var(--theme-shadow-dropdown, 0 12px 32px -4px rgba(0, 0, 0, 0.16))",
            p: 2,
            maxWidth: 360,
            outline: "none",
            zIndex: 1300,
            opacity: 1,
            transform: "scale(1)",
            transition: "opacity 150ms ease, transform 150ms ease",
            "&[data-starting-style], &[data-ending-style]": {
              opacity: 0,
              transform: "scale(0.96)",
            },
            ...blurStyles,
            ...sx,
          }}
          className={`bg-paper rounded-xl border border-divider p-4 shadow-xl outline-none z-50 ${blur ? "backdrop-blur-md" : ""} ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Box>
      }
    />
  );
});

PopoverPopup.displayName = "PopoverPopup";

export const PopoverArrow = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, ...other }, ref) => {
    return (
      <BasePopover.Arrow
        render={
          <Box
            ref={ref}
            sx={{
              fill: "var(--theme-color-background-paper)",
              stroke: "var(--theme-color-divider)",
              ...sx,
            }}
            className={`fill-paper stroke-divider ${className || ""}`.trim()}
            {...other}
          />
        }
      />
    );
  },
);

PopoverArrow.displayName = "PopoverArrow";

// ----------------------------------------------------------------------
// Composed Popover Component
// ----------------------------------------------------------------------

/**
 * Popover Component
 *
 * Implements AGENTS.md guidelines:
 * - Powered by @base-ui/react Popover for accessible floating overlays and anchor positioning
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (paper, divider, shadows)
 * - Optional backdrop filter blur effect
 * - Supports both compound subcomponents and declarative trigger/children syntax
 */
export function Popover({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  arrow = true,
  blur = false,
  slots,
  slotProps,
}: PopoverProps) {
  const TriggerComponent = slots?.trigger || BasePopover.Trigger;
  const PopupComponent = slots?.popup || PopoverPopup;

  return (
    <BasePopover.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && (
        <TriggerComponent
          render={
            React.isValidElement(trigger) ? (
              trigger
            ) : (
              <Box component="button" type="button">
                {trigger}
              </Box>
            )
          }
          {...slotProps?.trigger}
        />
      )}

      <BasePopover.Portal>
        <BasePopover.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <PopupComponent
            blur={blur}
            sx={slotProps?.popup?.sx}
            className={slotProps?.popup?.className}
            {...slotProps?.popup}
          >
            {arrow && (
              <PopoverArrow sx={slotProps?.arrow?.sx} {...slotProps?.arrow} />
            )}
            {children}
          </PopupComponent>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

export * from "./popover.styles";
export * from "./popover.types";
export * from "./popover-context";
