import { Box } from "@mui/system";
import * as React from "react";
import type { SpinnerProps } from "./spinner.types";

// ----------------------------------------------------------------------

/**
 * Spinner Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (primary, success, error, etc.)
 * - Smooth accessible circular or multi-dot loading indicator
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      size = "medium",
      color = "primary",
      thickness = 3.6,
      variant = "circular",
      label = "Loading...",
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const getSizeValue = (): number => {
      if (typeof size === "number") return size;
      switch (size) {
        case "small":
          return 18;
        case "large":
          return 36;
        default:
          return 24;
      }
    };

    const pxSize = getSizeValue();

    const getColorValue = () => {
      if (color === "inherit") return "currentColor";
      return `var(--theme-color-${color}-main)`;
    };

    if (variant === "dots") {
      const dotSize = Math.max(4, Math.round(pxSize / 3.5));
      return (
        <Box
          ref={ref}
          role="status"
          aria-label={label}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: `${dotSize * 0.75}px`,
            verticalAlign: "middle",
            "& > span": {
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              backgroundColor: getColorValue(),
              animation: "bouncingDots 1.4s infinite ease-in-out both",
            },
            "& > span:nth-of-type(1)": {
              animationDelay: "-0.32s",
            },
            "& > span:nth-of-type(2)": {
              animationDelay: "-0.16s",
            },
            "@keyframes bouncingDots": {
              "0%, 80%, 100%": {
                transform: "scale(0)",
                opacity: 0.4,
              },
              "40%": {
                transform: "scale(1)",
                opacity: 1,
              },
            },
            ...sx,
          }}
          className={`inline-flex items-center ${className || ""}`.trim()}
          {...other}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">{label}</span>
        </Box>
      );
    }

    return (
      <Box
        ref={ref}
        role="status"
        aria-label={label}
        sx={{
          display: "inline-flex",
          verticalAlign: "middle",
          width: pxSize,
          height: pxSize,
          color: getColorValue(),
          animation: "spinnerRotate 1.4s linear infinite",
          "@keyframes spinnerRotate": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
          "& svg": {
            display: "block",
            width: "100%",
            height: "100%",
          },
          "& circle": {
            stroke: "currentColor",
            strokeLinecap: "round",
            animation: "spinnerDash 1.4s ease-in-out infinite",
          },
          "@keyframes spinnerDash": {
            "0%": {
              strokeDasharray: "1px, 200px",
              strokeDashoffset: "0px",
            },
            "50%": {
              strokeDasharray: "100px, 200px",
              strokeDashoffset: "-15px",
            },
            "100%": {
              strokeDasharray: "100px, 200px",
              strokeDashoffset: "-125px",
            },
          },
          ...sx,
        }}
        className={`inline-flex shrink-0 ${className || ""}`.trim()}
        {...other}
      >
        <svg viewBox="22 22 44 44">
          <title>{label}</title>
          <circle
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            strokeWidth={thickness}
          />
        </svg>
        <span className="sr-only">{label}</span>
      </Box>
    );
  },
);

Spinner.displayName = "Spinner";

export * from "./spinner.styles";
export * from "./spinner.types";
export * from "./spinner-context";
