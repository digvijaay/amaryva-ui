import type { ButtonColor, ButtonSize, ButtonVariant } from "./button.types";

// ----------------------------------------------------------------------
// Size Styles
// ----------------------------------------------------------------------

export const sizeStyles: Record<ButtonSize, Record<string, unknown>> = {
  small: {
    height: "32px",
    px: 1.5,
    fontSize: "0.8125rem",
    borderRadius: "6px",
    gap: "6px",
  },
  medium: {
    height: "40px",
    px: 2,
    fontSize: "0.875rem",
    borderRadius: "8px",
    gap: "8px",
  },
  large: {
    height: "48px",
    px: 2.75,
    fontSize: "0.9375rem",
    borderRadius: "10px",
    gap: "10px",
  },
};

export const spinnerSizes: Record<ButtonSize, number> = {
  small: 14,
  medium: 18,
  large: 22,
};

// ----------------------------------------------------------------------
// Blur & Glass Styles
// ----------------------------------------------------------------------

export function getBlurStyles(
  blur: boolean | number | string | undefined,
  glass: boolean | undefined,
  variant: ButtonVariant,
): { isBlurActive: boolean; blurStyles: Record<string, unknown> } {
  const isBlurActive = Boolean(blur || glass || variant === "glass");
  const blurAmount =
    typeof blur === "number"
      ? `${blur}px`
      : typeof blur === "string"
        ? blur
        : "8px";

  const blurStyles: Record<string, unknown> = isBlurActive
    ? {
        backdropFilter: `blur(${blurAmount})`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
      }
    : {};

  return { isBlurActive, blurStyles };
}

// ----------------------------------------------------------------------
// Variant & Color Styles
// ----------------------------------------------------------------------

export function getVariantStyles(
  variant: ButtonVariant,
  color: ButtonColor,
  glass?: boolean,
): Record<string, unknown> {
  // 1. Contained (Solid)
  if (variant === "contained") {
    if (color === "inherit") {
      return {
        backgroundColor: "var(--theme-color-text-primary)",
        color: "var(--theme-color-background-paper)",
        border: "none",
        boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.16)",
        "&:hover": {
          backgroundColor: "var(--theme-color-grey-700)",
          "[data-color-scheme='dark'] &": {
            backgroundColor: "var(--theme-color-grey-300)",
          },
          ".dark &": {
            backgroundColor: "var(--theme-color-grey-300)",
          },
        },
      };
    }
    if (color === "transparent") {
      return {
        backgroundColor: "transparent",
        color: "var(--theme-color-text-primary)",
        border: "none",
        "&:hover": {
          backgroundColor: "var(--theme-color-action-hover)",
        },
      };
    }
    return {
      backgroundColor: `var(--theme-color-${color}-main)`,
      color: `var(--theme-color-${color}-contrast-text)`,
      border: "none",
      boxShadow: `var(--theme-shadow-${color}, none)`,
      "&:hover": {
        backgroundColor: `var(--theme-color-${color}-dark)`,
        boxShadow: `var(--theme-shadow-${color}, none)`,
      },
    };
  }

  // 2. Outlined
  if (variant === "outlined") {
    if (color === "inherit") {
      return {
        backgroundColor: "transparent",
        color: "var(--theme-color-text-primary)",
        border: "1px solid var(--theme-color-text-primary)",
        "&:hover": {
          backgroundColor: "var(--theme-color-action-hover)",
          borderColor: "var(--theme-color-text-primary)",
        },
      };
    }
    if (color === "transparent") {
      return {
        backgroundColor: "transparent",
        color: "var(--theme-color-text-primary)",
        border: "1px solid var(--theme-color-divider)",
        "&:hover": {
          backgroundColor: "var(--theme-color-action-hover)",
          borderColor: "var(--theme-color-text-primary)",
        },
      };
    }
    return {
      backgroundColor: "transparent",
      color: `var(--theme-color-${color}-main)`,
      border: `1px solid var(--theme-color-${color}-main)`,
      "&:hover": {
        backgroundColor: `rgba(var(--theme-color-${color}-main-channel) / 0.08)`,
        borderColor: `var(--theme-color-${color}-main)`,
      },
    };
  }

  // 3. Soft (Tinted / Translucent)
  if (variant === "soft") {
    if (color === "inherit") {
      return {
        backgroundColor:
          "rgba(var(--theme-color-grey-800-channel, 33 43 54) / 0.08)",
        color: "var(--theme-color-text-primary)",
        border: "none",
        "&:hover": {
          backgroundColor:
            "rgba(var(--theme-color-grey-800-channel, 33 43 54) / 0.16)",
        },
        "[data-color-scheme='dark'] &": {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.16)",
          },
        },
        ".dark &": {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.16)",
          },
        },
      };
    }
    if (color === "transparent") {
      return {
        backgroundColor: "var(--theme-color-action-selected)",
        color: "var(--theme-color-text-primary)",
        border: "none",
        "&:hover": {
          backgroundColor: "var(--theme-color-action-focus)",
        },
      };
    }
    return {
      backgroundColor: `rgba(var(--theme-color-${color}-main-channel) / 0.12)`,
      color: `var(--theme-color-${color}-main)`,
      border: "none",
      "&:hover": {
        backgroundColor: `rgba(var(--theme-color-${color}-main-channel) / 0.22)`,
      },
    };
  }

  // 4. Glass (Frosted Backdrop Blur)
  if (variant === "glass" || glass) {
    if (color === "inherit") {
      return {
        backgroundColor:
          "rgba(var(--theme-color-background-paper-channel, 255 255 255) / 0.7)",
        color: "var(--theme-color-text-primary)",
        border: "1px solid var(--theme-color-text-primary)",
        boxShadow: "0 4px 16px -2px rgba(0, 0, 0, 0.12)",
        "&:hover": {
          backgroundColor:
            "rgba(var(--theme-color-background-paper-channel, 255 255 255) / 0.88)",
        },
      };
    }
    if (color === "transparent") {
      return {
        backgroundColor:
          "rgba(var(--theme-color-background-paper-channel, 255 255 255) / 0.65)",
        color: "var(--theme-color-text-primary)",
        border: "1px solid var(--theme-color-divider)",
        boxShadow: "0 4px 16px -2px rgba(0, 0, 0, 0.08)",
        "&:hover": {
          backgroundColor:
            "rgba(var(--theme-color-background-paper-channel, 255 255 255) / 0.82)",
        },
      };
    }
    return {
      backgroundColor: `rgba(var(--theme-color-${color}-main-channel) / 0.16)`,
      color: `var(--theme-color-${color}-main)`,
      border: `1px solid rgba(var(--theme-color-${color}-main-channel) / 0.32)`,
      boxShadow: `0 4px 16px -2px rgba(var(--theme-color-${color}-main-channel) / 0.15)`,
      "&:hover": {
        backgroundColor: `rgba(var(--theme-color-${color}-main-channel) / 0.26)`,
        borderColor: `rgba(var(--theme-color-${color}-main-channel) / 0.5)`,
      },
    };
  }

  // 5. Text (Borderless)
  if (color === "inherit") {
    return {
      backgroundColor: "transparent",
      color: "var(--theme-color-text-primary)",
      border: "none",
      "&:hover": {
        backgroundColor: "var(--theme-color-action-hover)",
      },
    };
  }
  if (color === "transparent") {
    return {
      backgroundColor: "transparent",
      color: "inherit",
      border: "none",
      "&:hover": {
        backgroundColor: "var(--theme-color-action-hover)",
      },
    };
  }
  return {
    backgroundColor: "transparent",
    color: `var(--theme-color-${color}-main)`,
    border: "none",
    "&:hover": {
      backgroundColor: `rgba(var(--theme-color-${color}-main-channel) / 0.08)`,
    },
  };
}
