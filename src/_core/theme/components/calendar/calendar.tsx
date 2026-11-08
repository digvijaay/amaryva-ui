import { Box } from "@mui/system";
import * as React from "react";
import type { CalendarProps } from "./calendar.types";

// ----------------------------------------------------------------------

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onChange,
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
    const isControlled = valueProp !== undefined;
    const selectedDate = isControlled ? valueProp : selectedState;

    // View date tracking the currently shown month & year
    const [viewDate, setViewDate] = React.useState<Date>(
      () => selectedDate || defaultValue || new Date(2026, 0, 1),
    );
    const [today, setToday] = React.useState<Date | null>(null);

    React.useEffect(() => {
      setToday(new Date());
      if (!selectedDate && !defaultValue) {
        setViewDate(new Date());
      }
    }, [selectedDate, defaultValue]);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const prevMonth = () => {
      setViewDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
      setViewDate(new Date(year, month + 1, 1));
    };

    const handleSelect = (d: Date) => {
      if (!isControlled) {
        setSelectedState(d);
      }
      onChange?.(d);
    };

    // Build days matrix for the month
    const calendarDays = React.useMemo(() => {
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrevMonth = new Date(year, month, 0).getDate();

      const days: { date: Date; isOutside: boolean }[] = [];

      // Leading days from previous month
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        days.push({
          date: new Date(year, month - 1, daysInPrevMonth - i),
          isOutside: true,
        });
      }

      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          date: new Date(year, month, i),
          isOutside: false,
        });
      }

      // Trailing days to round out 42 grid cells (6 rows x 7 cols)
      const totalCells = days.length > 35 ? 42 : 35;
      const remaining = totalCells - days.length;
      for (let i = 1; i <= remaining; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          isOutside: true,
        });
      }

      return days;
    }, [year, month]);

    const isSameDay = (d1: Date | null, d2: Date) => {
      if (!d1) return false;
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    };

    const isToday = (d: Date) => (today ? isSameDay(today, d) : false);

    const isDayDisabled = (d: Date) => {
      if (
        minDate &&
        d <
          new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())
      ) {
        return true;
      }
      if (
        maxDate &&
        d >
          new Date(
            maxDate.getFullYear(),
            maxDate.getMonth(),
            maxDate.getDate(),
            23,
            59,
            59,
          )
      ) {
        return true;
      }
      return isDateDisabled ? isDateDisabled(d) : false;
    };

    return (
      <Box
        ref={ref}
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          p: 2,
          borderRadius: "var(--theme-shape-borderRadius, 12px)",
          border:
            "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
          backgroundColor: "var(--theme-color-background-paper)",
          boxShadow:
            "var(--theme-shadow-dropdown, 0 8px 24px rgba(0, 0, 0, 0.08))",
          width: 300,
          userSelect: "none",
          ...sx,
        }}
        className={`inline-flex flex-col select-none rounded-xl ${className || ""}`.trim()}
        {...other}
      >
        {/* Navigation Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <Box
            sx={{
              fontWeight: 700,
              fontSize: "0.9375rem",
              color: "var(--theme-color-text-primary)",
            }}
          >
            {MONTH_NAMES[month]} {year}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              component="button"
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "6px",
                border:
                  "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
                backgroundColor: "transparent",
                color: "var(--theme-color-text-secondary)",
                cursor: "pointer",
                transition: "all 150ms ease",
                "&:hover": {
                  backgroundColor: "var(--theme-color-action-hover)",
                  color: "var(--theme-color-text-primary)",
                },
              }}
            >
              <ChevronLeftIcon />
            </Box>

            <Box
              component="button"
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: "6px",
                border:
                  "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
                backgroundColor: "transparent",
                color: "var(--theme-color-text-secondary)",
                cursor: "pointer",
                transition: "all 150ms ease",
                "&:hover": {
                  backgroundColor: "var(--theme-color-action-hover)",
                  color: "var(--theme-color-text-primary)",
                },
              }}
            >
              <ChevronRightIcon />
            </Box>
          </Box>
        </Box>

        {/* Days of week header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 0.5,
            mb: 1,
          }}
        >
          {WEEK_DAYS.map((day) => (
            <Box
              key={day}
              sx={{
                textAlign: "center",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--theme-color-text-disabled)",
                py: 0.5,
              }}
            >
              {day}
            </Box>
          ))}
        </Box>

        {/* Calendar days grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 0.5,
          }}
        >
          {calendarDays.map(({ date, isOutside }) => {
            const isSelected = isSameDay(selectedDate, date);
            const disabled = isDayDisabled(date);
            const today = isToday(date);

            return (
              <Box
                key={date.toISOString()}
                component="button"
                type="button"
                disabled={disabled}
                onClick={() => handleSelect(date)}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 36,
                  borderRadius: "8px",
                  fontSize: "0.8125rem",
                  fontWeight: isSelected || today ? 700 : 500,
                  border:
                    today && !isSelected
                      ? "1px solid var(--theme-color-primary-main)"
                      : "none",
                  backgroundColor: isSelected
                    ? "var(--theme-color-primary-main)"
                    : "transparent",
                  color: isSelected
                    ? "var(--theme-color-primary-contrast-text, #FFFFFF)"
                    : isOutside
                      ? "var(--theme-color-text-disabled)"
                      : "var(--theme-color-text-primary)",
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.35 : 1,
                  transition: "all 150ms ease",
                  "&:hover:not([disabled])": {
                    backgroundColor: isSelected
                      ? "var(--theme-color-primary-dark)"
                      : "var(--theme-color-action-hover)",
                  },
                }}
              >
                {date.getDate()}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  },
);

Calendar.displayName = "Calendar";

export * from "./calendar.styles";
export * from "./calendar.types";
export * from "./calendar-context";
