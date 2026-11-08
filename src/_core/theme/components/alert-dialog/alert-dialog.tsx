import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { Button } from "../button";
import { Typography } from "../typography";
import type {
  AlertDialogBackdropProps,
  AlertDialogProps,
  AlertDialogSeverity,
} from "./alert-dialog.types";

// ----------------------------------------------------------------------
// Status Icons
// ----------------------------------------------------------------------

function AlertTriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <title>Warning</title>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function AlertOctagonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <title>Error</title>
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <title>Information</title>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <title>Success</title>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function getSeverityIcon(severity?: AlertDialogSeverity) {
  switch (severity) {
    case "error":
      return <AlertOctagonIcon />;
    case "warning":
      return <AlertTriangleIcon />;
    case "success":
      return <CheckCircleIcon />;
    case "info":
      return <InfoIcon />;
    default:
      return null;
  }
}

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const AlertDialogRoot = BaseAlertDialog.Root;
export const AlertDialogTrigger = BaseAlertDialog.Trigger;
export const AlertDialogPortal = BaseAlertDialog.Portal;
export const AlertDialogClose = BaseAlertDialog.Close;

export const AlertDialogBackdrop = React.forwardRef<
  HTMLDivElement,
  AlertDialogBackdropProps
>(({ blur = true, sx, className, ...other }, ref) => {
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
    inset: 0,
    zIndex: 1200,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    backdropFilter: blur ? `blur(${blurValue})` : "none",
    WebkitBackdropFilter: blur ? `blur(${blurValue})` : "none",
    opacity: 1,
    transition: "opacity 200ms ease",
    "&[data-starting-style]": {
      opacity: 0,
    },
    "&[data-ending-style]": {
      opacity: 0,
    },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none !important",
    },
  };

  const mergedSx = [
    baseSx,
    ...(Array.isArray(sx) ? sx : [sx]),
  ] as BoxProps["sx"];

  return (
    <BaseAlertDialog.Backdrop
      render={
        <Box
          ref={ref}
          sx={mergedSx}
          className={`fixed inset-0 z-50 ${blur ? "backdrop-blur-sm" : ""} ${className || ""}`.trim()}
          {...other}
        />
      }
    />
  );
});

AlertDialogBackdrop.displayName = "AlertDialogBackdrop";

// --- Viewport ---
export const AlertDialogViewport = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, ...other }, ref) => {
    const baseSx: Record<string, unknown> = {
      position: "fixed",
      inset: 0,
      zIndex: 1200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: 2,
      overflowY: "auto",
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
    ] as BoxProps["sx"];

    return (
      <BaseAlertDialog.Viewport
        render={
          <Box
            ref={ref}
            sx={mergedSx}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto ${className || ""}`.trim()}
            {...other}
          />
        }
      />
    );
  },
);

AlertDialogViewport.displayName = "AlertDialogViewport";

// --- Popup / Content Container ---
export const AlertDialogPopup = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, sx, className, ...other }, ref) => {
    const baseSx: Record<string, unknown> = {
      position: "relative",
      width: "100%",
      maxWidth: "460px",
      backgroundColor: "var(--theme-color-background-paper)",
      borderRadius: "16px",
      border: "1px solid var(--theme-color-divider)",
      boxShadow:
        "var(--theme-shadow-dialog, 0 24px 48px -12px rgba(0, 0, 0, 0.24))",
      p: 3,
      outline: "none",
      opacity: 1,
      transform: "scale(1)",
      transition:
        "transform 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease",
      "&[data-starting-style]": {
        opacity: 0,
        transform: "scale(0.95)",
      },
      "&[data-ending-style]": {
        opacity: 0,
        transform: "scale(0.95)",
      },
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none !important",
        transform: "none !important",
      },
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
    ] as BoxProps["sx"];

    return (
      <BaseAlertDialog.Popup
        render={
          <Box
            ref={ref}
            sx={mergedSx}
            className={`relative w-full max-w-md bg-paper rounded-2xl border border-divider p-6 shadow-2xl outline-none ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);

AlertDialogPopup.displayName = "AlertDialogPopup";

// --- Header ---
export const AlertDialogHeader = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, sx, className, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mb: 2,
          ...sx,
        }}
        className={`flex flex-col gap-2 mb-4 ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

AlertDialogHeader.displayName = "AlertDialogHeader";

// --- Title ---
export const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, BoxProps>(
  ({ children, sx, className, ...other }, ref) => {
    return (
      <BaseAlertDialog.Title
        render={
          <Typography
            ref={ref}
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 700,
              color: "var(--theme-color-text-primary)",
              ...sx,
            }}
            className={`text-lg font-bold text-text-primary ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Typography>
        }
      />
    );
  },
);

AlertDialogTitle.displayName = "AlertDialogTitle";

// --- Description ---
export const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  BoxProps
>(({ children, sx, className, ...other }, ref) => {
  return (
    <BaseAlertDialog.Description
      render={
        <Typography
          ref={ref}
          variant="body2"
          component="p"
          sx={{
            color: "var(--theme-color-text-secondary)",
            lineHeight: 1.6,
            ...sx,
          }}
          className={`text-sm text-text-secondary leading-relaxed ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Typography>
      }
    />
  );
});

AlertDialogDescription.displayName = "AlertDialogDescription";

// --- Actions / Footer ---
export const AlertDialogActions = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, sx, className, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 1.5,
          mt: 3,
          ...sx,
        }}
        className={`flex items-center justify-end gap-3 mt-6 ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

AlertDialogActions.displayName = "AlertDialogActions";

// ----------------------------------------------------------------------
// Main Composed AlertDialog Component
// ----------------------------------------------------------------------

/**
 * AlertDialog Component
 *
 * Implements AGENTS.md guidelines:
 * - Powered by @base-ui/react AlertDialog for accessible WAI-ARIA alertdialog patterns
 * - Extends @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (paper, divider, shadows, severity colors)
 * - Backdrop blur effect and smooth cubic-bezier zoom/fade animations
 * - Deep slot customization via slots and slotProps
 * - Supports both compound subcomponents and declarative title/description/action props
 */
export function AlertDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  severity,
  icon,
  confirmText = "Confirm",
  confirmColor = "primary",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  blur = true,
  maxWidth = 460,
  slots,
  slotProps,
  children,
}: AlertDialogProps) {
  // If compound children are provided without title, render compound architecture
  const hasDeclarativeContent = Boolean(title || description);
  const statusIcon = icon || getSeverityIcon(severity);

  const severityColorStyles: Record<
    AlertDialogSeverity,
    { bg: string; text: string }
  > = {
    error: {
      bg: "rgba(var(--theme-color-error-main-channel) / 0.12)",
      text: "var(--theme-color-error-main)",
    },
    warning: {
      bg: "rgba(var(--theme-color-warning-main-channel) / 0.12)",
      text: "var(--theme-color-warning-main)",
    },
    info: {
      bg: "rgba(var(--theme-color-info-main-channel) / 0.12)",
      text: "var(--theme-color-info-main)",
    },
    success: {
      bg: "rgba(var(--theme-color-success-main-channel) / 0.12)",
      text: "var(--theme-color-success-main)",
    },
  };

  const BackdropComponent = slots?.backdrop || AlertDialogBackdrop;
  const PopupComponent = slots?.popup || AlertDialogPopup;
  const HeaderComponent = slots?.header || AlertDialogHeader;
  const TitleComponent = slots?.title || AlertDialogTitle;
  const DescriptionComponent = slots?.description || AlertDialogDescription;
  const ActionsComponent = slots?.actions || AlertDialogActions;

  return (
    <BaseAlertDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && (
        <BaseAlertDialog.Trigger
          render={
            React.isValidElement(trigger) ? (
              trigger
            ) : (
              <Button variant="contained">{trigger}</Button>
            )
          }
        />
      )}

      <BaseAlertDialog.Portal>
        <BackdropComponent
          blur={blur}
          sx={slotProps?.backdrop?.sx}
          className={slotProps?.backdrop?.className}
        />

        <AlertDialogViewport>
          <PopupComponent
            sx={{ maxWidth, ...slotProps?.popup?.sx }}
            className={slotProps?.popup?.className}
          >
            {hasDeclarativeContent ? (
              <>
                <HeaderComponent
                  sx={slotProps?.header?.sx}
                  className={slotProps?.header?.className}
                >
                  {statusIcon && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        mb: 1,
                        backgroundColor: severity
                          ? severityColorStyles[severity].bg
                          : "var(--theme-color-action-selected)",
                        color: severity
                          ? severityColorStyles[severity].text
                          : "var(--theme-color-primary-main)",
                      }}
                      className="flex items-center justify-center w-12 h-12 rounded-xl mb-2"
                    >
                      {statusIcon}
                    </Box>
                  )}

                  {title && (
                    <TitleComponent
                      sx={slotProps?.title?.sx}
                      className={slotProps?.title?.className}
                    >
                      {title}
                    </TitleComponent>
                  )}

                  {description && (
                    <DescriptionComponent
                      sx={slotProps?.description?.sx}
                      className={slotProps?.description?.className}
                    >
                      {description}
                    </DescriptionComponent>
                  )}
                </HeaderComponent>

                {children}

                <ActionsComponent
                  sx={slotProps?.actions?.sx}
                  className={slotProps?.actions?.className}
                >
                  {cancelText && (
                    <BaseAlertDialog.Close
                      render={
                        <Button
                          variant="outlined"
                          color="inherit"
                          onClick={onCancel}
                        >
                          {cancelText}
                        </Button>
                      }
                    />
                  )}

                  <Button
                    variant="contained"
                    color={
                      severity === "error"
                        ? "error"
                        : severity === "warning"
                          ? "warning"
                          : confirmColor
                    }
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </Button>
                </ActionsComponent>
              </>
            ) : (
              children
            )}
          </PopupComponent>
        </AlertDialogViewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}

export * from "./alert-dialog.styles";
export * from "./alert-dialog.types";
export * from "./alert-dialog-context";
