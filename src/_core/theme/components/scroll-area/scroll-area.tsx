import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { ScrollAreaProps } from "./scroll-area.types";

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      children,
      scrollbarSize = 8,
      hideDelay = 600,
      sx,
      className,
      slotProps,
      ...other
    },
    ref,
  ) => {
    const baseSx: Record<string, unknown> = {
      position: "relative",
      overflow: "hidden",
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    return (
      <BaseScrollArea.Root
        render={
          <Box
            ref={ref}
            sx={mergedRootSx}
            className={`relative overflow-hidden ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          >
            <BaseScrollArea.Viewport
              render={
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "inherit",
                    ...slotProps?.viewport?.sx,
                  }}
                  className={`w-full h-full ${slotProps?.viewport?.className || ""}`.trim()}
                  {...slotProps?.viewport}
                >
                  {children}
                </Box>
              }
            />

            <BaseScrollArea.Scrollbar
              orientation="vertical"
              render={
                <Box
                  sx={{
                    display: "flex",
                    userSelect: "none",
                    touchAction: "none",
                    padding: "2px",
                    width: scrollbarSize,
                    transition: "opacity 150ms ease",
                    "&[data-state='hidden']": {
                      opacity: 0,
                    },
                    ...slotProps?.scrollbar?.sx,
                  }}
                  className={`flex select-none touch-none ${slotProps?.scrollbar?.className || ""}`.trim()}
                  {...slotProps?.scrollbar}
                >
                  <BaseScrollArea.Thumb
                    render={
                      <Box
                        sx={{
                          position: "relative",
                          flex: 1,
                          borderRadius: scrollbarSize / 2,
                          backgroundColor:
                            "var(--theme-color-action-disabled, rgba(145, 158, 171, 0.36))",
                          transition: "background-color 150ms ease",
                          "&:hover": {
                            backgroundColor:
                              "var(--theme-color-action-active, rgba(145, 158, 171, 0.54))",
                          },
                          ...slotProps?.thumb?.sx,
                        }}
                        className={`relative rounded-full ${slotProps?.thumb?.className || ""}`.trim()}
                        {...slotProps?.thumb}
                      />
                    }
                  />
                </Box>
              }
            />

            <BaseScrollArea.Scrollbar
              orientation="horizontal"
              render={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    userSelect: "none",
                    touchAction: "none",
                    padding: "2px",
                    height: scrollbarSize,
                    transition: "opacity 150ms ease",
                    "&[data-state='hidden']": {
                      opacity: 0,
                    },
                  }}
                  className="flex flex-col select-none touch-none"
                >
                  <BaseScrollArea.Thumb
                    render={
                      <Box
                        sx={{
                          position: "relative",
                          flex: 1,
                          borderRadius: scrollbarSize / 2,
                          backgroundColor:
                            "var(--theme-color-action-disabled, rgba(145, 158, 171, 0.36))",
                          transition: "background-color 150ms ease",
                          "&:hover": {
                            backgroundColor:
                              "var(--theme-color-action-active, rgba(145, 158, 171, 0.54))",
                          },
                        }}
                        className="relative rounded-full"
                      />
                    }
                  />
                </Box>
              }
            />

            <BaseScrollArea.Corner />
          </Box>
        }
      />
    );
  },
) as unknown as React.ForwardRefExoticComponent<
  ScrollAreaProps & React.RefAttributes<HTMLDivElement>
> & {
  Root: typeof BaseScrollArea.Root;
  Viewport: typeof BaseScrollArea.Viewport;
  Scrollbar: typeof BaseScrollArea.Scrollbar;
  Thumb: typeof BaseScrollArea.Thumb;
  Corner: typeof BaseScrollArea.Corner;
};

ScrollArea.displayName = "ScrollArea";
ScrollArea.Root = BaseScrollArea.Root;
ScrollArea.Viewport = BaseScrollArea.Viewport;
ScrollArea.Scrollbar = BaseScrollArea.Scrollbar;
ScrollArea.Thumb = BaseScrollArea.Thumb;
ScrollArea.Corner = BaseScrollArea.Corner;

export * from "./scroll-area.styles";
export * from "./scroll-area.types";
export * from "./scroll-area-context";
