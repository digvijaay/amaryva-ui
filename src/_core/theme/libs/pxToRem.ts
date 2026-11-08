/**
 * Converts pixel values to equivalent CSS rem units based on standard 16px root font size.
 *
 * @param value - Numerical value in pixels
 * @returns Formatted rem string
 *
 * @example
 * pxToRem(16) // '1rem'
 * pxToRem(24) // '1.5rem'
 */
export function pxToRem(value: number): string {
  return `${value / 16}rem`;
}
