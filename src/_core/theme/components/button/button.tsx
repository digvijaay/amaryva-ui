import { Button as BaseButton } from "@base-ui/react/button";
import { Box, type BoxProps } from "@mui/system";
import { motion } from "motion/react";
import * as React from "react";
import { useButtonGroup } from "../button-group/button-group-context";
import {
  getBlurStyles,
  getVariantStyles,
  sizeStyles,
  spinnerSizes,
} from "./button.styles";
import type { ButtonProps, ButtonSize } from "./button.types";
import { useButtonContext } from "./button-context";

// ----------------------------------------------------------------------

const MotionBox = motion.create(Box) as React.ElementType;

// Circular Spinner for Loading State
function SpinnerIcon({
  size = 18,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="animate-spin"
      aria-hidden="true"
      {...props}
    >
      <title>Loading</title>
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// Button Component
// ----------------------------------------------------------------------

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      children,
      variant: variantProp,
      color: colorProp,
      size: sizeProp,
      disabled: disabledProp = false,
      loading = false,
      loadingIndicator,
      loadingPosition = "center",
      startIcon,
      endIcon,
      fullWidth: fullWidthProp = false,
      animated = true,
      disableHoverY = false,
      disableHoverEffect = false,
      blur = false,
      glass = false,
      focusableWhenDisabled = false,
      motionProps,
      slots,
      slotProps,
      sx,
      className,
      type = "button",
      ...other
    },
    ref,
  ) => {
    const buttonGroup = useButtonGroup();
    const variant = variantProp ?? buttonGroup.variant ?? "contained";
    const color = colorProp ?? buttonGroup.color ?? "primary";
    const size = sizeProp ?? buttonGroup.size ?? "medium";
    const disabled = disabledProp || buttonGroup.disabled || false;
    const fullWidth = fullWidthProp || buttonGroup.fullWidth || false;

    const Component = slots?.root || "button";
    const isDisabled = disabled || loading;

    // Backdrop blur styles
    const { isBlurActive, blurStyles } = getBlurStyles(blur, glass, variant);

    const baseSx: Record<string, unknown> = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      outline: "none",
      cursor: isDisabled ? "not-allowed" : "pointer",
      userSelect: "none",
      verticalAlign: "middle",
      appearance: "none",
      textDecoration: "none",
      fontWeight: 600,
      lineHeight: 1.5,
      position: "relative",
      transition:
        "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1), border-color 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease, backdrop-filter 200ms ease",
      width: fullWidth ? "100%" : "auto",
      ...sizeStyles[size as ButtonSize],
      ...getVariantStyles(variant, color, glass),
      ...blurStyles,
      "&:focus-visible": {
        ring: "2px",
        ringColor: `var(--theme-color-${color === "inherit" || color === "transparent" ? "text-primary" : color}-main)`,
        ringOffset: "2px",
      },
      "&[data-disabled]": {
        opacity: 0.48,
        pointerEvents: "none",
        boxShadow: "none",
      },
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none !important",
        transform: "none !important",
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
      `inline-flex items-center justify-center font-semibold select-none transition-colors ${isBlurActive ? "backdrop-blur-md" : ""} ${fullWidth ? "w-full" : ""} ${className || ""} ${slotProps?.root?.className || ""}`.trim();

    // Default Spinner
    const spinner = loadingIndicator || (
      <SpinnerIcon size={spinnerSizes[size as ButtonSize]} />
    );

    const buttonContext = useButtonContext();
    const shouldDisableHoverY =
      disableHoverY ||
      disableHoverEffect ||
      buttonContext.disableHoverY ||
      false;

    const renderProps = animated ? (
      <MotionBox
        ref={ref}
        component={Component}
        type={type}
        sx={mergedSx}
        className={combinedClassName}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        whileHover={
          !isDisabled && !shouldDisableHoverY ? { translateY: -1 } : undefined
        }
        transition={{ duration: 0.12, ease: "easeOut" }}
        {...(motionProps as Record<string, unknown>)}
        {...other}
        {...slotProps?.root}
      />
    ) : (
      <Box
        ref={ref}
        component={Component}
        type={type}
        sx={mergedSx}
        className={combinedClassName}
        {...other}
        {...slotProps?.root}
      />
    );

    return (
      <BaseButton
        disabled={isDisabled}
        focusableWhenDisabled={focusableWhenDisabled}
        render={renderProps}
      >
        {/* Loading Indicator at Start */}
        {loading && loadingPosition === "start" && (
          <Box
            component={slots?.loadingIndicator || "span"}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1,
              ...slotProps?.loadingIndicator?.sx,
            }}
            className={`inline-flex items-center justify-center shrink-0 ${slotProps?.loadingIndicator?.className || ""}`.trim()}
            {...slotProps?.loadingIndicator}
          >
            {spinner}
          </Box>
        )}

        {/* Start Icon (shown when not loading or loading is not at start) */}
        {!loading || loadingPosition !== "start"
          ? startIcon && (
              <Box
                component={slots?.startIcon || "span"}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  ...slotProps?.startIcon?.sx,
                }}
                className={`inline-flex items-center justify-center shrink-0 ${slotProps?.startIcon?.className || ""}`.trim()}
                {...slotProps?.startIcon}
              >
                {startIcon}
              </Box>
            )
          : null}

        {/* Main Content (hidden with opacity when loading is centered) */}
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            opacity: loading && loadingPosition === "center" ? 0 : 1,
            transition: "opacity 150ms ease",
          }}
        >
          {children}
        </Box>

        {/* Loading Indicator at Center */}
        {loading && loadingPosition === "center" && (
          <Box
            component={slots?.loadingIndicator || "span"}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...slotProps?.loadingIndicator?.sx,
            }}
            className={`absolute inset-0 flex items-center justify-center ${slotProps?.loadingIndicator?.className || ""}`.trim()}
            {...slotProps?.loadingIndicator}
          >
            {spinner}
          </Box>
        )}

        {/* End Icon */}
        {!loading || loadingPosition !== "end"
          ? endIcon && (
              <Box
                component={slots?.endIcon || "span"}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  ...slotProps?.endIcon?.sx,
                }}
                className={`inline-flex items-center justify-center shrink-0 ${slotProps?.endIcon?.className || ""}`.trim()}
                {...slotProps?.endIcon}
              >
                {endIcon}
              </Box>
            )
          : null}

        {/* Loading Indicator at End */}
        {loading && loadingPosition === "end" && (
          <Box
            component={slots?.loadingIndicator || "span"}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              ml: 1,
              ...slotProps?.loadingIndicator?.sx,
            }}
            className={`inline-flex items-center justify-center shrink-0 ${slotProps?.loadingIndicator?.className || ""}`.trim()}
            {...slotProps?.loadingIndicator}
          >
            {spinner}
          </Box>
        )}
      </BaseButton>
    );
  },
);

Button.displayName = "Button";

export * from "./button.styles";
export * from "./button.styles";
export * from "./button.types";

export * from "./button.types";
export * from "./button-context";
export * from "./button-context";
