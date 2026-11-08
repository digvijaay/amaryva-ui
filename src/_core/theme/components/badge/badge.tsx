import { Box } from "@mui/system";
import * as React from "react";
import type { BadgeProps } from "./badge.types";

// ----------------------------------------------------------------------

/**
 * Badge Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (error, primary, success, warning, paper)
 * - Supports dot indicator and standard count badges with overflow display (e.g. 99+)
 * - Deep slot customization via slots and slotProps
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      badgeContent,
      variant = "standard",
      color = "default",
      size = "medium",
      invisible = false,
      max = 99,
      showZero = false,
      overlap = "rectangular",
      anchorOrigin = { vertical: "top", horizontal: "right" },
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const RootComponent = slots?.root || "span";
    const BadgeComponent = slots?.badge || "span";

    const isZero = badgeContent === 0;
    const shouldHide =
      invisible ||
      (isZero && !showZero) ||
      (!badgeContent && variant !== "dot");

    // Display content with max clamping
    let displayContent: React.ReactNode = badgeContent;
    if (typeof badgeContent === "number" && max && badgeContent > max) {
      displayContent = `${max}+`;
    }

    const getColorStyles = () => {
      if (color === "inherit") {
        return {
          backgroundColor: "var(--theme-color-text-primary)",
          color: "var(--theme-color-background-paper)",
        };
      }
      if (color === "default") {
        return {
          backgroundColor: "var(--theme-color-grey-500, #919eab)",
          color: "#FFFFFF",
        };
      }
      return {
        backgroundColor: `var(--theme-color-${color}-main)`,
        color: `var(--theme-color-${color}-contrast-text, #FFFFFF)`,
      };
    };

    const sizeStyles = {
      small: {
        dot: { width: 6, height: 6 },
        standard: { height: 16, minWidth: 16, px: 0.5, fontSize: "0.6875rem" },
      },
      medium: {
        dot: { width: 8, height: 8 },
        standard: { height: 20, minWidth: 20, px: 0.75, fontSize: "0.75rem" },
      },
      large: {
        dot: { width: 10, height: 10 },
        standard: { height: 24, minWidth: 24, px: 1, fontSize: "0.8125rem" },
      },
    };

    // Position calculation
    const isTop = anchorOrigin.vertical === "top";
    const isRight = anchorOrigin.horizontal === "right";

    const getOffset = () => {
      if (overlap === "circular") {
        return {
          top: isTop ? "14%" : "auto",
          bottom: !isTop ? "14%" : "auto",
          right: isRight ? "14%" : "auto",
          left: !isRight ? "14%" : "auto",
          transform: `translate(${isRight ? "50%" : "-50%"}, ${isTop ? "-50%" : "50%"})`,
        };
      }
      return {
        top: isTop ? 0 : "auto",
        bottom: !isTop ? 0 : "auto",
        right: isRight ? 0 : "auto",
        left: !isRight ? 0 : "auto",
        transform: `translate(${isRight ? "50%" : "-50%"}, ${isTop ? "-50%" : "50%"})`,
      };
    };

    const badgeSx: Record<string, unknown> = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      fontWeight: 600,
      lineHeight: 1,
      whiteSpace: "nowrap",
      userSelect: "none",
      boxShadow: "0 0 0 2px var(--theme-color-background-paper)",
      transition: "transform 150ms ease, opacity 150ms ease",
      ...(children
        ? {
            position: "absolute",
            zIndex: 1,
            ...getOffset(),
          }
        : {
            position: "relative",
            transform: "none",
          }),
      ...(variant === "dot"
        ? {
            borderRadius: "50%",
            p: 0,
            ...sizeStyles[size].dot,
          }
        : sizeStyles[size].standard),
      ...getColorStyles(),
      ...(shouldHide && {
        opacity: 0,
        transform: "scale(0)",
        pointerEvents: "none",
      }),
      ...slotProps?.badge?.sx,
    };

    const badgeElement = (
      <Box
        component={BadgeComponent}
        sx={badgeSx}
        className={`inline-flex items-center justify-center font-semibold rounded-full select-none ${slotProps?.badge?.className || ""}`.trim()}
        {...slotProps?.badge}
      >
        {variant !== "dot" && displayContent}
      </Box>
    );

    if (!children) {
      return badgeElement;
    }

    const rootSx: Record<string, unknown> = {
      position: "relative",
      display: "inline-flex",
      verticalAlign: "middle",
      flexShrink: 0,
      ...sx,
      ...slotProps?.root?.sx,
    };

    return (
      <Box
        ref={ref}
        component={RootComponent}
        sx={rootSx}
        className={`relative inline-flex shrink-0 ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        {children}
        {badgeElement}
      </Box>
    );
  },
);

Badge.displayName = "Badge";

export * from "./badge.styles";
export * from "./badge.types";
export * from "./badge-context";
