import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { CollapsibleProps } from "./collapsible.types";

// ----------------------------------------------------------------------

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

export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      children,
      title,
      open,
      defaultOpen,
      onOpenChange,
      disabled = false,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const baseSx: Record<string, unknown> = {
      borderRadius: "var(--theme-shape-borderRadius, 8px)",
      border: "1px solid var(--theme-color-divider)",
      backgroundColor: "var(--theme-color-background-paper)",
      overflow: "hidden",
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedRootSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    return (
      <BaseCollapsible.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        disabled={disabled}
      >
        <Box
          ref={ref}
          sx={mergedRootSx}
          className={`flex flex-col transition-colors duration-200 ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
          {...other}
          {...slotProps?.root}
        >
          {title && (
            <BaseCollapsible.Trigger
              render={
                <Box
                  component="button"
                  type="button"
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "var(--theme-color-text-primary)",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.48 : 1,
                    transition: "background-color 150ms ease",
                    "&:hover:not([disabled])": {
                      backgroundColor:
                        "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
                    },
                    ...slotProps?.trigger?.sx,
                  }}
                  className={`w-full text-left font-medium select-none ${slotProps?.trigger?.className || ""}`.trim()}
                  {...slotProps?.trigger}
                >
                  <Box
                    component="span"
                    sx={{ fontWeight: 600, fontSize: "0.9375rem" }}
                  >
                    {title}
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      transition: "transform 200ms ease",
                      "&[data-panel-open]": {
                        transform: "rotate(180deg)",
                      },
                    }}
                  >
                    <ChevronDownIcon />
                  </Box>
                </Box>
              }
            />
          )}

          <BaseCollapsible.Panel
            render={
              <Box
                sx={{
                  overflow: "hidden",
                  transition: "height 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                  ...slotProps?.panel?.sx,
                }}
                className={slotProps?.panel?.className}
                {...slotProps?.panel}
              >
                <Box
                  sx={{
                    p: 2,
                    pt: title ? 0 : 2,
                    color: "var(--theme-color-text-secondary)",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                  }}
                >
                  {children}
                </Box>
              </Box>
            }
          />
        </Box>
      </BaseCollapsible.Root>
    );
  },
) as unknown as React.ForwardRefExoticComponent<
  CollapsibleProps & React.RefAttributes<HTMLDivElement>
> & {
  Root: typeof BaseCollapsible.Root;
  Trigger: typeof BaseCollapsible.Trigger;
  Panel: typeof BaseCollapsible.Panel;
};

Collapsible.displayName = "Collapsible";
Collapsible.Root = BaseCollapsible.Root;
Collapsible.Trigger = BaseCollapsible.Trigger;
Collapsible.Panel = BaseCollapsible.Panel;

export * from "./collapsible.styles";
export * from "./collapsible.types";
export * from "./collapsible-context";
