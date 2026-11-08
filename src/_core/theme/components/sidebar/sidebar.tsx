import { Box } from "@mui/system";
import * as React from "react";
import { sidebarBaseStyles } from "./sidebar.styles";
import type {
  SidebarContentProps,
  SidebarContextValue,
  SidebarFooterProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarItemProps,
  SidebarProps,
  SidebarProviderProps,
  SidebarToggleProps,
} from "./sidebar.types";
import { SidebarContext, useSidebar } from "./sidebar-context";

export function SidebarProvider({
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  collapsedWidth = 72,
  expandedWidth = 260,
  children,
}: SidebarProviderProps) {
  const [openState, setOpenState] = React.useState(defaultOpen);
  const open = openProp !== undefined ? openProp : openState;

  const handleOpenChange = React.useCallback(
    (newVal: boolean) => {
      if (openProp === undefined) {
        setOpenState(newVal);
      }
      if (onOpenChange) {
        onOpenChange(newVal);
      }
    },
    [openProp, onOpenChange],
  );

  const toggleSidebar = React.useCallback(() => {
    handleOpenChange(!open);
  }, [handleOpenChange, open]);

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      open,
      setOpen: handleOpenChange,
      toggleSidebar,
      collapsedWidth,
      expandedWidth,
    }),
    [open, collapsedWidth, expandedWidth, handleOpenChange, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, sx, className, ...other }, ref) => {
    const { open, collapsedWidth, expandedWidth } = useSidebar();
    const currentWidth = open ? expandedWidth : collapsedWidth;

    const baseSx: Record<string, unknown> = {
      display: "flex",
      flexDirection: "column",
      width: currentWidth,
      minWidth: currentWidth,
      transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      overflow: "hidden",
      borderRight: "1px solid var(--theme-color-divider)",
      backgroundColor: "var(--theme-color-background-paper)",
      color: "var(--theme-color-text-primary)",
      ...sidebarBaseStyles,
      ...sx,
    };

    return (
      <Box
        ref={ref}
        component="aside"
        sx={baseSx}
        className={`relative flex flex-col h-full ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

Sidebar.displayName = "Sidebar";

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  SidebarHeaderProps
>(({ children, sx, className, ...other }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        borderBottom: "1px solid var(--theme-color-divider)",
        ...sx,
      }}
      className={`flex items-center shrink-0 ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  );
});

SidebarHeader.displayName = "SidebarHeader";

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  SidebarContentProps
>(({ children, sx, className, ...other }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        p: 1.5,
        ...sx,
      }}
      className={`flex-1 overflow-y-auto ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  );
});

SidebarContent.displayName = "SidebarContent";

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  SidebarFooterProps
>(({ children, sx, className, ...other }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        borderTop: "1px solid var(--theme-color-divider)",
        ...sx,
      }}
      className={`flex items-center shrink-0 mt-auto ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  );
});

SidebarFooter.displayName = "SidebarFooter";

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, children, sx, className, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          mb: 2,
          ...sx,
        }}
        className={`flex flex-col ${className || ""}`.trim()}
        {...other}
      >
        {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
        {children}
      </Box>
    );
  },
);

SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  SidebarGroupLabelProps
>(({ children, sx, className, ...other }, ref) => {
  const { open } = useSidebar();

  if (!open) return null;

  return (
    <Box
      ref={ref}
      sx={{
        px: 1.5,
        py: 0.5,
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "var(--theme-color-text-secondary)",
        ...sx,
      }}
      className={`select-none ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  );
});

SidebarGroupLabel.displayName = "SidebarGroupLabel";

export const SidebarItem = React.forwardRef<
  HTMLButtonElement,
  SidebarItemProps
>(
  (
    { icon, active = false, badge, label, children, sx, className, ...other },
    ref,
  ) => {
    const { open } = useSidebar();

    const baseSx: Record<string, unknown> = {
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      width: "100%",
      px: 1.5,
      py: 1,
      borderRadius: "8px",
      fontSize: "0.875rem",
      fontWeight: active ? 600 : 500,
      backgroundColor: active
        ? "var(--theme-color-action-selected)"
        : "transparent",
      color: active
        ? "var(--theme-color-primary-main)"
        : "var(--theme-color-text-primary)",
      cursor: "pointer",
      border: "none",
      outline: "none",
      transition: "background-color 150ms ease, color 150ms ease",
      "&:hover": {
        backgroundColor: active
          ? "var(--theme-color-action-selected)"
          : "var(--theme-color-action-hover)",
      },
      ...sx,
    };

    return (
      <Box
        ref={ref}
        component="button"
        sx={baseSx}
        className={`flex items-center text-left transition-colors ${className || ""}`.trim()}
        {...other}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: 20,
              height: 20,
            }}
          >
            {icon}
          </Box>
        )}
        {open && (
          <Box component="span" sx={{ flex: 1, whiteSpace: "nowrap" }}>
            {label || children}
          </Box>
        )}
        {open && badge && <Box component="span">{badge}</Box>}
      </Box>
    );
  },
);

SidebarItem.displayName = "SidebarItem";

function PanelLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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
      {...props}
    >
      <title>Toggle Sidebar</title>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

export const SidebarToggle = React.forwardRef<
  HTMLButtonElement,
  SidebarToggleProps
>(({ children, sx, className, ...other }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Box
      ref={ref}
      component="button"
      onClick={toggleSidebar}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1,
        borderRadius: "6px",
        backgroundColor: "transparent",
        color: "var(--theme-color-text-secondary)",
        border: "1px solid var(--theme-color-divider)",
        cursor: "pointer",
        transition: "background-color 150ms ease, color 150ms ease",
        "&:hover": {
          backgroundColor: "var(--theme-color-action-hover)",
          color: "var(--theme-color-text-primary)",
        },
        ...sx,
      }}
      className={`inline-flex items-center justify-center ${className || ""}`.trim()}
      {...other}
    >
      {children || <PanelLeftIcon />}
    </Box>
  );
});

SidebarToggle.displayName = "SidebarToggle";

export { useSidebar };
export * from "./sidebar.styles";
export * from "./sidebar.types";
export * from "./sidebar-context";
