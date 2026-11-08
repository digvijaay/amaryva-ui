import { Box, type BoxProps } from "@mui/system";
import { motion } from "motion/react";
import * as React from "react";
import { typography } from "../../core/typography";
import type { TypographyVariant } from "../../types";
import type { TypographyColor, TypographyProps } from "./typography.types";

// ----------------------------------------------------------------------

const MotionBox = motion.create(Box) as React.ElementType;

// ----------------------------------------------------------------------

const defaultVariantMapping: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
  button: "span",
};

function getColorValue(color?: TypographyColor): string | undefined {
  if (!color || color === "inherit") return undefined;
  switch (color) {
    case "primary":
      return "var(--theme-color-primary-main)";
    case "secondary":
      return "var(--theme-color-secondary-main)";
    case "textPrimary":
      return "var(--theme-color-text-primary)";
    case "textSecondary":
      return "var(--theme-color-text-secondary)";
    case "textDisabled":
      return "var(--theme-color-text-disabled)";
    case "error":
      return "var(--theme-color-error-main)";
    case "warning":
      return "var(--theme-color-warning-main)";
    case "info":
      return "var(--theme-color-info-main)";
    case "success":
      return "var(--theme-color-success-main)";
    default:
      return color;
  }
}

// ----------------------------------------------------------------------

/**
 * Typography Component
 *
 * Implements AGENTS.md guidelines:
 * - Extends @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (typography variant rules, theme CSS variables)
 * - Supports Tailwind CSS utilities via className
 * - Provides slotProps for sub-element styling customization
 * - Supports motion animation integration
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      variant = "body1",
      component,
      color = "inherit",
      align = "inherit",
      noWrap = false,
      gutterBottom = false,
      animated = false,
      motionProps,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const Component =
      component ||
      slots?.root ||
      defaultVariantMapping[variant as TypographyVariant] ||
      "p";

    const variantStyle =
      (typography[variant] as Record<string, unknown>) || typography.body1;
    const colorValue = getColorValue(color);

    const baseSx: Record<string, unknown> = {
      margin: 0,
      ...variantStyle,
      ...(colorValue && { color: colorValue }),
      ...(align !== "inherit" && { textAlign: align }),
      ...(noWrap && {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }),
      ...(gutterBottom && { marginBottom: "0.35em" }),
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(slotProps?.root?.sx)
        ? slotProps.root.sx
        : [slotProps?.root?.sx]),
    ] as BoxProps["sx"];

    const combinedClassName =
      `${className || ""} ${slotProps?.root?.className || ""}`.trim();

    if (animated) {
      return (
        <MotionBox
          ref={ref}
          component={Component}
          sx={mergedSx}
          className={combinedClassName}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          {...motionProps}
          {...other}
          {...slotProps?.root}
        >
          {children}
        </MotionBox>
      );
    }

    return (
      <Box
        ref={ref}
        component={Component}
        sx={mergedSx}
        className={combinedClassName}
        {...other}
        {...slotProps?.root}
      >
        {children}
      </Box>
    );
  },
);

Typography.displayName = "Typography";

export * from "./typography.styles";
export * from "./typography.types";
export * from "./typography-context";
