import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { RadioGroupProps, RadioProps } from "./radio-group.types";

const radioSizeConfig = {
  small: { outer: 16, inner: 6 },
  medium: { outer: 20, inner: 8 },
  large: { outer: 24, inner: 10 },
};

export const Radio = React.forwardRef<HTMLSpanElement, RadioProps>(
  (
    {
      value,
      disabled = false,
      color = "primary",
      size = "medium",
      label,
      sx,
      className,
      slotProps,
      ...other
    },
    ref,
  ) => {
    const config = radioSizeConfig[size] || radioSizeConfig.medium;

    const activeColor =
      color === "inherit"
        ? "var(--theme-color-text-primary)"
        : `var(--theme-color-${color}-main, var(--theme-color-primary-main))`;

    const channelVar =
      color === "inherit"
        ? "--theme-color-text-primary-channel"
        : `--theme-color-${color}-main-channel`;

    const baseRadioSx: Record<string, unknown> = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: config.outer,
      height: config.outer,
      borderRadius: "50%",
      border: "2px solid var(--theme-color-divider, rgba(145, 158, 171, 0.32))",
      backgroundColor: "transparent",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.48 : 1,
      padding: 0,
      outline: "none",
      transition: "border-color 150ms ease, box-shadow 150ms ease",
      "&:focus-visible": {
        boxShadow: `0 0 0 3px rgba(var(${channelVar}, 0 167 111) / 0.24)`,
      },
      "&[data-checked]": {
        borderColor: activeColor,
      },
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRadioSx = [
      baseRadioSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    const radioElement = (
      <BaseRadio.Root
        value={value}
        disabled={disabled}
        render={
          <Box
            component="span"
            ref={ref}
            sx={mergedRadioSx}
            className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          >
            <BaseRadio.Indicator
              render={
                <Box
                  sx={{
                    width: config.inner,
                    height: config.inner,
                    borderRadius: "50%",
                    backgroundColor: activeColor,
                    transition: "transform 150ms ease, opacity 150ms ease",
                    transform: "scale(1)",
                    opacity: 1,
                    "&[data-starting-style], &[data-ending-style]": {
                      transform: "scale(0)",
                      opacity: 0,
                    },
                    ...slotProps?.indicator?.sx,
                  }}
                  className={`rounded-full ${slotProps?.indicator?.className || ""}`.trim()}
                  {...slotProps?.indicator}
                />
              }
            />
          </Box>
        }
      />
    );

    if (!label) {
      return radioElement;
    }

    return (
      <Box
        component="label"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1.25,
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
          ...slotProps?.label?.sx,
        }}
        className={`inline-flex items-center gap-2 select-none ${slotProps?.label?.className || ""}`.trim()}
      >
        {radioElement}
        <Box
          component="span"
          sx={{
            fontSize: size === "small" ? "0.8125rem" : "0.875rem",
            color: disabled
              ? "var(--theme-color-text-disabled)"
              : "var(--theme-color-text-primary)",
            fontWeight: 500,
          }}
        >
          {label}
        </Box>
      </Box>
    );
  },
);

Radio.displayName = "Radio";

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
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
      <BaseRadioGroup
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

RadioGroup.displayName = "RadioGroup";

export * from "./radio-group.styles";
export * from "./radio-group.types";
export * from "./radio-group-context";
