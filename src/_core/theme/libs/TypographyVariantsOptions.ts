import { breakpoints } from "../types/Breakpoint";
import type {
  ResponsiveFontSizesInput,
  ResponsiveFontSizesResult,
} from "../types/Typography";
import { pxToRem } from "./pxToRem";

export type {
  FontStyleExtend,
  ResponsiveFontSizesInput,
  ResponsiveFontSizesResult,
  TypographyVariant,
  TypographyVariantsOptions,
} from "../types/Typography";

/**
 * Creates responsive font sizes across Tailwind breakpoints
 *
 * @param obj - Object mapping breakpoints ('sm', 'md', 'lg', 'xl', '2xl') to pixel font sizes
 * @returns Object with media query keys and font size rules
 */
export function responsiveFontSizes(
  obj: ResponsiveFontSizesInput,
): ResponsiveFontSizesResult {
  const result: ResponsiveFontSizesResult = {};

  for (const key of breakpoints.keys) {
    const value = obj[key];
    if (value !== undefined && value > 0) {
      result[breakpoints.up(key)] = {
        fontSize: pxToRem(value),
      };
    }
  }

  return result;
}
