import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { Box } from "@mui/system";
import * as React from "react";
import type { SwitchProps } from "./switch.types";

const sizeConfig = {
  small: {
    trackWidth: 32,
    trackHeight: 18,
    thumbSize: 14,
    thumbOffset: 2,
    translateX: 14,
  },
  medium: {
    trackWidth: 44,
    trackHeight: 24,
    thumbSize: 18,
    thumbOffset: 3,
    translateX: 20,
  },
  large: {
    trackWidth: 52,
    trackHeight: 28,
    thumbSize: 22,
    thumbOffset: 3,
    translateX: 24,
  },
};

export const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      disabled = false,
      color = "primary",
      size = "medium",
      label,
      name,
      value,
      sx,
      className,
      slotProps,
      ...other
    },
    ref,
  ) => {
    const config = sizeConfig[size] || sizeConfig.medium;

    const getActiveColor = () => {
      if (color === "inherit") {
        return "var(--theme-color-text-primary)";
      }
      return `var(--theme-color-${color}-main, var(--theme-color-primary-main))`;
    };

    const getThumbColor = () => {
      if (color === "inherit") {
        return "var(--theme-color-background-paper)";
      }
      return "#FFFFFF";
    };

    const trackSx: Record<string, unknown> = {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      boxSizing: "border-box",
      width: config.trackWidth,
      height: config.trackHeight,
      borderRadius: config.trackHeight / 2,
      backgroundColor:
        "var(--theme-color-action-disabled-background, rgba(145, 158, 171, 0.24))",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.48 : 1,
      border: "none",
      padding: 0,
      transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      outline: "none",
      "&:focus-visible": {
        boxShadow: `0 0 0 3px rgba(var(--theme-color-${color === "inherit" ? "grey" : color}-main-channel, 0 167 111) / 0.24)`,
      },
      "&[data-checked]": {
        backgroundColor: getActiveColor(),
      },
      ...sx,
      ...slotProps?.root?.sx,
    };

    const thumbSx: Record<string, unknown> = {
      position: "absolute",
      left: config.thumbOffset,
      width: config.thumbSize,
      height: config.thumbSize,
      borderRadius: "50%",
      backgroundColor: getThumbColor(),
      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
      transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      "&[data-checked]": {
        transform: `translateX(${config.translateX}px)`,
      },
      ...slotProps?.thumb?.sx,
    };

    const content = (
      <BaseSwitch.Root
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        value={value}
        render={
          <Box
            component="span"
            ref={ref}
            sx={trackSx}
            className={`relative inline-flex items-center shrink-0 cursor-pointer ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          >
            <BaseSwitch.Thumb
              render={
                <Box
                  sx={thumbSx}
                  className={`rounded-full shrink-0 ${slotProps?.thumb?.className || ""}`.trim()}
                  {...slotProps?.thumb}
                />
              }
            />
          </Box>
        }
      />
    );

    if (!label) {
      return content;
    }

    return (
      <Box
        component="label"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1.5,
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
          ...slotProps?.label?.sx,
        }}
        className={`inline-flex items-center gap-2 select-none ${slotProps?.label?.className || ""}`.trim()}
      >
        {content}
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

Switch.displayName = "Switch";

export * from "./switch.styles";
export * from "./switch.types";
export * from "./switch-context";
