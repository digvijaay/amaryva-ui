import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { PreviewCardProps } from "./preview-card.types";

// ----------------------------------------------------------------------

export const PreviewCardPopup = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <BasePreviewCard.Popup
        render={
          <Box
            ref={ref}
            sx={{
              backgroundColor: "var(--theme-color-background-paper)",
              borderRadius: "12px",
              border:
                "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
              boxShadow:
                "var(--theme-shadow-dropdown, 0 16px 32px -4px rgba(0,0,0,0.2))",
              p: 2,
              maxWidth: 320,
              zIndex: 1300,
              outline: "none",
              transition: "opacity 150ms ease, transform 150ms ease",
              opacity: 1,
              transform: "scale(1)",
              "&[data-starting-style], &[data-ending-style]": {
                opacity: 0,
                transform: "scale(0.96)",
              },
              ...sx,
            }}
            className={`outline-none ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
PreviewCardPopup.displayName = "PreviewCardPopup";

export const PreviewCardArrow = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, ...other }, ref) => {
    return (
      <BasePreviewCard.Arrow
        render={
          <Box
            ref={ref}
            sx={{
              width: 8,
              height: 8,
              backgroundColor: "var(--theme-color-background-paper)",
              border:
                "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
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
PreviewCardArrow.displayName = "PreviewCardArrow";

export function PreviewCard({
  trigger,
  content,
  side = "bottom",
  sideOffset = 8,
  open,
  defaultOpen,
  onOpenChange,
  arrow = true,
  slotProps,
}: PreviewCardProps) {
  return (
    <BasePreviewCard.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...slotProps?.root}
    >
      <BasePreviewCard.Trigger render={trigger} />

      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner side={side} sideOffset={sideOffset}>
          <PreviewCardPopup {...slotProps?.popup}>
            {content}
            {arrow && <PreviewCardArrow {...slotProps?.arrow} />}
          </PreviewCardPopup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}

PreviewCard.Root = BasePreviewCard.Root;
PreviewCard.Trigger = BasePreviewCard.Trigger;
PreviewCard.Portal = BasePreviewCard.Portal;
PreviewCard.Positioner = BasePreviewCard.Positioner;
PreviewCard.Popup = PreviewCardPopup;
PreviewCard.Arrow = PreviewCardArrow;

export * from "./preview-card.styles";
export * from "./preview-card.types";
export * from "./preview-card-context";
