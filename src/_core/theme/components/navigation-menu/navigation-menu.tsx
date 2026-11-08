import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { NavigationMenuProps } from "./navigation-menu.types";

// ----------------------------------------------------------------------

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const NavigationMenuList = React.forwardRef<HTMLUListElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <BaseNavigationMenu.List
        render={
          <Box
            component="ul"
            ref={ref}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              listStyle: "none",
              margin: 0,
              padding: 0,
              ...sx,
            }}
            className={`flex items-center gap-1 list-none m-0 p-0 ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = React.forwardRef<HTMLLIElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <BaseNavigationMenu.Item
        render={
          <Box
            component="li"
            ref={ref}
            sx={{ listStyle: "none", ...sx }}
            className={`list-none ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
NavigationMenuItem.displayName = "NavigationMenuItem";

export const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  BoxProps
>(({ sx, className, children, ...other }, ref) => {
  return (
    <BaseNavigationMenu.Trigger
      render={
        <Box
          component="button"
          type="button"
          ref={ref}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.5,
            py: 1,
            borderRadius: "6px",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--theme-color-text-primary)",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            outline: "none",
            transition: "background-color 150ms ease",
            "&:hover": {
              backgroundColor:
                "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
            },
            ...sx,
          }}
          className={`inline-flex items-center cursor-pointer ${className || ""}`.trim()}
          {...other}
        >
          {children}
          <ChevronDownIcon />
        </Box>
      }
    />
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <BaseNavigationMenu.Content
        render={
          <Box
            ref={ref}
            sx={{
              backgroundColor: "var(--theme-color-background-paper)",
              borderRadius: "12px",
              border:
                "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
              boxShadow:
                "var(--theme-shadow-dropdown, 0 16px 32px -4px rgba(0,0,0,0.2))",
              p: 2,
              minWidth: 260,
              ...sx,
            }}
            className={className}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  BoxProps & { href?: string }
>(({ href, sx, className, children, ...other }, ref) => {
  return (
    <BaseNavigationMenu.Link
      render={
        <Box
          component="a"
          href={href}
          ref={ref}
          sx={{
            display: "block",
            px: 1.5,
            py: 1,
            borderRadius: "6px",
            fontSize: "0.875rem",
            color: "var(--theme-color-text-secondary)",
            textDecoration: "none",
            transition: "all 150ms ease",
            "&:hover": {
              color: "var(--theme-color-text-primary)",
              backgroundColor:
                "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
            },
            ...sx,
          }}
          className={`block text-decoration-none ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Box>
      }
    />
  );
});
NavigationMenuLink.displayName = "NavigationMenuLink";

export const NavigationMenu = React.forwardRef<
  HTMLElement,
  NavigationMenuProps
>(({ children, sx, className, slotProps, ...other }, ref) => {
  const baseSx: Record<string, unknown> = {
    position: "relative",
    zIndex: 100,
  };

  const rootSlotSx = slotProps?.root?.sx;
  const mergedRootSx = [
    baseSx,
    ...(Array.isArray(sx) ? sx : [sx]),
    ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
  ] as BoxProps["sx"];

  return (
    <BaseNavigationMenu.Root
      render={
        <Box
          component="nav"
          ref={ref}
          sx={mergedRootSx}
          className={`relative ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
          {...other}
          {...slotProps?.root}
        >
          {children}
          <BaseNavigationMenu.Portal>
            <BaseNavigationMenu.Positioner sideOffset={8}>
              <BaseNavigationMenu.Popup
                render={
                  <BaseNavigationMenu.Viewport
                    render={
                      <Box
                        sx={{
                          backgroundColor:
                            "var(--theme-color-background-paper)",
                          borderRadius: "12px",
                          border:
                            "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
                          boxShadow:
                            "var(--theme-shadow-dropdown, 0 16px 32px -4px rgba(0,0,0,0.2))",
                          overflow: "hidden",
                        }}
                      />
                    }
                  />
                }
              />
            </BaseNavigationMenu.Positioner>
          </BaseNavigationMenu.Portal>
        </Box>
      }
    />
  );
}) as unknown as React.ForwardRefExoticComponent<
  NavigationMenuProps & React.RefAttributes<HTMLElement>
> & {
  Root: typeof BaseNavigationMenu.Root;
  List: typeof NavigationMenuList;
  Item: typeof NavigationMenuItem;
  Trigger: typeof NavigationMenuTrigger;
  Content: typeof NavigationMenuContent;
  Link: typeof NavigationMenuLink;
  Portal: typeof BaseNavigationMenu.Portal;
  Positioner: typeof BaseNavigationMenu.Positioner;
  Popup: typeof BaseNavigationMenu.Popup;
  Viewport: typeof BaseNavigationMenu.Viewport;
};

NavigationMenu.displayName = "NavigationMenu";
NavigationMenu.Root = BaseNavigationMenu.Root;
NavigationMenu.List = NavigationMenuList;
NavigationMenu.Item = NavigationMenuItem;
NavigationMenu.Trigger = NavigationMenuTrigger;
NavigationMenu.Content = NavigationMenuContent;
NavigationMenu.Link = NavigationMenuLink;
NavigationMenu.Portal = BaseNavigationMenu.Portal;
NavigationMenu.Positioner = BaseNavigationMenu.Positioner;
NavigationMenu.Popup = BaseNavigationMenu.Popup;
NavigationMenu.Viewport = BaseNavigationMenu.Viewport;

export * from "./navigation-menu.styles";
export * from "./navigation-menu.types";
export * from "./navigation-menu-context";
