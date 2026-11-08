import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { Field } from "../field";
import type {
  AutocompleteOption,
  AutocompleteProps,
} from "./autocomplete.types";

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const AutocompleteRoot = BaseAutocomplete.Root;
export const AutocompleteTrigger = BaseAutocomplete.Trigger;
export const AutocompleteClear = BaseAutocomplete.Clear;
export const AutocompletePortal = BaseAutocomplete.Portal;
export const AutocompletePositioner = BaseAutocomplete.Positioner;
export const AutocompleteGroup = BaseAutocomplete.Group;
export const AutocompleteGroupLabel = BaseAutocomplete.GroupLabel;
export const AutocompleteInputGroup = BaseAutocomplete.InputGroup;
export const AutocompleteInput = BaseAutocomplete.Input;

export const AutocompletePopup = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, sx, className, ...other }, ref) => {
    return (
      <BaseAutocomplete.Popup
        render={
          <Box
            ref={ref}
            sx={{
              minWidth: "var(--anchor-width)",
              maxHeight: 280,
              overflowY: "auto",
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
              transition: "opacity 150ms ease, transform 150ms ease",
              "&[data-starting-style], &[data-ending-style]": {
                opacity: 0,
                transform: "scale(0.96)",
              },
              ...sx,
            }}
            className={`min-w-(--anchor-width) max-h-70 overflow-y-auto bg-paper rounded-xl border border-divider p-2 shadow-xl outline-none z-50 ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);

AutocompletePopup.displayName = "AutocompletePopup";

export const AutocompleteList = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, sx, className, ...other }, ref) => {
    return (
      <BaseAutocomplete.List
        render={
          <Box
            ref={ref}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              ...sx,
            }}
            className={`flex flex-col gap-1 ${className || ""}`.trim()}
            {...other}
          >
            {children}
          </Box>
        }
      />
    );
  },
);

AutocompleteList.displayName = "AutocompleteList";

export const AutocompleteItem = React.forwardRef<
  HTMLDivElement,
  BoxProps & { value: unknown; disabled?: boolean }
>(({ children, value, disabled, sx, className, ...other }, ref) => {
  return (
    <BaseAutocomplete.Item
      value={value as AutocompleteOption | string}
      disabled={disabled}
      render={
        <Box
          ref={ref}
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1.5,
            py: 1,
            borderRadius: "8px",
            fontSize: "0.875rem",
            color: "var(--theme-color-text-primary)",
            cursor: "pointer",
            userSelect: "none",
            transition: "background-color 150ms ease",
            "&[data-highlighted]": {
              backgroundColor: "var(--theme-color-action-hover)",
            },
            "&[data-selected]": {
              backgroundColor: "var(--theme-color-action-selected)",
              fontWeight: 600,
            },
            "&[data-disabled]": {
              opacity: 0.45,
              cursor: "not-allowed",
            },
            ...sx,
          }}
          className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer select-none ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Box>
      }
    />
  );
});

AutocompleteItem.displayName = "AutocompleteItem";

export const AutocompleteEmpty = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, sx, className, ...other }, ref) => {
    return (
      <BaseAutocomplete.Empty
        render={
          <Box
            ref={ref}
            sx={{
              px: 2,
              py: 3,
              textAlign: "center",
              fontSize: "0.875rem",
              color: "var(--theme-color-text-secondary)",
              ...sx,
            }}
            className={`px-4 py-6 text-center text-sm text-text-secondary ${className || ""}`.trim()}
            {...other}
          >
            {children || "No options found"}
          </Box>
        }
      />
    );
  },
);

AutocompleteEmpty.displayName = "AutocompleteEmpty";

// ----------------------------------------------------------------------
// Composed Autocomplete Component
// ----------------------------------------------------------------------

/**
 * Autocomplete Component
 *
 * Implements AGENTS.md guidelines:
 * - Powered by @base-ui/react Autocomplete for accessible combobox filtering and popup positioning
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Maps to custom theme design tokens (paper, divider, action states, shadows)
 * - Deep slot customization via slots and slotProps
 * - Supports keyboard navigation, dynamic filtering, clear button, and Field integration
 */
export function Autocomplete<Option extends AutocompleteOption | string>({
  options = [],
  value,
  defaultValue,
  onValueChange,
  placeholder = "Search...",
  label,
  helperText,
  color = "primary",
  error = false,
  disabled = false,
  required = false,
  fullWidth = true,
  emptyText,
  slots,
  slotProps,
  sx,
  className,
  ...other
}: AutocompleteProps<Option>) {
  const isInherit = !error && color === "inherit";

  const colorMain = error
    ? "var(--theme-color-error-main)"
    : isInherit
      ? "var(--theme-color-text-primary)"
      : `var(--theme-color-${color}-main)`;

  const colorChannel = error
    ? "var(--theme-color-error-main-channel)"
    : isInherit
      ? "var(--theme-color-text-primary-channel, 145 158 171)"
      : `var(--theme-color-${color}-main-channel)`;

  const content = (
    <BaseAutocomplete.Root
      items={options}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
    >
      <Box
        sx={{
          position: "relative",
          width: fullWidth ? "100%" : "auto",
          ...sx,
        }}
        className={`relative ${fullWidth ? "w-full" : ""} ${className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        <BaseAutocomplete.InputGroup
          render={
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                width: fullWidth ? "100%" : "auto",
                height: 44,
                px: 2,
                borderRadius: "10px",
                backgroundColor: "var(--theme-color-background-paper)",
                border: `1px solid ${error ? "var(--theme-color-error-main)" : "var(--theme-color-divider)"}`,
                transition: "border-color 200ms ease, box-shadow 200ms ease",
                "&:hover:not([data-disabled])": {
                  borderColor: colorMain,
                },
                "&:focus-within": {
                  borderColor: colorMain,
                  boxShadow: `0 0 0 3px rgba(var(${colorChannel}) / 0.16)`,
                },
                ...(disabled && {
                  opacity: 0.48,
                  cursor: "not-allowed",
                  pointerEvents: "none",
                }),
                ...slotProps?.inputGroup?.sx,
              }}
              className={`inline-flex items-center w-full h-11 px-4 rounded-xl border bg-paper ${slotProps?.inputGroup?.className || ""}`.trim()}
              {...slotProps?.inputGroup}
            >
              <BaseAutocomplete.Input
                placeholder={placeholder}
                disabled={disabled}
                render={
                  <Box
                    component="input"
                    sx={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      color: "var(--theme-color-text-primary)",
                      fontSize: "0.875rem",
                      "&::placeholder": {
                        color: "var(--theme-color-text-disabled)",
                      },
                      ...slotProps?.input?.sx,
                    }}
                    className={`w-full h-full bg-transparent border-none outline-none text-sm text-text-primary placeholder-text-disabled ${slotProps?.input?.className || ""}`.trim()}
                    {...slotProps?.input}
                  />
                }
              />
            </Box>
          }
        />

        <BaseAutocomplete.Portal>
          <BaseAutocomplete.Positioner sideOffset={6} align="start">
            <AutocompletePopup sx={slotProps?.popup?.sx} {...slotProps?.popup}>
              <AutocompleteList sx={slotProps?.list?.sx} {...slotProps?.list}>
                {options.map((option) => {
                  const itemValue =
                    typeof option === "string" ? option : option.value;
                  const itemLabel =
                    typeof option === "string" ? option : option.label;
                  const itemDisabled =
                    typeof option === "string" ? false : option.disabled;

                  return (
                    <AutocompleteItem
                      key={itemValue}
                      value={option}
                      disabled={itemDisabled}
                      sx={slotProps?.item?.sx}
                      {...slotProps?.item}
                    >
                      {itemLabel}
                    </AutocompleteItem>
                  );
                })}
                <AutocompleteEmpty
                  sx={slotProps?.empty?.sx}
                  {...slotProps?.empty}
                >
                  {emptyText}
                </AutocompleteEmpty>
              </AutocompleteList>
            </AutocompletePopup>
          </BaseAutocomplete.Positioner>
        </BaseAutocomplete.Portal>
      </Box>
    </BaseAutocomplete.Root>
  );

  if (label || helperText || error) {
    return (
      <Field
        label={label}
        helperText={helperText}
        error={error}
        required={required}
        disabled={disabled}
      >
        {content}
      </Field>
    );
  }

  return content;
}

export * from "./autocomplete.styles";
export * from "./autocomplete.types";
export * from "./autocomplete-context";
