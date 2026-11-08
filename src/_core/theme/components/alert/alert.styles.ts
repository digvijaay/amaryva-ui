import type { AlertSeverity, AlertVariant } from "./alert.types";

// ----------------------------------------------------------------------
// Alert Styles
// ----------------------------------------------------------------------

export function getAlertVariantClasses(
  variant: AlertVariant = "standard",
  severity: AlertSeverity = "info",
): string {
  if (variant === "standard") {
    switch (severity) {
      case "success":
        return "bg-success-main/10 text-success-dark border-success-main/20";
      case "warning":
        return "bg-warning-main/10 text-warning-dark border-warning-main/20";
      case "error":
        return "bg-error-main/10 text-error-dark border-error-main/20";
      default:
        return "bg-info-main/10 text-info-dark border-info-main/20";
    }
  }

  if (variant === "outlined") {
    switch (severity) {
      case "success":
        return "border-success-main text-success-main bg-transparent";
      case "warning":
        return "border-warning-main text-warning-main bg-transparent";
      case "error":
        return "border-error-main text-error-main bg-transparent";
      default:
        return "border-info-main text-info-main bg-transparent";
    }
  }

  // filled
  switch (severity) {
    case "success":
      return "bg-success-main text-white";
    case "warning":
      return "bg-warning-main text-white";
    case "error":
      return "bg-error-main text-white";
    default:
      return "bg-info-main text-white";
  }
}
