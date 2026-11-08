import { Popover as BasePopover } from "@base-ui/react/popover";
import { Box } from "@mui/system";
import * as React from "react";
import { Calendar } from "../calendar";
import { Input } from "../input";
import type { DatePickerProps } from "./date-picker.types";

// ----------------------------------------------------------------------

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="12" x2="18" y2="18" />
    </svg>
  );
}

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onChange,
      placeholder = "Select date...",
      size = "medium",
      error = false,
      disabled = false,
      clearable = true,
      minDate,
      maxDate,
      isDateDisabled,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const [selectedState, setSelectedState] = React.useState<Date | null>(
      defaultValue || null,
    );
    const [open, setOpen] = React.useState(false);

    const isControlled = valueProp !== undefined;
    const selectedDate = isControlled ? valueProp : selectedState;

    const formattedValue = React.useMemo(() => {
      if (!selectedDate) return "";
      return selectedDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }, [selectedDate]);

    const handleSelectDate = (date: Date) => {
      if (!isControlled) {
        setSelectedState(date);
      }
      onChange?.(date);
      setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) {
        setSelectedState(null);
      }
      onChange?.(null);
    };

    return (
      <Box
        ref={ref}
        sx={{ position: "relative", display: "inline-block", ...sx }}
        className={className}
        {...other}
      >
        <BasePopover.Root open={open} onOpenChange={setOpen}>
          <BasePopover.Trigger
            disabled={disabled}
            nativeButton={false}
            render={
              <Box
                component="div"
                sx={{
                  width: "100%",
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                <Input
                  readOnly
                  disabled={disabled}
                  error={error}
                  size={size}
                  value={formattedValue}
                  placeholder={placeholder}
                  startAdornment={<CalendarIcon />}
                  endAdornment={
                    clearable && selectedDate && !disabled ? (
                      <Box
                        component="button"
                        type="button"
                        onClick={handleClear}
                        sx={{
                          background: "none",
                          border: "none",
                          p: 0.25,
                          color: "var(--theme-color-text-disabled)",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          "&:hover": {
                            color: "var(--theme-color-text-primary)",
                          },
                        }}
                      >
                        <CloseIcon />
                      </Box>
                    ) : undefined
                  }
                  sx={{ cursor: "pointer" }}
                />
              </Box>
            }
          />

          <BasePopover.Portal>
            <BasePopover.Positioner sideOffset={8}>
              <BasePopover.Popup
                render={
                  <Box
                    sx={{
                      zIndex: 1400,
                      outline: "none",
                      animation: "popoverIn 150ms ease-out",
                      "@keyframes popoverIn": {
                        from: { opacity: 0, transform: "scale(0.96)" },
                        to: { opacity: 1, transform: "scale(1)" },
                      },
                    }}
                  >
                    <Calendar
                      value={selectedDate}
                      onChange={handleSelectDate}
                      minDate={minDate}
                      maxDate={maxDate}
                      isDateDisabled={isDateDisabled}
                    />
                  </Box>
                }
              />
            </BasePopover.Positioner>
          </BasePopover.Portal>
        </BasePopover.Root>
      </Box>
    );
  },
);

DatePicker.displayName = "DatePicker";

export * from "./date-picker.styles";
export * from "./date-picker.types";
export * from "./date-picker-context";
