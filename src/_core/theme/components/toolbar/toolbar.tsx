import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { ToolbarProps } from "./toolbar.types";

// ----------------------------------------------------------------------

export const ToolbarButton = React.forwardRef<HTMLButtonElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <BaseToolbar.Button
        render={
          <Box
            component="button"
            type="button"
            ref={ref}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              px: 1.5,
              py: 0.75,
              borderRadius: "6px",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--theme-color-text-primary)",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none",
              transition: "all 150ms ease",
              "&:hover": {
                backgroundColor:
                  "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
              },
              "&:active": {
                backgroundColor:
                  "var(--theme-color-action-selected, rgba(145, 158, 171, 0.16))",
              },
              ...sx,
            }}
            className={`inline-flex items-center justify-center cursor-pointer ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
ToolbarButton.displayName = "ToolbarButton";

export const ToolbarSeparator = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, ...other }, ref) => {
    return (
      <BaseToolbar.Separator
        render={
          <Box
            ref={ref}
            sx={{
              width: "1px",
              height: 20,
              backgroundColor:
                "var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
              mx: 0.5,
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
ToolbarSeparator.displayName = "ToolbarSeparator";

export const ToolbarGroup = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <BaseToolbar.Group
        render={
          <Box
            ref={ref}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              ...sx,
            }}
            className={`inline-flex items-center gap-1 ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
ToolbarGroup.displayName = "ToolbarGroup";

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  (
    {
      orientation = "horizontal",
      children,
      sx,
      className,
      slotProps,
      ...other
    },
    ref,
  ) => {
    const baseSx: Record<string, unknown> = {
      display: "inline-flex",
      alignItems: "center",
      gap: 1,
      p: 1,
      borderRadius: "10px",
      backgroundColor: "var(--theme-color-background-paper)",
      border: "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
      boxShadow: "var(--theme-shadow-card, 0 2px 8px rgba(0,0,0,0.06))",
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    return (
      <BaseToolbar.Root
        orientation={orientation}
        render={
          <Box
            ref={ref}
            sx={mergedRootSx}
            className={`inline-flex items-center ${orientation === "vertical" ? "flex-col" : "flex-row"} ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          >
            {children}
          </Box>
        }
      />
    );
  },
) as unknown as React.ForwardRefExoticComponent<
  ToolbarProps & React.RefAttributes<HTMLDivElement>
> & {
  Root: typeof BaseToolbar.Root;
  Button: typeof ToolbarButton;
  Separator: typeof ToolbarSeparator;
  Group: typeof ToolbarGroup;
  Link: typeof BaseToolbar.Link;
  Input: typeof BaseToolbar.Input;
};

Toolbar.displayName = "Toolbar";
Toolbar.Root = BaseToolbar.Root;
Toolbar.Button = ToolbarButton;
Toolbar.Separator = ToolbarSeparator;
Toolbar.Group = ToolbarGroup;
Toolbar.Link = BaseToolbar.Link;
Toolbar.Input = BaseToolbar.Input;

export * from "./toolbar.styles";
export * from "./toolbar.types";
export * from "./toolbar-context";
