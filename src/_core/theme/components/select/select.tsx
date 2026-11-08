import { Select as BaseSelect } from "@base-ui/react/select";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { SelectProps, SelectTriggerProps } from "./select.types";

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

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(
  (
    { color = "primary", size = "medium", sx, className, children, ...other },
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

    return (
      <BaseSelect.Trigger
        render={
          <Box
            component="button"
            type="button"
            ref={ref}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              width: "100%",
              minHeight: s.height,
              px: s.px,
              py: s.py,
              fontSize: s.fontSize,
              fontWeight: 400,
              color: "var(--theme-color-text-primary)",
              backgroundColor: "var(--theme-color-background-paper)",
              border:
                "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.24))",
              borderRadius: "var(--theme-shape-borderRadius, 8px)",
              cursor: "pointer",
              outline: "none",
              userSelect: "none",
              transition: "border-color 150ms ease, box-shadow 150ms ease",
              "&:hover:not([disabled])": {
                borderColor: "var(--theme-color-text-primary)",
              },
              "&:focus-visible, &[data-popup-open]": {
                borderColor: activeColor,
                boxShadow: `0 0 0 3px rgba(var(${channelVar}, 0 167 111) / 0.16)`,
              },
              "&[disabled]": {
                opacity: 0.48,
                cursor: "not-allowed",
                backgroundColor:
                  "var(--theme-color-action-disabled-background, rgba(145, 158, 171, 0.08))",
              },
              ...sx,
            }}
            className={`inline-flex items-center justify-between cursor-pointer select-none ${className || ""}`.trim()}
            {...other}
          >
            {children}
            <BaseSelect.Icon
              render={
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    color: "var(--theme-color-text-secondary)",
                    transition: "transform 200ms ease",
                    "&[data-popup-open]": {
                      transform: "rotate(180deg)",
                    },
                  }}
                >
                  <ChevronDownIcon />
                </Box>
              }
            />
          </Box>
        }
      />
    );
  },
);
SelectTrigger.displayName = "SelectTrigger";

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  BoxProps & { value: unknown; disabled?: boolean }
>(({ value, disabled = false, sx, className, children, ...other }, ref) => {
  return (
    <BaseSelect.Item
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
          <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
          <BaseSelect.ItemIndicator
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
SelectItem.displayName = "SelectItem";

export const SelectPopup = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <BaseSelect.Popup
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
SelectPopup.displayName = "SelectPopup";

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      disabled = false,
      name,
      placeholder = "Select...",
      color = "primary",
      size = "medium",
      options,
      label,
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

        <BaseSelect.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          name={name}
        >
          <SelectTrigger color={color} size={size} {...slotProps?.trigger}>
            <BaseSelect.Value placeholder={placeholder} />
          </SelectTrigger>

          <BaseSelect.Portal>
            <BaseSelect.Positioner sideOffset={6}>
              <SelectPopup {...slotProps?.popup}>
                {options
                  ? options.map((opt) => (
                      <SelectItem
                        key={String(opt.value)}
                        value={opt.value}
                        disabled={opt.disabled}
                      >
                        {opt.label}
                      </SelectItem>
                    ))
                  : children}
              </SelectPopup>
            </BaseSelect.Positioner>
          </BaseSelect.Portal>
        </BaseSelect.Root>
      </Box>
    );
  },
) as unknown as React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<HTMLDivElement>
> & {
  Root: typeof BaseSelect.Root;
  Trigger: typeof SelectTrigger;
  Value: typeof BaseSelect.Value;
  Icon: typeof BaseSelect.Icon;
  Portal: typeof BaseSelect.Portal;
  Positioner: typeof BaseSelect.Positioner;
  Popup: typeof SelectPopup;
  Item: typeof SelectItem;
  ItemText: typeof BaseSelect.ItemText;
  ItemIndicator: typeof BaseSelect.ItemIndicator;
  Group: typeof BaseSelect.Group;
  GroupLabel: typeof BaseSelect.GroupLabel;
  Separator: typeof BaseSelect.Separator;
};

Select.displayName = "Select";
Select.Root = BaseSelect.Root;
Select.Trigger = SelectTrigger;
Select.Value = BaseSelect.Value;
Select.Icon = BaseSelect.Icon;
Select.Portal = BaseSelect.Portal;
Select.Positioner = BaseSelect.Positioner;
Select.Popup = SelectPopup;
Select.Item = SelectItem;
Select.ItemText = BaseSelect.ItemText;
Select.ItemIndicator = BaseSelect.ItemIndicator;
Select.Group = BaseSelect.Group;
Select.GroupLabel = BaseSelect.GroupLabel;
Select.Separator = BaseSelect.Separator;

export * from "./select.styles";
export * from "./select.types";
export * from "./select-context";
