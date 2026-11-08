import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { BreadcrumbProps } from "./breadcrumb.types";

// ----------------------------------------------------------------------

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function MoreHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const BreadcrumbRoot = React.forwardRef<HTMLElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        component="nav"
        aria-label="breadcrumb"
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "0.875rem",
          color: "var(--theme-color-text-secondary)",
          ...sx,
        }}
        className={`flex items-center text-sm ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);
BreadcrumbRoot.displayName = "BreadcrumbRoot";

export const BreadcrumbList = React.forwardRef<HTMLOListElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        component="ol"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1,
          p: 0,
          m: 0,
          listStyle: "none",
          ...sx,
        }}
        className={`flex flex-wrap items-center gap-1.5 p-0 m-0 list-none ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        component="li"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          ...sx,
        }}
        className={`inline-flex items-center gap-1.5 ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BoxProps & { href?: string }
>(({ href, sx, className, children, ...other }, ref) => {
  return (
    <Box
      ref={ref}
      component={href ? "a" : "span"}
      href={href}
      sx={{
        color: "var(--theme-color-text-secondary)",
        textDecoration: "none",
        cursor: href ? "pointer" : "default",
        transition: "color 150ms ease",
        "&:hover": href
          ? {
              color: "var(--theme-color-text-primary)",
              textDecoration: "underline",
            }
          : undefined,
        ...sx,
      }}
      className={`transition-colors ${href ? "hover:underline cursor-pointer" : ""} ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        component="span"
        role="link"
        aria-disabled="true"
        aria-current="page"
        sx={{
          fontWeight: 600,
          color: "var(--theme-color-text-primary)",
          ...sx,
        }}
        className={`font-semibold text-text-primary ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        component="span"
        role="presentation"
        aria-hidden="true"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--theme-color-text-disabled)",
          mx: 0.25,
          ...sx,
        }}
        className={`inline-flex items-center justify-center select-none ${className || ""}`.trim()}
        {...other}
      >
        {children || <ChevronRightIcon />}
      </Box>
    );
  },
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, BoxProps>(
  ({ sx, className, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        component="span"
        role="presentation"
        aria-hidden="true"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          color: "var(--theme-color-text-secondary)",
          ...sx,
        }}
        className={`inline-flex items-center justify-center select-none ${className || ""}`.trim()}
        {...other}
      >
        <MoreHorizontalIcon />
        <span className="sr-only">More</span>
      </Box>
    );
  },
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

const BreadcrumbComponent = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    { items, separator, maxItems, slots, slotProps, children, ...other },
    ref,
  ) => {
    if (children) {
      return (
        <BreadcrumbRoot ref={ref} {...slotProps?.root} {...other}>
          {children}
        </BreadcrumbRoot>
      );
    }

    if (!items || items.length === 0) {
      return null;
    }

    const renderItems = () => {
      if (!maxItems || items.length <= maxItems) {
        return items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: Static breadcrumb sequence
            <React.Fragment key={index}>
              <BreadcrumbItem {...slotProps?.item}>
                {isLast ? (
                  <BreadcrumbPage>
                    {item.icon && (
                      <span style={{ marginRight: 6 }}>{item.icon}</span>
                    )}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>
                    {item.icon && (
                      <span style={{ marginRight: 6 }}>{item.icon}</span>
                    )}
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator {...slotProps?.separator}>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        });
      }

      // Handle ellipsis when exceeding maxItems
      const firstItem = items[0];
      const lastItems = items.slice(-(maxItems - 1));

      return (
        <>
          <BreadcrumbItem {...slotProps?.item}>
            <BreadcrumbLink href={firstItem.href}>
              {firstItem.icon && (
                <span style={{ marginRight: 6 }}>{firstItem.icon}</span>
              )}
              {firstItem.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator {...slotProps?.separator}>
            {separator}
          </BreadcrumbSeparator>

          <BreadcrumbItem {...slotProps?.item}>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator {...slotProps?.separator}>
            {separator}
          </BreadcrumbSeparator>

          {lastItems.map((item, idx) => {
            const isLast = idx === lastItems.length - 1;
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: Static breadcrumb sequence
              <React.Fragment key={idx}>
                <BreadcrumbItem {...slotProps?.item}>
                  {isLast ? (
                    <BreadcrumbPage>
                      {item.icon && (
                        <span style={{ marginRight: 6 }}>{item.icon}</span>
                      )}
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      {item.icon && (
                        <span style={{ marginRight: 6 }}>{item.icon}</span>
                      )}
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator {...slotProps?.separator}>
                    {separator}
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </>
      );
    };

    return (
      <BreadcrumbRoot ref={ref} {...slotProps?.root} {...other}>
        <BreadcrumbList {...slotProps?.list}>{renderItems()}</BreadcrumbList>
      </BreadcrumbRoot>
    );
  },
);

BreadcrumbComponent.displayName = "Breadcrumb";

export const Breadcrumb = Object.assign(BreadcrumbComponent, {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
});

export * from "./breadcrumb.styles";
export * from "./breadcrumb.types";
export * from "./breadcrumb-context";
