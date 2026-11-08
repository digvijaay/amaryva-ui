import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { ButtonContext } from "../button/button-context";
import type { MenuItemColor, MenuItemProps, MenuProps } from "./menu.types";

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const MenuRoot = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;
export const MenuPortal = BaseMenu.Portal;
export const MenuPositioner = BaseMenu.Positioner;
export const MenuGroup = BaseMenu.Group;
export const MenuGroupLabel = BaseMenu.GroupLabel;
export const MenuSubmenuRoot = BaseMenu.SubmenuRoot;
export const MenuSubmenuTrigger = BaseMenu.SubmenuTrigger;
export const MenuCheckboxItem = BaseMenu.CheckboxItem;
export const MenuRadioGroup = BaseMenu.RadioGroup;
export const MenuRadioItem = BaseMenu.RadioItem;

export const MenuSeparator = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, ...other }, ref) => {
    return (
      <BaseMenu.Separator
        render={
          <Box
            ref={ref}
            sx={{
              height: "1px",
              my: 1,
              backgroundColor: "var(--theme-color-divider)",
              ...sx,
            }}
            className={`h-px my-1 bg-divider ${className || ""}`.trim()}
            {...other}
          />
        }
      />
    );
  },
);

MenuSeparator.displayName = "MenuSeparator";

export const MenuPopup = React.forwardRef<
  HTMLDivElement,
  BoxProps & { blur?: boolean | number | string }
>(({ children, blur, sx, className, ...other }, ref) => {
  const blurValue =
    typeof blur === "number"
      ? `${blur}px`
      : typeof blur === "string"
        ? blur
        : "12px";

  const blurStyles = blur
    ? {
        backdropFilter: `blur(${blurValue})`,
        WebkitBackdropFilter: `blur(${blurValue})`,
      }
    : {};

  return (
    <BaseMenu.Popup
      render={
        <Box
          ref={ref}
          sx={{
            minWidth: 180,
            backgroundColor: "var(--theme-color-background-paper)",
            borderRadius: "12px",
            border: "1px solid var(--theme-color-divider)",
            boxShadow:
              "var(--theme-shadow-dropdown, 0 12px 32px -4px rgba(0, 0, 0, 0.16))",
            p: 1,
            zIndex: 1300,
            outline: "none",
            opacity: 1,
            transform: "scale(1)",
            transition: "opacity 120ms ease, transform 120ms ease",
            "&[data-starting-style], &[data-ending-style]": {
              opacity: 0,
              transform: "scale(0.96)",
            },
            ...blurStyles,
            ...sx,
          }}
          className={`min-w-45 bg-paper rounded-xl border border-divider p-1.5 shadow-xl outline-none z-50 ${blur ? "backdrop-blur-md" : ""} ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Box>
      }
    />
  );
});

MenuPopup.displayName = "MenuPopup";

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      children,
      startIcon,
      endIcon,
      color = "inherit",
      disabled = false,
      onClick,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const colorStyles: Record<
      MenuItemColor,
      { text: string; hoverBg: string }
    > = {
      inherit: {
        text: "var(--theme-color-text-primary)",
        hoverBg: "var(--theme-color-action-hover)",
      },
      primary: {
        text: "var(--theme-color-primary-main)",
        hoverBg: "rgba(var(--theme-color-primary-main-channel) / 0.08)",
      },
      error: {
        text: "var(--theme-color-error-main)",
        hoverBg: "rgba(var(--theme-color-error-main-channel) / 0.08)",
      },
    };

    return (
      <BaseMenu.Item
        disabled={disabled}
        onClick={onClick}
        render={
          <Box
            ref={ref}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              px: 1.5,
              py: 1,
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: colorStyles[color].text,
              cursor: disabled ? "not-allowed" : "pointer",
              userSelect: "none",
              transition: "background-color 150ms ease, color 150ms ease",
              "&[data-highlighted]": {
                backgroundColor: colorStyles[color].hoverBg,
              },
              "&[data-disabled]": {
                opacity: 0.45,
              },
              ...sx,
            }}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer select-none ${className || ""}`.trim()}
            {...other}
          >
            <Box
              component="span"
              sx={{ display: "flex", alignItems: "center", gap: 1.25 }}
              className="flex items-center gap-2.5"
            >
              {startIcon && (
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {startIcon}
                </Box>
              )}
              {children}
            </Box>

            {endIcon && (
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "var(--theme-color-text-secondary)",
                }}
              >
                {endIcon}
              </Box>
            )}
          </Box>
        }
      />
    );
  },
);

MenuItem.displayName = "MenuItem";

// ----------------------------------------------------------------------
// Composed Menu Component
// ----------------------------------------------------------------------

/**
 * Menu Component
 *
 * Implements AGENTS.md guidelines:
 * - Powered by @base-ui/react Menu for accessible context menus, submenus, keyboard navigation, and positioning
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (paper, divider, action states, shadows)
 * - Deep slot customization via slots and slotProps
 * - Supports both declarative items prop and compound subcomponents
 */
export function Menu({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  items,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 6,
  alignOffset = 0,
  blur = false,
  slots,
  slotProps,
}: MenuProps) {
  const TriggerComponent = slots?.trigger || BaseMenu.Trigger;
  const PopupComponent = slots?.popup || MenuPopup;

  return (
    <ButtonContext.Provider value={{ disableHoverY: true }}>
      <BaseMenu.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        {trigger && (
          <TriggerComponent
            render={
              React.isValidElement(trigger) ? (
                trigger
              ) : (
                <Box component="button" type="button">
                  {trigger}
                </Box>
              )
            }
            {...slotProps?.trigger}
          />
        )}

        <BaseMenu.Portal>
          <BaseMenu.Positioner
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
          >
            <PopupComponent
              blur={blur}
              sx={slotProps?.popup?.sx}
              className={slotProps?.popup?.className}
              {...slotProps?.popup}
            >
              {items
                ? items.map((item, idx) => (
                    <React.Fragment key={item.key || idx}>
                      <MenuItem
                        startIcon={item.icon}
                        endIcon={item.endIcon}
                        color={item.color}
                        disabled={item.disabled}
                        onClick={item.onClick}
                        sx={slotProps?.item?.sx}
                        {...slotProps?.item}
                      >
                        {item.label}
                      </MenuItem>
                      {item.separatorAfter && <MenuSeparator />}
                    </React.Fragment>
                  ))
                : children}
            </PopupComponent>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </BaseMenu.Root>
    </ButtonContext.Provider>
  );
}

export * from "./menu.styles";
export * from "./menu.types";
export * from "./menu-context";
