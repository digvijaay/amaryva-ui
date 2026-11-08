import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { CheckboxGroupProps } from "./checkbox-group.types";

export const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      orientation = "vertical",
      label,
      children,
      sx,
      className,
      slotProps,
      ...other
    },
    ref,
  ) => {
    const baseSx: Record<string, unknown> = {
      display: "flex",
      flexDirection: "column",
      gap: 1,
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    return (
      <BaseCheckboxGroup
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        render={
          <Box
            ref={ref}
            sx={mergedRootSx}
            className={`flex flex-col ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          >
            {label && (
              <Box
                component="span"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--theme-color-text-primary)",
                  ...slotProps?.label?.sx,
                }}
                className={`font-semibold ${slotProps?.label?.className || ""}`.trim()}
                {...slotProps?.label}
              >
                {label}
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: orientation === "horizontal" ? "row" : "column",
                flexWrap: orientation === "horizontal" ? "wrap" : "nowrap",
                gap: orientation === "horizontal" ? 2.5 : 1.5,
                ...slotProps?.group?.sx,
              }}
              className={`flex ${orientation === "horizontal" ? "flex-row flex-wrap gap-5" : "flex-col gap-3"} ${slotProps?.group?.className || ""}`.trim()}
              {...slotProps?.group}
            >
              {children}
            </Box>
          </Box>
        }
      />
    );
  },
);

CheckboxGroup.displayName = "CheckboxGroup";

export * from "./checkbox-group.styles";
export * from "./checkbox-group.types";
export * from "./checkbox-group-context";
