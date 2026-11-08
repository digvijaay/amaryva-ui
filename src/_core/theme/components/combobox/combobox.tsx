import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { ComboboxInputProps, ComboboxProps } from "./combobox.types";

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
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

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const sizeConfig = {
  small: { height: 36, px: 1.5, py: 0.5, fontSize: "0.8125rem" },
  medium: { height: 44, px: 2, py: 1, fontSize: "0.875rem" },
  large: { height: 52, px: 2.5, py: 1.25, fontSize: "0.9375rem" },
};

export const ComboboxInput = React.forwardRef<
  HTMLInputElement,
  ComboboxInputProps
>(
  (
    {
      color = "primary",
      size = "medium",
      placeholder,
      disabled,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const s = sizeConfig[size] || sizeConfig.medium;

    const channelVar =
      color === "inherit"
        ? "--theme-color-text-primary-channel"
        : `--theme-color-${color}-main-channel`;

    const activeColor =
      color === "inherit"
        ? "var(--theme-color-text-primary)"
        : `var(--theme-color-${color}-main, var(--theme-color-primary-main))`;

    const baseInputSx: Record<string, unknown> = {
      width: "100%",
      minHeight: s.height,
      px: s.px,
      py: s.py,
      fontSize: s.fontSize,
      fontWeight: 400,
      color: "var(--theme-color-text-primary)",
      backgroundColor: "var(--theme-color-background-paper)",
      border: "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.24))",
      borderRadius: "var(--theme-shape-borderRadius, 8px)",
      outline: "none",
      transition: "border-color 150ms ease, box-shadow 150ms ease",
      "&::placeholder": {
        color: "var(--theme-color-text-disabled)",
      },
      "&:hover:not([disabled])": {
        borderColor: "var(--theme-color-text-primary)",
      },
      "&:focus": {
        borderColor: activeColor,
        boxShadow: `0 0 0 3px rgba(var(${channelVar}, 0 167 111) / 0.16)`,
      },
      "&[disabled]": {
        opacity: 0.48,
        cursor: "not-allowed",
        backgroundColor:
          "var(--theme-color-action-disabled-background, rgba(145, 158, 171, 0.08))",
      },
    };

    const mergedInputSx = [
      baseInputSx,
      ...(Array.isArray(sx) ? sx : [sx]),
    ] as BoxProps["sx"];

    return (
      <BaseCombobox.Input
        placeholder={placeholder}
        disabled={disabled}
        render={
          <Box
            component="input"
            ref={ref}
            sx={mergedInputSx}
            className={`w-full outline-none ${className || ""}`.trim()}
            {...other}
          />
        }
      />
    );
  },
);
ComboboxInput.displayName = "ComboboxInput";

export const ComboboxItem = React.forwardRef<
  HTMLDivElement,
  BoxProps & { value: unknown; disabled?: boolean }
>(({ value, disabled = false, sx, className, children, ...other }, ref) => {
  return (
    <BaseCombobox.Item
      value={value}
      disabled={disabled}
      render={
        <Box
          ref={ref}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            px: 1.5,
            py: 1,
            borderRadius: "6px",
            fontSize: "0.875rem",
            color: "var(--theme-color-text-primary)",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.48 : 1,
            userSelect: "none",
            outline: "none",
            transition: "background-color 120ms ease",
            "&[data-highlighted]": {
              backgroundColor:
                "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
            },
            "&[data-selected]": {
              backgroundColor:
                "var(--theme-color-action-selected, rgba(145, 158, 171, 0.16))",
              fontWeight: 600,
            },
            ...sx,
          }}
          className={`flex items-center justify-between select-none ${className || ""}`.trim()}
          {...other}
        >
          <Box component="span">{children}</Box>
          <BaseCombobox.ItemIndicator
            render={
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "var(--theme-color-primary-main)",
                }}
              >
                <CheckIcon />
              </Box>
            }
          />
        </Box>
      }
    />
  );
});
ComboboxItem.displayName = "ComboboxItem";

export const ComboboxPopup = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <BaseCombobox.Popup
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
              p: 0.75,
              maxHeight: 280,
              overflowY: "auto",
              minWidth: "var(--anchor-width)",
              outline: "none",
              zIndex: 1300,
              ...sx,
            }}
            className={`overflow-y-auto ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);
ComboboxPopup.displayName = "ComboboxPopup";

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      options = [],
      placeholder = "Search or select...",
      disabled = false,
      color = "primary",
      size = "medium",
      label,
      emptyText = "No results found",
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
      flexDirection: "column",
      gap: 0.75,
      width: "100%",
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    return (
      <Box
        ref={ref}
        sx={mergedRootSx}
        className={`flex flex-col w-full ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        {label && (
          <Box
            component="label"
            sx={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--theme-color-text-primary)",
              ...slotProps?.label?.sx,
            }}
            className={`font-medium ${slotProps?.label?.className || ""}`.trim()}
            {...slotProps?.label}
          >
            {label}
          </Box>
        )}

        <BaseCombobox.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <Box sx={{ position: "relative", width: "100%" }}>
            <ComboboxInput
              placeholder={placeholder}
              color={color}
              size={size}
              disabled={disabled}
              {...slotProps?.input}
            />
            <BaseCombobox.Trigger
              render={
                <Box
                  component="button"
                  type="button"
                  tabIndex={-1}
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--theme-color-text-secondary)",
                    p: 0.5,
                  }}
                >
                  <ChevronDownIcon />
                </Box>
              }
            />
          </Box>

          <BaseCombobox.Portal>
            <BaseCombobox.Positioner sideOffset={6}>
              <ComboboxPopup {...slotProps?.popup}>
                <BaseCombobox.List>
                  {options.map((opt) => (
                    <ComboboxItem
                      key={String(opt.value)}
                      value={opt.value}
                      disabled={opt.disabled}
                    >
                      {opt.label}
                    </ComboboxItem>
                  ))}
                  {children}
                  <BaseCombobox.Empty
                    render={
                      <Box
                        sx={{
                          p: 2,
                          textAlign: "center",
                          fontSize: "0.875rem",
                          color: "var(--theme-color-text-secondary)",
                        }}
                      >
                        {emptyText}
                      </Box>
                    }
                  />
                </BaseCombobox.List>
              </ComboboxPopup>
            </BaseCombobox.Positioner>
          </BaseCombobox.Portal>
        </BaseCombobox.Root>
      </Box>
    );
  },
) as unknown as React.ForwardRefExoticComponent<
  ComboboxProps & React.RefAttributes<HTMLDivElement>
> & {
  Root: typeof BaseCombobox.Root;
  Input: typeof ComboboxInput;
  Item: typeof ComboboxItem;
  Popup: typeof ComboboxPopup;
  Trigger: typeof BaseCombobox.Trigger;
  Portal: typeof BaseCombobox.Portal;
  Positioner: typeof BaseCombobox.Positioner;
  List: typeof BaseCombobox.List;
  Empty: typeof BaseCombobox.Empty;
  Clear: typeof BaseCombobox.Clear;
  Chips: typeof BaseCombobox.Chips;
  Chip: typeof BaseCombobox.Chip;
  ChipRemove: typeof BaseCombobox.ChipRemove;
  Group: typeof BaseCombobox.Group;
  GroupLabel: typeof BaseCombobox.GroupLabel;
  Separator: typeof BaseCombobox.Separator;
};

Combobox.displayName = "Combobox";
Combobox.Root = BaseCombobox.Root;
Combobox.Input = ComboboxInput;
Combobox.Item = ComboboxItem;
Combobox.Popup = ComboboxPopup;
Combobox.Trigger = BaseCombobox.Trigger;
Combobox.Portal = BaseCombobox.Portal;
Combobox.Positioner = BaseCombobox.Positioner;
Combobox.List = BaseCombobox.List;
Combobox.Empty = BaseCombobox.Empty;
Combobox.Clear = BaseCombobox.Clear;
Combobox.Chips = BaseCombobox.Chips;
Combobox.Chip = BaseCombobox.Chip;
Combobox.ChipRemove = BaseCombobox.ChipRemove;
Combobox.Group = BaseCombobox.Group;
Combobox.GroupLabel = BaseCombobox.GroupLabel;
Combobox.Separator = BaseCombobox.Separator;

export * from "./combobox.styles";
export * from "./combobox.types";
export * from "./combobox-context";
