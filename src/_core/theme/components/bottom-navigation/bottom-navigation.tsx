import { Box } from "@mui/system";
import * as React from "react";
import type {
  BottomNavigationActionProps,
  BottomNavigationProps,
} from "./bottom-navigation.types";
import {
  BottomNavigationContext,
  useBottomNavigation,
} from "./bottom-navigation-context";

// ----------------------------------------------------------------------
// BottomNavigationAction Component
// ----------------------------------------------------------------------

export const BottomNavigationAction = React.forwardRef<
  HTMLButtonElement,
  BottomNavigationActionProps
>(
  (
    { label, icon, value, showLabel: showLabelProp, sx, className, ...other },
    ref,
  ) => {
    const context = useBottomNavigation();

    const isSelected = context.value !== undefined && context.value === value;
    const showLabel =
      showLabelProp !== undefined
        ? showLabelProp
        : (context.showLabels ?? isSelected);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (context.onChange) {
        context.onChange(event, value);
      }
    };

    const baseSx: Record<string, unknown> = {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: "1 1 0",
      minWidth: 64,
      maxWidth: 168,
      px: 1,
      py: 0.75,
      border: "none",
      backgroundColor: "transparent",
      color: isSelected
        ? "var(--theme-color-primary-main)"
        : "var(--theme-color-text-secondary)",
      cursor: "pointer",
      userSelect: "none",
      transition: "color 150ms ease, transform 150ms ease",
      "&:hover": {
        color: isSelected
          ? "var(--theme-color-primary-dark)"
          : "var(--theme-color-text-primary)",
      },
      "&:active": {
        transform: "scale(0.96)",
      },
      ...sx,
    };

    return (
      <Box
        ref={ref}
        component="button"
        type="button"
        role="tab"
        aria-selected={isSelected}
        onClick={handleClick}
        sx={baseSx}
        className={`inline-flex flex-col items-center justify-center transition-all ${className || ""}`.trim()}
        {...other}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              fontSize: "1.25rem",
              mb: showLabel ? 0.5 : 0,
              transition: "transform 150ms ease",
              ...(isSelected && {
                transform: "scale(1.1)",
              }),
            }}
          >
            {icon}
          </Box>
        )}

        {label && (
          <Box
            component="span"
            sx={{
              fontSize: isSelected ? "0.75rem" : "0.6875rem",
              fontWeight: isSelected ? 600 : 500,
              lineHeight: 1.2,
              opacity: showLabel ? 1 : 0,
              maxHeight: showLabel ? 20 : 0,
              overflow: "hidden",
              transition: "all 150ms ease",
            }}
          >
            {label}
          </Box>
        )}
      </Box>
    );
  },
);

BottomNavigationAction.displayName = "BottomNavigationAction";

// ----------------------------------------------------------------------
// BottomNavigation Root Component
// ----------------------------------------------------------------------

export const BottomNavigation = React.forwardRef<
  HTMLElement,
  BottomNavigationProps
>(
  (
    {
      children,
      value: valueProp,
      defaultValue,
      onChange,
      showLabels = true,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const [valueState, setValueState] = React.useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const activeValue = isControlled ? valueProp : valueState;

    const handleChange = (event: React.SyntheticEvent, newValue: unknown) => {
      if (!isControlled) {
        setValueState(newValue);
      }
      if (onChange) {
        onChange(event, newValue);
      }
    };

    const baseSx: Record<string, unknown> = {
      display: "flex",
      justifyContent: "center",
      height: 56,
      backgroundColor: "var(--theme-color-background-paper)",
      borderTop:
        "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
      boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.04)",
      ...sx,
    };

    return (
      <BottomNavigationContext.Provider
        value={{
          value: activeValue,
          onChange: handleChange,
          showLabels,
        }}
      >
        <Box
          ref={ref}
          component="nav"
          role="tablist"
          sx={baseSx}
          className={`flex justify-center w-full ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Box>
      </BottomNavigationContext.Provider>
    );
  },
);

BottomNavigation.displayName = "BottomNavigation";

export * from "./bottom-navigation.styles";
export * from "./bottom-navigation.types";
export * from "./bottom-navigation-context";
