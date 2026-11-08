import { Progress as BaseProgress } from "@base-ui/react/progress";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { ProgressProps } from "./progress.types";

const heightMap = {
  small: 4,
  medium: 8,
  large: 12,
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = null,
      max = 100,
      min = 0,
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
    const height =
      typeof size === "number" ? size : heightMap[size] || heightMap.medium;

    const activeColor =
      color === "inherit"
        ? "var(--theme-color-text-primary)"
        : `var(--theme-color-${color}-main, var(--theme-color-primary-main))`;

    const baseSx: Record<string, unknown> = {
      display: "flex",
      flexDirection: "column",
      gap: 1,
      width: "100%",
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    return (
      <BaseProgress.Root
        value={value ?? null}
        max={max}
        min={min}
        render={
          <Box
            ref={ref}
            sx={mergedRootSx}
            className={`w-full flex flex-col ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
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
                {label && (
                  <BaseProgress.Label
                    render={
                      <Box
                        component="span"
                        sx={slotProps?.label?.sx}
                        className={slotProps?.label?.className}
                        {...slotProps?.label}
                      >
                        {label}
                      </Box>
                    }
                  />
                )}
                {showValue && (
                  <BaseProgress.Value
                    render={
                      <Box
                        component="span"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--theme-color-text-secondary)",
                          ...slotProps?.value?.sx,
                        }}
                        className={slotProps?.value?.className}
                        {...slotProps?.value}
                      />
                    }
                  />
                )}
              </Box>
            )}

            <BaseProgress.Track
              render={
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height,
                    borderRadius: height / 2,
                    backgroundColor: "rgba(145, 158, 171, 0.2)",
                    overflow: "hidden",
                    ...slotProps?.track?.sx,
                  }}
                  className={`relative w-full overflow-hidden ${slotProps?.track?.className || ""}`.trim()}
                  {...slotProps?.track}
                >
                  <BaseProgress.Indicator
                    render={
                      <Box
                        sx={{
                          height: "100%",
                          backgroundColor: activeColor,
                          borderRadius: height / 2,
                          transition:
                            "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
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
          </Box>
        }
      />
    );
  },
) as unknown as React.ForwardRefExoticComponent<
  ProgressProps & React.RefAttributes<HTMLDivElement>
> & {
  Root: typeof BaseProgress.Root;
  Track: typeof BaseProgress.Track;
  Indicator: typeof BaseProgress.Indicator;
  Label: typeof BaseProgress.Label;
  Value: typeof BaseProgress.Value;
};

Progress.displayName = "Progress";
Progress.Root = BaseProgress.Root;
Progress.Track = BaseProgress.Track;
Progress.Indicator = BaseProgress.Indicator;
Progress.Label = BaseProgress.Label;
Progress.Value = BaseProgress.Value;

export * from "./progress.styles";
export * from "./progress.types";
export * from "./progress-context";
