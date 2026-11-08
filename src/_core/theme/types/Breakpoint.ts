/**
 * Standard Tailwind CSS responsive breakpoints and responsive media query helpers.
 */

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export const breakpointKeys: readonly Breakpoint[] = [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const;

export const breakpointValues: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export interface BreakpointHelpers {
  keys: readonly Breakpoint[];
  values: Record<Breakpoint, number>;
  up: (key: Breakpoint | number) => string;
  down: (key: Breakpoint | number) => string;
  between: (start: Breakpoint | number, end: Breakpoint | number) => string;
  only: (key: Breakpoint) => string;
}

export const breakpoints: BreakpointHelpers = {
  keys: breakpointKeys,
  values: breakpointValues,
  up: (key: Breakpoint | number) => {
    const value = typeof key === "number" ? key : breakpointValues[key];
    return `@media (min-width: ${value}px)`;
  },
  down: (key: Breakpoint | number) => {
    const value = typeof key === "number" ? key : breakpointValues[key];
    return `@media (max-width: ${value - 0.05}px)`;
  },
  between: (start: Breakpoint | number, end: Breakpoint | number) => {
    const min = typeof start === "number" ? start : breakpointValues[start];
    const max = typeof end === "number" ? end : breakpointValues[end];
    return `@media (min-width: ${min}px) and (max-width: ${max - 0.05}px)`;
  },
  only: (key: Breakpoint) => {
    const keys = breakpointKeys;
    const index = keys.indexOf(key);
    if (index === keys.length - 1) {
      return breakpoints.up(key);
    }
    const nextKey = keys[index + 1];
    return breakpoints.between(key, nextKey);
  },
};
