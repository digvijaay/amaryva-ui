import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type {
  ContextMenuItemProps,
  ContextMenuProps,
} from "./context-menu.types";

export const ContextMenuItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuItemProps
>(
  (
    {
      color = "default",
      disabled = false,
      sx,
      className,
      children,
      onClick,
      ...other
    },
    ref,
  ) => {
    const isError = color === "error";

    const baseColor = isError
      ? "var(--theme-color-error-main)"
      : color !== "default"
        ? `var(--theme-color-${color}-main)`
        : "var(--theme-color-text-primary)";

    return (
      <BaseContextMenu.Item
        disabled={disabled}
        onClick={onClick}
        render={
          <Box
            ref={ref}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 1.5,
              py: 1,
              borderRadius: "6px",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: baseColor,
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.48 : 1,
              userSelect: "none",
              outline: "none",
              transition: "background-color 120ms ease, color 120ms ease",
              "&[data-highlighted]": {
                backgroundColor: isError
                  ? "rgba(var(--theme-color-error-main-channel, 255 86 48) / 0.12)"
                  : "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
              },
              ...sx,
            }}
            className={`flex items-center select-none ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
ContextMenuItem.displayName = "ContextMenuItem";

export const ContextMenuSeparator = React.forwardRef<HTMLHRElement, BoxProps>(
  ({ sx, className, ...other }, ref) => {
    return (
      <BaseContextMenu.Separator
        render={
          <Box
            component="hr"
            ref={ref}
            sx={{
              border: "none",
              borderTop:
                "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
              my: 0.75,
              mx: -0.5,
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
ContextMenuSeparator.displayName = "ContextMenuSeparator";

export const ContextMenuPopup = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <BaseContextMenu.Popup
        render={
          <Box
            ref={ref}
            sx={{
              minWidth: 180,
              backgroundColor: "var(--theme-color-background-paper)",
              borderRadius: "10px",
              border:
                "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
              boxShadow:
                "var(--theme-shadow-dropdown, 0 16px 32px -4px rgba(0,0,0,0.2))",
              p: 0.75,
              outline: "none",
              zIndex: 1300,
              ...sx,
            }}
            className={className}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
ContextMenuPopup.displayName = "ContextMenuPopup";

export function ContextMenu({
  children,
  content,
  slotProps,
}: ContextMenuProps) {
  return (
    <BaseContextMenu.Root {...slotProps?.root}>
      <BaseContextMenu.Trigger
        render={
          <Box
            sx={{ display: "inline-block", ...slotProps?.trigger?.sx }}
            className={slotProps?.trigger?.className}
            {...slotProps?.trigger}
          >
            {children}
          </Box>
        }
      />

      <BaseContextMenu.Portal>
        <BaseContextMenu.Positioner>
          <ContextMenuPopup {...slotProps?.popup}>{content}</ContextMenuPopup>
        </BaseContextMenu.Positioner>
      </BaseContextMenu.Portal>
    </BaseContextMenu.Root>
  );
}

ContextMenu.Root = BaseContextMenu.Root;
ContextMenu.Trigger = BaseContextMenu.Trigger;
ContextMenu.Portal = BaseContextMenu.Portal;
ContextMenu.Positioner = BaseContextMenu.Positioner;
ContextMenu.Popup = ContextMenuPopup;
ContextMenu.Item = ContextMenuItem;
ContextMenu.Separator = ContextMenuSeparator;
ContextMenu.Group = BaseContextMenu.Group;
ContextMenu.GroupLabel = BaseContextMenu.GroupLabel;

export * from "./context-menu.styles";
export * from "./context-menu.types";
export * from "./context-menu-context";
