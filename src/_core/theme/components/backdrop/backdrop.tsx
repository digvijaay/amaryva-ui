import { Box, type BoxProps } from "@mui/system";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import type { BackdropProps } from "./backdrop.types";

// ----------------------------------------------------------------------

const MotionBox = motion.create(Box) as React.ElementType;

// ----------------------------------------------------------------------
// Backdrop Component
// ----------------------------------------------------------------------

/**
 * Backdrop Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Motion AnimatePresence entrance & exit transitions
 * - Configurable backdrop-filter blur effect via `blur` prop (default: 8px)
 * - Deep slot customization via slots and slotProps
 * - Designed for modals, drawers, dialogs, and full-screen loading overlays
 */
export const Backdrop = React.forwardRef<HTMLElement, BackdropProps>(
  (
    {
      children,
      open = false,
      blur = true,
      invisible = false,
      transitionDuration = 300,
      zIndex = 1200,
      motionProps,
      slots,
      slotProps,
      sx,
      className,
      onClick,
      ...other
    },
    ref,
  ) => {
    const Component = slots?.root || MotionBox;

    const blurValue =
      blur === true
        ? "8px"
        : typeof blur === "number"
          ? `${blur}px`
          : typeof blur === "string"
            ? blur
            : "none";

    const baseSx: Record<string, unknown> = {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex,
      backgroundColor: invisible ? "transparent" : "rgba(15, 23, 42, 0.45)",
      backdropFilter: blur ? `blur(${blurValue})` : "none",
      WebkitBackdropFilter: blur ? `blur(${blurValue})` : "none",
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none !important",
      },
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(slotProps?.root?.sx)
        ? slotProps.root.sx
        : [slotProps?.root?.sx]),
    ] as BoxProps["sx"];

    const combinedClassName =
      `fixed inset-0 flex items-center justify-center ${blur ? "backdrop-blur-sm" : ""} ${className || ""} ${slotProps?.root?.className || ""}`.trim();

    return (
      <AnimatePresence>
        {open && (
          <MotionBox
            ref={ref}
            component={Component}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: transitionDuration / 1000,
              ease: "easeInOut",
            }}
            sx={mergedSx}
            className={combinedClassName}
            onClick={onClick}
            {...(motionProps as Record<string, unknown>)}
            {...other}
            {...slotProps?.root}
          >
            {children}
          </MotionBox>
        )}
      </AnimatePresence>
    );
  },
);

Backdrop.displayName = "Backdrop";

export * from "./backdrop.styles";
export * from "./backdrop.types";
export * from "./backdrop-context";
