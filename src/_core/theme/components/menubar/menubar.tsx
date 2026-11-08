import { Menubar as BaseMenubar } from "@base-ui/react/menubar";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { ButtonContext } from "../button/button-context";
import type { MenubarProps } from "./menubar.types";

// ----------------------------------------------------------------------
// Menubar Component
// ----------------------------------------------------------------------

/**
 * Menubar Component
 *
 * Implements AGENTS.md guidelines:
 * - Powered by @base-ui/react Menubar for accessible desktop application menubars and arrow key cycling
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (paper, divider, action states)
 * - Deep slot customization via slots and slotProps
 */
export const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ children, slots, slotProps, sx, className, ...other }, ref) => {
    const Component = slots?.root || "div";

    const baseSx: Record<string, unknown> = {
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      p: 0.5,
      borderRadius: "10px",
      backgroundColor: "var(--theme-color-background-paper)",
      border: "1px solid var(--theme-color-divider)",
      width: "fit-content",
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(slotProps?.root?.sx)
        ? slotProps.root.sx
        : [slotProps?.root?.sx]),
    ] as BoxProps["sx"];

    return (
      <ButtonContext.Provider value={{ disableHoverY: true }}>
        <BaseMenubar
          render={
            <Box
              ref={ref}
              component={Component}
              sx={mergedSx}
              className={`flex items-center gap-1 p-1 rounded-xl bg-paper border border-divider w-fit ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
              {...other}
              {...slotProps?.root}
            />
          }
        >
          {children}
        </BaseMenubar>
      </ButtonContext.Provider>
    );
  },
);

Menubar.displayName = "Menubar";

export * from "./menubar.styles";
export * from "./menubar.types";
export * from "./menubar-context";
