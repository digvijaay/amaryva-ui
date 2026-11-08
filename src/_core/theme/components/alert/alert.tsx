import Box from "@mui/system/Box";
import * as React from "react";
import { getAlertVariantClasses } from "./alert.styles";
import type { AlertProps, AlertSeverity } from "./alert.types";
import { useAlertContext } from "./alert-context";

const severityIcons: Record<AlertSeverity, React.ReactNode> = {
  success: (
    <svg
      className="h-5 w-5 shrink-0 text-success-main"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <title>Success</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  info: (
    <svg
      className="h-5 w-5 shrink-0 text-info-main"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <title>Info</title>
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path strokeLinecap="round" strokeWidth={2} d="M12 16v-4m0-4h.01" />
    </svg>
  ),
  warning: (
    <svg
      className="h-5 w-5 shrink-0 text-warning-main"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <title>Warning</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg
      className="h-5 w-5 shrink-0 text-error-main"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <title>Error</title>
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path strokeLinecap="round" strokeWidth={2} d="M15 9l-6 6m0-6l6 6" />
    </svg>
  ),
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(
    {
      severity: severityProp,
      variant: variantProp,
      title,
      children,
      action,
      onClose,
      icon,
      className = "",
      sx,
      ...other
    },
    ref,
  ) {
    const context = useAlertContext();
    const severity = severityProp ?? context?.severity ?? "info";
    const variant = variantProp ?? context?.variant ?? "standard";

    const variantClasses = getAlertVariantClasses(variant, severity);

    return (
      <Box
        ref={ref}
        role="alert"
        className={`relative flex items-start gap-3 rounded-xl border p-4 text-sm transition-all ${variantClasses} ${className}`}
        sx={sx}
        {...other}
      >
        <div className="pt-0.5">{icon ?? severityIcons[severity]}</div>

        <div className="flex-1 space-y-1">
          {title && <div className="font-semibold leading-none">{title}</div>}
          <div className="text-xs sm:text-sm opacity-90">{children}</div>
        </div>

        {action && <div className="ml-auto pl-3">{action}</div>}

        {onClose && !action && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto -mr-1.5 -mt-1.5 rounded-lg p-1.5 opacity-70 hover:opacity-100"
            aria-label="Close alert"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Close</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </Box>
    );
  },
);

Alert.displayName = "Alert";

export * from "./alert.styles";
export * from "./alert.types";
export * from "./alert-context";
