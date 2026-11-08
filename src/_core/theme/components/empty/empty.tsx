import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { EmptyProps } from "./empty.types";

// ----------------------------------------------------------------------

function DefaultEmptyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const EmptyImage = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 2,
        color: "var(--theme-color-text-disabled, #919eab)",
        ...sx,
      }}
      className={`flex items-center justify-center ${className || ""}`.trim()}
      {...other}
    >
      {children || <DefaultEmptyIcon />}
    </Box>
  ),
);
EmptyImage.displayName = "EmptyImage";

export const EmptyTitle = React.forwardRef<HTMLHeadingElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      component="h3"
      sx={{
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--theme-color-text-primary)",
        m: 0,
        mb: 0.5,
        ...sx,
      }}
      className={`font-semibold text-center m-0 ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
EmptyTitle.displayName = "EmptyTitle";

export const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  BoxProps
>(({ sx, className, children, ...other }, ref) => (
  <Box
    ref={ref}
    component="p"
    sx={{
      fontSize: "0.875rem",
      color: "var(--theme-color-text-secondary)",
      m: 0,
      maxWidth: 360,
      lineHeight: 1.5,
      ...sx,
    }}
    className={`text-sm text-center m-0 ${className || ""}`.trim()}
    {...other}
  >
    {children}
  </Box>
));
EmptyDescription.displayName = "EmptyDescription";

export const EmptyAction = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      sx={{
        mt: 2.5,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
      className={`mt-4 inline-flex items-center justify-center ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
EmptyAction.displayName = "EmptyAction";

const EmptyRoot = React.forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      image,
      title,
      description,
      action,
      children,
      slots,
      slotProps,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const Component = slots?.root || "div";
    const baseSx: Record<string, unknown> = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 6,
      px: 3,
      textAlign: "center",
    };
    const rootSlotSx = slotProps?.root?.sx;
    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(rootSlotSx
        ? Array.isArray(rootSlotSx)
          ? rootSlotSx
          : [rootSlotSx]
        : []),
    ] as BoxProps["sx"];

    return (
      <Box
        ref={ref}
        component={Component as "div"}
        sx={mergedSx}
        className={`flex flex-col items-center justify-center py-10 px-4 text-center ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        {children ? (
          children
        ) : (
          <>
            <EmptyImage {...slotProps?.image}>{image}</EmptyImage>
            {title && <EmptyTitle {...slotProps?.title}>{title}</EmptyTitle>}
            {description && (
              <EmptyDescription {...slotProps?.description}>
                {description}
              </EmptyDescription>
            )}
            {action && (
              <EmptyAction {...slotProps?.action}>{action}</EmptyAction>
            )}
          </>
        )}
      </Box>
    );
  },
);

EmptyRoot.displayName = "Empty";

export const Empty = Object.assign(EmptyRoot, {
  Image: EmptyImage,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Action: EmptyAction,
});

export * from "./empty.styles";
export * from "./empty.types";
export * from "./empty-context";
