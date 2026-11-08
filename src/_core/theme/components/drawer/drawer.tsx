import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { Button } from "../button";
import type {
  DrawerAnchor,
  DrawerBackdropProps,
  DrawerPopupProps,
  DrawerProps,
  DrawerViewportProps,
} from "./drawer.types";

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

export const DrawerBackdrop = React.forwardRef<
  HTMLDivElement,
  DrawerBackdropProps
>(({ sx, className, blur = true, blurValue = "4px", ...other }, ref) => {
  const baseSx: Record<string, unknown> = {
    position: "fixed",
    inset: 0,
    zIndex: 1200,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    backdropFilter: blur ? `blur(${blurValue})` : "none",
    WebkitBackdropFilter: blur ? `blur(${blurValue})` : "none",
    opacity: 1,
    transition: "opacity 250ms ease",
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
    <BaseDrawer.Backdrop
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
DrawerBackdrop.displayName = "DrawerBackdrop";

export const DrawerViewport = React.forwardRef<
  HTMLDivElement,
  DrawerViewportProps
>(({ sx, className, children, ...other }, ref) => {
  const baseSx: Record<string, unknown> = {
    position: "fixed",
    inset: 0,
    zIndex: 1201,
  };

  const mergedSx = [
    baseSx,
    ...(Array.isArray(sx) ? sx : [sx]),
  ] as BoxProps["sx"];

  return (
    <BaseDrawer.Viewport
      render={
        <Box
          ref={ref}
          sx={mergedSx}
          className={`fixed inset-0 z-50 ${className || ""}`.trim()}
          {...other}
        />
      }
    >
      {children}
    </BaseDrawer.Viewport>
  );
});
DrawerViewport.displayName = "DrawerViewport";

const getAnchorStyles = (
  anchor: DrawerAnchor,
  width?: string | number,
  height?: string | number,
) => {
  switch (anchor) {
    case "left":
      return {
        top: 0,
        bottom: 0,
        left: 0,
        width: width || 320,
        maxWidth: "85vw",
        height: "100%",
        transform: "translateX(0)",
        "&[data-starting-style]": {
          transform: "translateX(-100%)",
        },
        "&[data-ending-style]": {
          transform: "translateX(-100%)",
        },
      };
    case "top":
      return {
        top: 0,
        left: 0,
        right: 0,
        height: height || 320,
        maxHeight: "85vh",
        width: "100%",
        transform: "translateY(0)",
        "&[data-starting-style]": {
          transform: "translateY(-100%)",
        },
        "&[data-ending-style]": {
          transform: "translateY(-100%)",
        },
      };
    case "bottom":
      return {
        bottom: 0,
        left: 0,
        right: 0,
        height: height || 320,
        maxHeight: "85vh",
        width: "100%",
        transform: "translateY(0)",
        "&[data-starting-style]": {
          transform: "translateY(100%)",
        },
        "&[data-ending-style]": {
          transform: "translateY(100%)",
        },
      };
    default:
      return {
        top: 0,
        bottom: 0,
        right: 0,
        width: width || 320,
        maxWidth: "85vw",
        height: "100%",
        transform: "translateX(0)",
        "&[data-starting-style]": {
          transform: "translateX(100%)",
        },
        "&[data-ending-style]": {
          transform: "translateX(100%)",
        },
      };
  }
};

export const DrawerPopup = React.forwardRef<HTMLDivElement, DrawerPopupProps>(
  (
    { sx, className, anchor = "right", width, height, children, ...other },
    ref,
  ) => {
    const anchorStyles = getAnchorStyles(anchor, width, height);

    const baseSx: Record<string, unknown> = {
      position: "fixed",
      zIndex: 1201,
      backgroundColor: "var(--theme-color-background-paper)",
      borderLeft:
        anchor === "right" ? "1px solid var(--theme-color-divider)" : undefined,
      borderRight:
        anchor === "left" ? "1px solid var(--theme-color-divider)" : undefined,
      borderTop:
        anchor === "bottom"
          ? "1px solid var(--theme-color-divider)"
          : undefined,
      borderBottom:
        anchor === "top" ? "1px solid var(--theme-color-divider)" : undefined,
      boxShadow:
        "var(--theme-shadow-dialog, 0 24px 48px -12px rgba(0,0,0,0.25))",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      outline: "none",
      transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      ...anchorStyles,
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none !important",
      },
    };

    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
    ] as BoxProps["sx"];

    return (
      <BaseDrawer.Popup
        render={
          <Box
            ref={ref}
            sx={mergedSx}
            className={`fixed z-50 flex flex-col ${className || ""}`.trim()}
            {...other}
          />
        }
      >
        {children}
      </BaseDrawer.Popup>
    );
  },
);
DrawerPopup.displayName = "DrawerPopup";

export const DrawerTitle = React.forwardRef<HTMLHeadingElement, BoxProps>(
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
      <BaseDrawer.Title
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
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.forwardRef<
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
    <BaseDrawer.Description
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
DrawerDescription.displayName = "DrawerDescription";

export const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  Omit<BoxProps, "color">
>(({ sx, className, children, ...other }, ref) => {
  return (
    <BaseDrawer.Close
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
DrawerClose.displayName = "DrawerClose";

export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  anchor = "right",
  width,
  height,
  title,
  description,
  trigger,
  children,
  actions,
  blurBackdrop = true,
  showCloseButton = true,
  slotProps,
}: DrawerProps) {
  return (
    <BaseDrawer.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...slotProps?.root}
    >
      {trigger && <BaseDrawer.Trigger render={trigger as React.ReactElement} />}

      <BaseDrawer.Portal>
        <DrawerBackdrop blur={blurBackdrop} {...slotProps?.backdrop} />

        <DrawerViewport {...slotProps?.viewport}>
          <DrawerPopup
            anchor={anchor}
            width={width}
            height={height}
            {...slotProps?.popup}
          >
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
                  <DrawerTitle {...slotProps?.title}>{title}</DrawerTitle>
                )}
                {showCloseButton && (
                  <Box sx={{ ml: "auto" }}>
                    <DrawerClose {...slotProps?.close} />
                  </Box>
                )}
              </Box>
            )}

            {description && (
              <DrawerDescription {...slotProps?.description}>
                {description}
              </DrawerDescription>
            )}

            <Box sx={{ flex: 1, overflowY: "auto", my: 1 }}>{children}</Box>

            {actions && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 1.5,
                  mt: "auto",
                  pt: 2,
                  borderTop: "1px solid var(--theme-color-divider)",
                }}
              >
                {actions}
              </Box>
            )}
          </DrawerPopup>
        </DrawerViewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  );
}

// ----------------------------------------------------------------------
// Compound Exports
// ----------------------------------------------------------------------

Drawer.Root = BaseDrawer.Root;
Drawer.Trigger = BaseDrawer.Trigger;
Drawer.Portal = BaseDrawer.Portal;
Drawer.Backdrop = DrawerBackdrop;
Drawer.Viewport = DrawerViewport;
Drawer.Popup = DrawerPopup;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;
Drawer.Close = DrawerClose;

export * from "./drawer.styles";
export * from "./drawer.types";
export * from "./drawer-context";
