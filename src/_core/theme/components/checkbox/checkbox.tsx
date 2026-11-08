import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { CheckboxProps } from "./checkbox.types";

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

const sizeConfig = {
  small: { box: 16, icon: 12, radius: 4 },
  medium: { box: 20, icon: 14, radius: 5 },
  large: { box: 24, icon: 16, radius: 6 },
};

export const Checkbox = React.forwardRef<HTMLSpanElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      indeterminate,
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

    const activeColor =
      color === "inherit"
        ? "var(--theme-color-text-primary)"
        : `var(--theme-color-${color}-main, var(--theme-color-primary-main))`;

    const channelVar =
      color === "inherit"
        ? "--theme-color-text-primary-channel"
        : `--theme-color-${color}-main-channel`;

    const baseBoxSx: Record<string, unknown> = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: config.box,
      height: config.box,
      borderRadius: `${config.radius}px`,
      border: "2px solid var(--theme-color-divider, rgba(145, 158, 171, 0.32))",
      backgroundColor: "transparent",
      color:
        color === "inherit" ? "var(--theme-color-background-paper)" : "#FFFFFF",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.48 : 1,
      padding: 0,
      outline: "none",
      transition:
        "background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
      "&:focus-visible": {
        boxShadow: `0 0 0 3px rgba(var(${channelVar}, 0 167 111) / 0.24)`,
      },
      "&[data-checked], &[data-indeterminate]": {
        backgroundColor: activeColor,
        borderColor: activeColor,
      },
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseBoxSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    const checkboxElement = (
      <BaseCheckbox.Root
        checked={checked}
        defaultChecked={defaultChecked}
        indeterminate={indeterminate}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        value={value}
        render={
          <Box
            component="span"
            ref={ref}
            sx={mergedRootSx}
            className={`inline-flex items-center justify-center shrink-0 cursor-pointer ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          >
            <BaseCheckbox.Indicator
              render={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    ...slotProps?.indicator?.sx,
                  }}
                  className={`flex items-center justify-center ${slotProps?.indicator?.className || ""}`.trim()}
                  {...slotProps?.indicator}
                >
                  {indeterminate ? (
                    <MinusIcon width={config.icon} height={config.icon} />
                  ) : (
                    <CheckIcon width={config.icon} height={config.icon} />
                  )}
                </Box>
              }
            />
          </Box>
        }
      />
    );

    if (!label) {
      return checkboxElement;
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
        {checkboxElement}
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

Checkbox.displayName = "Checkbox";

export * from "./checkbox.styles";
export * from "./checkbox.types";
export * from "./checkbox-context";
