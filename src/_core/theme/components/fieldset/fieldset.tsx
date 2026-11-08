import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { FieldsetLegendProps, FieldsetProps } from "./fieldset.types";

export const FieldsetLegend = React.forwardRef<
  HTMLLegendElement,
  FieldsetLegendProps
>(({ sx, className, children, ...other }, ref) => {
  return (
    <BaseFieldset.Legend
      render={
        <Box
          component="legend"
          ref={ref}
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--theme-color-text-primary)",
            px: 1,
            ...sx,
          }}
          className={`font-semibold px-2 ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Box>
      }
    />
  );
});
FieldsetLegend.displayName = "FieldsetLegend";

export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    { legend, disabled = false, children, sx, className, slotProps, ...other },
    ref,
  ) => {
    const baseSx: Record<string, unknown> = {
      border: "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
      borderRadius: "var(--theme-shape-borderRadius, 8px)",
      p: 2.5,
      m: 0,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      opacity: disabled ? 0.48 : 1,
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    return (
      <BaseFieldset.Root
        disabled={disabled}
        render={
          <Box
            component="fieldset"
            ref={ref}
            sx={mergedRootSx}
            className={`flex flex-col gap-4 ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
            {...other}
            {...slotProps?.root}
          >
            {legend && (
              <FieldsetLegend {...slotProps?.legend}>{legend}</FieldsetLegend>
            )}
            {children}
          </Box>
        }
      />
    );
  },
) as unknown as React.ForwardRefExoticComponent<
  FieldsetProps & React.RefAttributes<HTMLFieldSetElement>
> & {
  Root: typeof BaseFieldset.Root;
  Legend: typeof FieldsetLegend;
};

Fieldset.displayName = "Fieldset";
Fieldset.Root = BaseFieldset.Root;
Fieldset.Legend = FieldsetLegend;

export * from "./fieldset.styles";
export * from "./fieldset.types";
export * from "./fieldset-context";
