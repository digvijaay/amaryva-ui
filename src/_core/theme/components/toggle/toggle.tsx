import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { Box } from "@mui/system";
import * as React from "react";
import type { ToggleProps } from "./toggle.types";

const sizePadding = {
  small: { px: 1.25, py: 0.5, fontSize: "0.8125rem", minHeight: 32 },
  medium: { px: 2, py: 1, fontSize: "0.875rem", minHeight: 40 },
  large: { px: 2.5, py: 1.25, fontSize: "0.9375rem", minHeight: 48 },
};

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed,
      defaultPressed,
      onPressedChange,
      disabled = false,
      value,
      variant = "outlined",
      color = "inherit",
      size = "medium",
      children,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const s = sizePadding[size] || sizePadding.medium;

    const activeColor =
      color === "inherit"
        ? "var(--theme-color-text-primary)"
        : `var(--theme-color-${color}-main, var(--theme-color-primary-main))`;

    const channelVar =
      color === "inherit"
        ? "--theme-color-text-primary-channel"
        : `--theme-color-${color}-main-channel`;

    const getVariantStyles = () => {
      switch (variant) {
        case "contained":
          return {
            backgroundColor:
              "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
            color: "var(--theme-color-text-primary)",
            "&[data-pressed]": {
              backgroundColor: activeColor,
              color:
                color === "inherit"
                  ? "var(--theme-color-background-paper)"
                  : "#FFFFFF",
            },
          };
        case "soft":
          return {
            backgroundColor: "transparent",
            color: "var(--theme-color-text-secondary)",
            "&[data-pressed]": {
              backgroundColor: `rgba(var(${channelVar}, 145 158 171) / 0.16)`,
              color: activeColor,
              fontWeight: 600,
            },
          };
        case "glass":
          return {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            color: "var(--theme-color-text-primary)",
            "&[data-pressed]": {
              backgroundColor: `rgba(var(${channelVar}, 145 158 171) / 0.24)`,
              borderColor: activeColor,
              color: activeColor,
            },
          };
        case "text":
          return {
            backgroundColor: "transparent",
            color: "var(--theme-color-text-secondary)",
            "&[data-pressed]": {
              color: activeColor,
              backgroundColor:
                "var(--theme-color-action-selected, rgba(145, 158, 171, 0.08))",
              fontWeight: 600,
            },
          };
        default:
          return {
            backgroundColor: "transparent",
            border:
              "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.24))",
            color: "var(--theme-color-text-primary)",
            "&[data-pressed]": {
              borderColor: activeColor,
              backgroundColor: `rgba(var(${channelVar}, 145 158 171) / 0.08)`,
              color: activeColor,
              fontWeight: 600,
            },
          };
      }
    };

    return (
      <BaseToggle
        pressed={pressed}
        defaultPressed={defaultPressed}
        onPressedChange={onPressedChange}
        disabled={disabled}
        value={value}
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
              borderRadius: "var(--theme-shape-borderRadius, 8px)",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.48 : 1,
              fontWeight: 500,
              px: s.px,
              py: s.py,
              fontSize: s.fontSize,
              minHeight: s.minHeight,
              transition: "all 150ms ease",
              outline: "none",
              "&:hover:not([disabled])": {
                backgroundColor:
                  "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
              },
              "&:focus-visible": {
                boxShadow: `0 0 0 3px rgba(var(${channelVar}, 0 167 111) / 0.24)`,
              },
              ...getVariantStyles(),
              ...sx,
            }}
            className={`inline-flex items-center justify-center font-medium select-none ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);

Toggle.displayName = "Toggle";

export * from "./toggle.styles";
export * from "./toggle.types";
export * from "./toggle-context";
