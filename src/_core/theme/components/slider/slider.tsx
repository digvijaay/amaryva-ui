import { Slider as BaseSlider } from "@base-ui/react/slider";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { SliderProps } from "./slider.types";

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      color = "primary",
      size = "medium",
      label,
      showValue = false,
      sx,
      className,
      slotProps,
      ...other
    },
    ref,
  ) => {
    const trackHeight = size === "small" ? 4 : 6;
    const thumbSize = size === "small" ? 14 : 18;

    const activeColor =
      color === "inherit"
        ? "var(--theme-color-text-primary)"
        : `var(--theme-color-${color}-main, var(--theme-color-primary-main))`;

    const channelVar =
      color === "inherit"
        ? "--theme-color-text-primary-channel"
        : `--theme-color-${color}-main-channel`;

    const baseSx: Record<string, unknown> = {
      display: "flex",
      flexDirection: "column",
      gap: 1,
      width: "100%",
      userSelect: "none",
      touchAction: "none",
      opacity: disabled ? 0.48 : 1,
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    return (
      <BaseSlider.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        render={
          <Box
            ref={ref}
            sx={mergedRootSx}
            className={`w-full flex flex-col select-none touch-none ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          >
            {(label || showValue) && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--theme-color-text-primary)",
                }}
              >
                {label && <BaseSlider.Label>{label}</BaseSlider.Label>}
                {showValue && (
                  <BaseSlider.Value
                    render={
                      <Box
                        component="span"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--theme-color-text-secondary)",
                          ...slotProps?.value?.sx,
                        }}
                        {...slotProps?.value}
                      />
                    }
                  />
                )}
              </Box>
            )}

            <BaseSlider.Control
              render={
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: 24,
                    cursor: disabled ? "not-allowed" : "pointer",
                    ...slotProps?.control?.sx,
                  }}
                  className={`relative flex items-center w-full ${slotProps?.control?.className || ""}`.trim()}
                  {...slotProps?.control}
                >
                  <BaseSlider.Track
                    render={
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: trackHeight,
                          borderRadius: trackHeight / 2,
                          backgroundColor: "rgba(145, 158, 171, 0.24)",
                          overflow: "hidden",
                          ...slotProps?.track?.sx,
                        }}
                        className={`relative w-full rounded-full overflow-hidden ${slotProps?.track?.className || ""}`.trim()}
                        {...slotProps?.track}
                      >
                        <BaseSlider.Indicator
                          render={
                            <Box
                              sx={{
                                height: "100%",
                                backgroundColor: activeColor,
                                ...slotProps?.indicator?.sx,
                              }}
                              className={`h-full ${slotProps?.indicator?.className || ""}`.trim()}
                              {...slotProps?.indicator}
                            />
                          }
                        />
                      </Box>
                    }
                  />

                  <BaseSlider.Thumb
                    render={
                      <Box
                        sx={{
                          width: thumbSize,
                          height: thumbSize,
                          borderRadius: "50%",
                          backgroundColor: activeColor,
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                          outline: "none",
                          transition:
                            "box-shadow 150ms ease, transform 150ms ease",
                          cursor: disabled ? "not-allowed" : "grab",
                          "&:active": {
                            cursor: "grabbing",
                            transform: "scale(1.15)",
                          },
                          "&:focus-visible": {
                            boxShadow: `0 0 0 4px rgba(var(${channelVar}, 0 167 111) / 0.24)`,
                          },
                          ...slotProps?.thumb?.sx,
                        }}
                        className={`rounded-full outline-none shrink-0 ${slotProps?.thumb?.className || ""}`.trim()}
                        {...slotProps?.thumb}
                      />
                    }
                  />
                </Box>
              }
            />
          </Box>
        }
      />
    );
  },
);

Slider.displayName = "Slider";

export * from "./slider.styles";
export * from "./slider.types";
export * from "./slider-context";
