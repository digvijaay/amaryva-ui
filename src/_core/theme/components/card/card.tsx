import { Box, type BoxProps } from "@mui/system";
import { motion } from "motion/react";
import * as React from "react";
import type {
  CardActionsProps,
  CardContentProps,
  CardHeaderProps,
  CardProps,
  CardVariant,
} from "./card.types";

// ----------------------------------------------------------------------

const MotionBox = motion.create(Box) as React.ElementType;

// ----------------------------------------------------------------------

/**
 * Card Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps directly to custom theme tokens (paper background, card shadow, dividers)
 * - Supports Tailwind CSS utilities via className
 * - Deep slot customization via slotProps
 * - Built-in motion animation and hover elevation transitions
 */
export const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      children,
      variant = "elevation",
      animated = false,
      hoverEffect = false,
      motionProps,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const Component = slots?.root || "div";

    const variantStyles: Record<CardVariant, Record<string, unknown>> = {
      elevation: {
        backgroundColor: "var(--theme-color-background-paper)",
        boxShadow: "var(--theme-shadow-card)",
        border: "1px solid var(--theme-color-divider)",
      },
      outlined: {
        backgroundColor: "var(--theme-color-background-paper)",
        border: "1px solid var(--theme-color-divider)",
        boxShadow: "none",
      },
      filled: {
        backgroundColor: "var(--theme-color-background-neutral)",
        border: "none",
        boxShadow: "none",
      },
    };

    const baseSx: Record<string, unknown> = {
      position: "relative",
      borderRadius: "16px",
      overflow: "hidden",
      transition:
        "box-shadow 0.25s ease-in-out, transform 0.25s ease-in-out, background-color 0.25s ease",
      ...variantStyles[variant],
      ...(hoverEffect &&
        !animated && {
          "&:hover": {
            boxShadow: "var(--theme-shadow-z8)",
            transform: "translateY(-4px)",
          },
        }),
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(slotProps?.root?.sx)
        ? slotProps.root.sx
        : [slotProps?.root?.sx]),
    ] as BoxProps["sx"];

    const combinedClassName =
      `flex flex-col rounded-2xl ${className || ""} ${slotProps?.root?.className || ""}`.trim();

    if (animated) {
      return (
        <MotionBox
          ref={ref}
          component={Component}
          sx={mergedSx}
          className={combinedClassName}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          whileHover={
            hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined
          }
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

Card.displayName = "Card";

export const CardContent = React.forwardRef<HTMLElement, CardContentProps>(
  ({ children, slots, slotProps, sx, className, ...other }, ref) => {
    const Component = slots?.root || "div";

    const baseSx: Record<string, unknown> = {
      p: 3,
      "&:last-child": {
        pb: 3,
      },
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(slotProps?.root?.sx)
        ? slotProps.root.sx
        : [slotProps?.root?.sx]),
    ] as BoxProps["sx"];

    return (
      <Box
        ref={ref}
        component={Component}
        sx={mergedSx}
        className={`p-6 ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        {children}
      </Box>
    );
  },
);

CardContent.displayName = "CardContent";

export const CardActions = React.forwardRef<HTMLElement, CardActionsProps>(
  (
    {
      children,
      disableSpacing = false,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const Component = slots?.root || "div";

    const baseSx: Record<string, unknown> = {
      display: "flex",
      alignItems: "center",
      p: 2,
      ...(!disableSpacing && {
        "& > :not(:first-of-type)": {
          ml: 1,
        },
      }),
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(slotProps?.root?.sx)
        ? slotProps.root.sx
        : [slotProps?.root?.sx]),
    ] as BoxProps["sx"];

    return (
      <Box
        ref={ref}
        component={Component}
        sx={mergedSx}
        className={`flex items-center p-4 ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        {children}
      </Box>
    );
  },
);

CardActions.displayName = "CardActions";

export const CardHeader = React.forwardRef<HTMLElement, CardHeaderProps>(
  (
    {
      title,
      subheader,
      avatar,
      action,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const RootComponent = slots?.root || "div";

    const baseSx: Record<string, unknown> = {
      display: "flex",
      alignItems: "center",
      p: 3,
      pb: 1,
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(slotProps?.root?.sx)
        ? slotProps.root.sx
        : [slotProps?.root?.sx]),
    ] as BoxProps["sx"];

    return (
      <Box
        ref={ref}
        component={RootComponent}
        sx={mergedSx}
        className={`flex items-center p-6 pb-2 ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        {avatar && (
          <Box
            sx={{
              display: "flex",
              flexShrink: 0,
              mr: 2,
              ...slotProps?.avatar?.sx,
            }}
            className={`flex shrink-0 mr-4 ${slotProps?.avatar?.className || ""}`.trim()}
            {...slotProps?.avatar}
          >
            {avatar}
          </Box>
        )}

        <Box sx={{ flex: "1 1 auto" }}>
          {title && (
            <Box
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: "1.125rem",
                color: "var(--theme-color-text-primary)",
                ...slotProps?.title?.sx,
              }}
              className={`font-semibold text-lg ${slotProps?.title?.className || ""}`.trim()}
              {...slotProps?.title}
            >
              {title}
            </Box>
          )}

          {subheader && (
            <Box
              component="div"
              sx={{
                fontSize: "0.875rem",
                color: "var(--theme-color-text-secondary)",
                mt: 0.5,
                ...slotProps?.subheader?.sx,
              }}
              className={`text-sm text-neutral-500 mt-1 ${slotProps?.subheader?.className || ""}`.trim()}
              {...slotProps?.subheader}
            >
              {subheader}
            </Box>
          )}
        </Box>

        {action && (
          <Box
            sx={{
              flexShrink: 0,
              ml: "auto",
              ...slotProps?.action?.sx,
            }}
            className={`shrink-0 ml-auto ${slotProps?.action?.className || ""}`.trim()}
            {...slotProps?.action}
          >
            {action}
          </Box>
        )}
      </Box>
    );
  },
);

CardHeader.displayName = "CardHeader";

export * from "./card.styles";
export * from "./card.types";
export * from "./card-context";
