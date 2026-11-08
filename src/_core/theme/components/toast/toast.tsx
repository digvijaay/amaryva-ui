import { Toast as BaseToast } from "@base-ui/react/toast";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { Button } from "../button";
import type {
  ToastPosition,
  ToastProps,
  ToastSeverity,
  ToastViewportProps,
} from "./toast.types";

const ToastContext = React.createContext<{ isBaseRoot: boolean }>({
  isBaseRoot: false,
});

function CloseXIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
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

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export interface ToastRootProps extends BoxProps {
  severity?: ToastSeverity;
  toast?: Parameters<typeof BaseToast.Root>[0]["toast"];
}

export const ToastRoot = React.forwardRef<HTMLDivElement, ToastRootProps>(
  ({ severity = "default", toast, sx, className, children, ...other }, ref) => {
    const getSeverityStyles = () => {
      switch (severity) {
        case "success":
          return {
            borderLeft: "4px solid var(--theme-color-success-main)",
          };
        case "error":
          return {
            borderLeft: "4px solid var(--theme-color-error-main)",
          };
        case "warning":
          return {
            borderLeft: "4px solid var(--theme-color-warning-main)",
          };
        case "info":
          return {
            borderLeft: "4px solid var(--theme-color-info-main)",
          };
        default:
          return {};
      }
    };

    const baseSx: Record<string, unknown> = {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 1.5,
      width: "100%",
      maxWidth: 380,
      p: 2,
      borderRadius: "10px",
      backgroundColor: "var(--theme-color-background-paper)",
      border: "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
      boxShadow:
        "var(--theme-shadow-dropdown, 0 16px 32px -4px rgba(0,0,0,0.18))",
      color: "var(--theme-color-text-primary)",
      userSelect: "none",
      outline: "none",
      transition: "transform 200ms ease, opacity 200ms ease",
      opacity: 1,
      transform: "translateY(0) scale(1)",
      "&[data-starting-style]": {
        opacity: 0,
        transform: "translateY(16px) scale(0.95)",
      },
      "&[data-ending-style]": {
        opacity: 0,
        transform: "translateY(16px) scale(0.95)",
      },
      ...getSeverityStyles(),
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
    ] as BoxProps["sx"];

    const content = (
      <Box
        ref={ref}
        sx={mergedSx}
        className={`flex items-start justify-between ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );

    if (toast) {
      return (
        <ToastContext.Provider value={{ isBaseRoot: true }}>
          <BaseToast.Root toast={toast} render={content} />
        </ToastContext.Provider>
      );
    }

    return (
      <ToastContext.Provider value={{ isBaseRoot: false }}>
        {content}
      </ToastContext.Provider>
    );
  },
);
ToastRoot.displayName = "ToastRoot";

export const ToastTitle = React.forwardRef<HTMLHeadingElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    const { isBaseRoot } = React.useContext(ToastContext);

    const baseSx: Record<string, unknown> = {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.4,
      color: "var(--theme-color-text-primary)",
      m: 0,
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
    ] as BoxProps["sx"];

    const titleEl = (
      <Box
        component="h3"
        ref={ref}
        sx={mergedSx}
        className={`font-semibold m-0 ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );

    if (isBaseRoot) {
      return <BaseToast.Title render={titleEl} />;
    }

    return titleEl;
  },
);
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  BoxProps
>(({ sx, className, children, ...other }, ref) => {
  const { isBaseRoot } = React.useContext(ToastContext);

  const baseSx: Record<string, unknown> = {
    fontSize: "0.8125rem",
    color: "var(--theme-color-text-secondary)",
    lineHeight: 1.5,
    mt: 0.5,
    m: 0,
  };

  const mergedSx = [
    baseSx,
    ...(Array.isArray(sx) ? sx : [sx]),
  ] as BoxProps["sx"];

  const descEl = (
    <Box
      component="p"
      ref={ref}
      sx={mergedSx}
      className={`text-sm ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  );

  if (isBaseRoot) {
    return <BaseToast.Description render={descEl} />;
  }

  return descEl;
});
ToastDescription.displayName = "ToastDescription";

export const ToastClose = React.forwardRef<
  HTMLButtonElement,
  Omit<BoxProps, "color">
>(({ sx, className, children, ...other }, ref) => {
  const { isBaseRoot } = React.useContext(ToastContext);

  const closeBtn = (
    <Button
      ref={ref}
      variant="text"
      color="inherit"
      size="small"
      sx={{
        minWidth: "auto",
        p: 0.5,
        borderRadius: "50%",
        color: "var(--theme-color-text-disabled)",
        "&:hover": {
          color: "var(--theme-color-text-primary)",
        },
        ...sx,
      }}
      className={className}
      {...other}
    >
      {children || <CloseXIcon />}
    </Button>
  );

  if (isBaseRoot) {
    return <BaseToast.Close render={closeBtn} />;
  }

  return closeBtn;
});
ToastClose.displayName = "ToastClose";

const positionStyles: Record<ToastPosition, Record<string, unknown>> = {
  "top-left": { top: 16, left: 16 },
  "top-center": { top: 16, left: "50%", transform: "translateX(-50%)" },
  "top-right": { top: 16, right: 16 },
  "bottom-left": { bottom: 16, left: 16 },
  "bottom-center": { bottom: 16, left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: 16, right: 16 },
};

export const ToastViewport = React.forwardRef<
  HTMLDivElement,
  ToastViewportProps
>(
  (
    { position = "bottom-right", layout = "stack", sx, className, ...other },
    ref,
  ) => {
    return (
      <BaseToast.Viewport
        render={
          <Box
            ref={ref}
            sx={{
              position: "fixed",
              zIndex: 1400,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              outline: "none",
              ...positionStyles[position],
              ...sx,
            }}
            className={`fixed z-50 flex flex-col gap-2 ${className || ""}`.trim()}
            {...other}
          />
        }
      />
    );
  },
);
ToastViewport.displayName = "ToastViewport";

// ----------------------------------------------------------------------
// High-Level Composed Toast
// ----------------------------------------------------------------------

export function Toast({
  title,
  description,
  severity = "default",
  action,
  showClose = true,
  closeText = "Dismiss",
  layout = "stack",
  toast,
  slotProps,
}: ToastProps) {
  return (
    <ToastRoot
      severity={severity}
      toast={toast}
      data-layout={layout}
      {...slotProps?.root}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {title && <ToastTitle {...slotProps?.title}>{title}</ToastTitle>}
        {description && (
          <ToastDescription {...slotProps?.description}>
            {description}
          </ToastDescription>
        )}
        {action && <Box sx={{ mt: 1 }}>{action}</Box>}
      </Box>

      {showClose && <ToastClose aria-label={closeText} {...slotProps?.close} />}
    </ToastRoot>
  );
}

Toast.Provider = BaseToast.Provider;
Toast.Root = ToastRoot;
Toast.Title = ToastTitle;
Toast.Description = ToastDescription;
Toast.Close = ToastClose;
Toast.Action = BaseToast.Action;
Toast.Viewport = ToastViewport;
Toast.Portal = BaseToast.Portal;
Toast.useToastManager = BaseToast.useToastManager;
Toast.createToastManager = BaseToast.createToastManager;

export * from "./toast.styles";
export * from "./toast.types";
export * from "./toast-context";
