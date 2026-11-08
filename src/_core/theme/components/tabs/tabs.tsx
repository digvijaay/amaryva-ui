import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";

// ----------------------------------------------------------------------

export type TabsVariant = "line" | "pill" | "soft" | "button";
export type TabsColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export interface TabsContextValue {
  variant: TabsVariant;
  color: TabsColor;
  orientation: "horizontal" | "vertical";
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: "line",
  color: "primary",
  orientation: "horizontal",
});

export const useTabs = () => React.useContext(TabsContext);

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export interface TabListProps extends BoxProps {
  slots?: {
    root?: React.ElementType;
  };
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
  };
}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ sx, className, children, ...other }, ref) => {
    const { variant, orientation } = useTabs();

    const getVariantSx = (): Record<string, unknown> => {
      switch (variant) {
        case "pill":
        case "soft":
          return {
            backgroundColor:
              "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
            padding: "4px",
            borderRadius: "12px",
            border:
              "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.16))",
          };
        case "button":
          return {
            gap: 1,
          };
        default:
          return {
            borderBottom:
              orientation === "horizontal"
                ? "1px solid var(--theme-color-divider)"
                : undefined,
            borderRight:
              orientation === "vertical"
                ? "1px solid var(--theme-color-divider)"
                : undefined,
          };
      }
    };

    return (
      <BaseTabs.List
        render={
          <Box
            ref={ref}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: orientation === "vertical" ? "column" : "row",
              alignItems: "center",
              gap: variant === "line" ? 2 : 0.5,
              ...getVariantSx(),
              ...sx,
            }}
            className={`relative flex ${orientation === "vertical" ? "flex-col" : "flex-row items-center"} ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
TabList.displayName = "TabList";

export interface TabProps extends BoxProps {
  value: any;
  disabled?: boolean;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled = false, sx, className, children, ...other }, ref) => {
    const { variant, color, orientation } = useTabs();

    const activeColor =
      color === "inherit"
        ? "var(--theme-color-text-primary)"
        : `var(--theme-color-${color}-main, var(--theme-color-primary-main))`;

    const channelVar =
      color === "inherit"
        ? "--theme-color-text-primary-channel"
        : `--theme-color-${color}-main-channel`;

    const getVariantStyles = (): Record<string, unknown> => {
      switch (variant) {
        case "pill":
          return {
            borderRadius: "8px",
            color: "var(--theme-color-text-secondary)",
            "&[data-selected]": {
              backgroundColor: activeColor,
              color:
                color === "inherit"
                  ? "var(--theme-color-background-paper)"
                  : "#FFFFFF",
              fontWeight: 600,
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            },
          };
        case "soft":
          return {
            borderRadius: "8px",
            color: "var(--theme-color-text-secondary)",
            "&[data-selected]": {
              backgroundColor: `rgba(var(${channelVar}, 145 158 171) / 0.16)`,
              color: activeColor,
              fontWeight: 600,
            },
          };
        case "button":
          return {
            borderRadius: "8px",
            border: "1px solid var(--theme-color-divider)",
            backgroundColor: "transparent",
            color: "var(--theme-color-text-secondary)",
            "&[data-selected]": {
              borderColor: activeColor,
              backgroundColor: `rgba(var(${channelVar}, 145 158 171) / 0.08)`,
              color: activeColor,
              fontWeight: 600,
            },
          };
        default:
          return {
            borderRadius: 0,
            borderBottom:
              orientation === "horizontal"
                ? "2px solid transparent"
                : undefined,
            borderRight:
              orientation === "vertical" ? "2px solid transparent" : undefined,
            mb: orientation === "horizontal" ? "-1px" : undefined,
            mr: orientation === "vertical" ? "-1px" : undefined,
            color: "var(--theme-color-text-secondary)",
            "&[data-selected]": {
              color: activeColor,
              borderBottomColor:
                orientation === "horizontal" ? activeColor : undefined,
              borderRightColor:
                orientation === "vertical" ? activeColor : undefined,
              fontWeight: 600,
            },
          };
      }
    };

    return (
      <BaseTabs.Tab
        value={value}
        disabled={disabled}
        render={
          <Box
            component="button"
            type="button"
            ref={ref}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              px: 2,
              py: 1,
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: 1.5,
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.48 : 1,
              background: "transparent",
              border: "none",
              outline: "none",
              transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover:not([disabled]):not([data-selected])": {
                color: "var(--theme-color-text-primary)",
                backgroundColor:
                  variant === "line"
                    ? "transparent"
                    : "var(--theme-color-action-hover)",
              },
              ...getVariantStyles(),
              ...sx,
            }}
            className={`inline-flex items-center justify-center font-medium select-none ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
Tab.displayName = "Tab";

export interface TabPanelProps extends BoxProps {
  value: any;
  keepMounted?: boolean;
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, keepMounted = false, sx, className, children, ...other }, ref) => {
    return (
      <BaseTabs.Panel
        value={value}
        keepMounted={keepMounted}
        render={
          <Box
            ref={ref}
            sx={{
              py: 2,
              outline: "none",
              color: "var(--theme-color-text-primary)",
              ...sx,
            }}
            className={`w-full outline-none ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
TabPanel.displayName = "TabPanel";

// ----------------------------------------------------------------------
// High-Level Composed Tabs
// ----------------------------------------------------------------------

export interface TabsProps
  extends Omit<BoxProps, "color" | "defaultValue" | "onChange"> {
  value?: any;
  defaultValue?: any;
  onValueChange?: (value: any) => void;
  orientation?: "horizontal" | "vertical";
  variant?: TabsVariant;
  color?: TabsColor;
  slotProps?: {
    root?: Omit<BoxProps, "ref">;
  };
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      variant = "line",
      color = "primary",
      children,
      sx,
      className,
      slotProps,
      ...other
    },
    ref,
  ) => {
    const baseSx: Record<string, unknown> = {
      display: "flex",
      flexDirection: orientation === "vertical" ? "row" : "column",
      width: "100%",
    };

    const rootSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSx) ? rootSx : [rootSx]),
    ] as BoxProps["sx"];

    return (
      <TabsContext.Provider value={{ variant, color, orientation }}>
        <BaseTabs.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          orientation={orientation}
          render={
            <Box
              ref={ref}
              sx={mergedRootSx}
              className={`flex ${orientation === "vertical" ? "flex-row gap-4" : "flex-col"} ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
              {...other}
              {...slotProps?.root}
            >
              {children}
            </Box>
          }
        />
      </TabsContext.Provider>
    );
  },
) as unknown as React.ForwardRefExoticComponent<
  TabsProps & React.RefAttributes<HTMLDivElement>
> & {
  List: typeof TabList;
  Tab: typeof Tab;
  Panel: typeof TabPanel;
};

Tabs.displayName = "Tabs";
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export * from "./tabs.styles";
export * from "./tabs.types";
export * from "./tabs-context";
