import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { ToggleGroupProps } from "./toggle-group.types";

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      orientation = "horizontal",
      exclusive = false,
      multiple,
      children,
      sx,
      className,
      slotProps,
      ...other
    },
    ref,
  ) => {
    const isMultiple = multiple !== undefined ? multiple : !exclusive;

    const baseSx: Record<string, unknown> = {
      display: "inline-flex",
      flexDirection: orientation === "horizontal" ? "row" : "column",
      gap: 0.5,
      p: 0.5,
      borderRadius: "var(--theme-shape-borderRadius, 8px)",
      backgroundColor:
        "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
      border: "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    return (
      <BaseToggleGroup
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        orientation={orientation}
        multiple={isMultiple}
        render={
          <Box
            ref={ref}
            sx={mergedRootSx}
            className={`inline-flex ${orientation === "horizontal" ? "flex-row items-center" : "flex-col"} ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          >
            {children}
          </Box>
        }
      />
    );
  },
);

ToggleGroup.displayName = "ToggleGroup";

export * from "./toggle-group.styles";
export * from "./toggle-group.types";
export * from "./toggle-group-context";
