import { Box } from "@mui/system";
import * as React from "react";
import type { SkeletonProps } from "./skeleton.types";

// ----------------------------------------------------------------------

/**
 * Skeleton Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps directly to custom theme tokens for seamless light/dark loading placeholders
 * - Supports pulse and wave animations across 4 geometry variants
 */
export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  (
    {
      variant = "text",
      animation = "pulse",
      width,
      height,
      children,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const hasChildren = Boolean(children);

    const getVariantStyles = () => {
      switch (variant) {
        case "text":
          return {
            height: "auto",
            transformOrigin: "0 55%",
            transform: "scale(1, 0.6)",
            borderRadius: "var(--theme-shape-borderRadius, 4px)",
            "&:empty:before": {
              content: '"\\00a0"',
            },
          };
        case "circular":
          return {
            borderRadius: "50%",
          };
        case "rounded":
          return {
            borderRadius: "var(--theme-shape-borderRadius, 8px)",
          };
        default:
          return {
            borderRadius: 0,
          };
      }
    };

    const getAnimationStyles = () => {
      if (animation === "pulse") {
        return {
          "@keyframes pulse": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.4 },
          },
          animation: "pulse 1.8s ease-in-out 0.5s infinite",
        };
      }
      if (animation === "wave") {
        return {
          position: "relative",
          overflow: "hidden",
          "&::after": {
            animation: "wave 1.6s linear 0.5s infinite",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent)",
            content: '""',
            position: "absolute",
            transform: "translateX(-100%)",
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
          },
          "@keyframes wave": {
            "0%": { transform: "translateX(-100%)" },
            "100%": { transform: "translateX(100%)" },
          },
        };
      }
      return {};
    };

    const baseSx: Record<string, unknown> = {
      display: "block",
      backgroundColor:
        "var(--theme-color-action-hover, rgba(145, 158, 171, 0.12))",
      height: height || (variant === "text" ? undefined : "1.2em"),
      width: width || (variant === "text" && !hasChildren ? "100%" : undefined),
      ...getVariantStyles(),
      ...getAnimationStyles(),
      ...(hasChildren && {
        "& > *": {
          visibility: "hidden",
        },
      }),
      ...sx,
    };

    return (
      <Box
        ref={ref}
        component="span"
        sx={baseSx}
        className={`block select-none ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

Skeleton.displayName = "Skeleton";

export * from "./skeleton.styles";
export * from "./skeleton.types";
export * from "./skeleton-context";
