import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { Button } from "../button";
import type {
  DialogBackdropProps,
  DialogPopupProps,
  DialogProps,
} from "./dialog.types";

// ----------------------------------------------------------------------

function CloseXIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <title>Close</title>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export const DialogBackdrop = React.forwardRef<
  HTMLDivElement,
  DialogBackdropProps
>(({ sx, className, blur = true, blurValue = "4px", ...other }, ref) => {
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
    <BaseDialog.Backdrop
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
DialogBackdrop.displayName = "DialogBackdrop";

const maxWidthMap = {
  xs: "360px",
  sm: "460px",
  md: "580px",
  lg: "720px",
  xl: "900px",
  full: "calc(100vw - 32px)",
};

export const DialogPopup = React.forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ sx, className, maxWidth = "md", children, ...other }, ref) => {
    const baseSx: Record<string, unknown> = {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1201,
      width: "calc(100% - 32px)",
      maxWidth: maxWidthMap[maxWidth] || maxWidthMap.md,
      backgroundColor: "var(--theme-color-background-paper)",
      borderRadius: "16px",
      border: "1px solid var(--theme-color-divider)",
      boxShadow:
        "var(--theme-shadow-dialog, 0 24px 48px -12px rgba(0,0,0,0.25))",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      outline: "none",
      opacity: 1,
      transition:
        "opacity 200ms ease, transform 200ms cubic-bezier(0.16, 1, 0.3, 1)",
      "&[data-starting-style]": {
        opacity: 0,
        transform: "translate(-50%, -46%) scale(0.97)",
      },
      "&[data-ending-style]": {
        opacity: 0,
        transform: "translate(-50%, -46%) scale(0.97)",
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
      <BaseDialog.Popup
        render={
          <Box
            ref={ref}
            sx={mergedSx}
            className={`fixed top-1/2 left-1/2 z-50 flex flex-col ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
DialogPopup.displayName = "DialogPopup";

export const DialogTitle = React.forwardRef<HTMLHeadingElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    const baseSx: Record<string, unknown> = {
      margin: 0,
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.4,
      color: "var(--theme-color-text-primary)",
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
    ] as BoxProps["sx"];

    return (
      <BaseDialog.Title
        render={
          <Box
            component="h2"
            ref={ref}
            sx={mergedSx}
            className={`text-lg font-semibold tracking-tight ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  BoxProps
>(({ sx, className, children, ...other }, ref) => {
  const baseSx: Record<string, unknown> = {
    margin: 0,
    fontSize: "0.875rem",
    lineHeight: 1.5,
    color: "var(--theme-color-text-secondary)",
  };

  const mergedSx = [
    baseSx,
    ...(Array.isArray(sx) ? sx : [sx]),
  ] as BoxProps["sx"];

  return (
    <BaseDialog.Description
      render={
        <Box
          component="p"
          ref={ref}
          sx={mergedSx}
          className={`text-sm leading-relaxed ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Box>
      }
    />
  );
});
DialogDescription.displayName = "DialogDescription";

export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  Omit<BoxProps, "color">
>(({ sx, className, children, ...other }, ref) => {
  return (
    <BaseDialog.Close
      render={
        <Button
          ref={ref}
          variant="text"
          color="inherit"
          size="small"
          sx={{
            minWidth: "auto",
            p: 0.75,
            borderRadius: "50%",
            ...sx,
          }}
          className={className}
          {...other}
        >
          {children || <CloseXIcon />}
        </Button>
      }
    />
  );
});
DialogClose.displayName = "DialogClose";

export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  trigger,
  children,
  actions,
  maxWidth = "md",
  blurBackdrop = true,
  showCloseButton = true,
  slotProps,
}: DialogProps) {
  return (
    <BaseDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...slotProps?.root}
    >
      {trigger && <BaseDialog.Trigger render={trigger as React.ReactElement} />}

      <BaseDialog.Portal>
        <DialogBackdrop blur={blurBackdrop} {...slotProps?.backdrop} />

        <DialogPopup maxWidth={maxWidth} {...slotProps?.popup}>
          {(title || showCloseButton) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                mb: description ? 0.5 : 0,
              }}
            >
              {title && (
                <DialogTitle {...slotProps?.title}>{title}</DialogTitle>
              )}
              {showCloseButton && (
                <Box sx={{ ml: "auto" }}>
                  <DialogClose {...slotProps?.close} />
                </Box>
              )}
            </Box>
          )}

          {description && (
            <DialogDescription {...slotProps?.description}>
              {description}
            </DialogDescription>
          )}

          {children}

          {actions && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1.5,
                mt: 1,
              }}
            >
              {actions}
            </Box>
          )}
        </DialogPopup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

// ----------------------------------------------------------------------
// Compound Exports
// ----------------------------------------------------------------------

Dialog.Root = BaseDialog.Root;
Dialog.Trigger = BaseDialog.Trigger;
Dialog.Portal = BaseDialog.Portal;
Dialog.Backdrop = DialogBackdrop;
Dialog.Popup = DialogPopup;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;

export * from "./dialog.styles";
export * from "./dialog.types";
export * from "./dialog-context";
