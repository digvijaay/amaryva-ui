import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { PaginationLinkProps, PaginationProps } from "./pagination.types";

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

// ----------------------------------------------------------------------
// Subcomponents
// ----------------------------------------------------------------------

export const PaginationRoot = React.forwardRef<HTMLElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      component="nav"
      aria-label="pagination"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      className={`flex items-center justify-center ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
PaginationRoot.displayName = "PaginationRoot";

export const PaginationContent = React.forwardRef<HTMLUListElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      component="ul"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 0.75,
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
  ),
);
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = React.forwardRef<HTMLLIElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      component="li"
      sx={{ display: "inline-flex", ...sx }}
      className={`inline-flex ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
PaginationItem.displayName = "PaginationItem";

export const PaginationLink = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(
  (
    {
      isActive = false,
      size = "medium",
      color = "primary",
      disabled = false,
      sx,
      className,
      children,
      ...other
    },
    ref,
  ) => {
    const sizeStyles = {
      small: {
        width: 28,
        height: 28,
        fontSize: "0.75rem",
        borderRadius: "6px",
      },
      medium: {
        width: 34,
        height: 34,
        fontSize: "0.875rem",
        borderRadius: "8px",
      },
      large: {
        width: 40,
        height: 40,
        fontSize: "0.9375rem",
        borderRadius: "10px",
      },
    };

    const getActiveStyles = () => {
      if (!isActive) {
        return {
          backgroundColor: "transparent",
          color: "var(--theme-color-text-primary)",
          "&:hover:not([disabled])": {
            backgroundColor:
              "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
          },
        };
      }
      if (color === "inherit") {
        return {
          backgroundColor: "var(--theme-color-text-primary)",
          color: "var(--theme-color-background-paper)",
        };
      }
      return {
        backgroundColor: `var(--theme-color-${color}-main)`,
        color: `var(--theme-color-${color}-contrast-text, #FFFFFF)`,
        boxShadow: `var(--theme-shadow-${color}, 0 4px 12px rgba(0, 0, 0, 0.16))`,
      };
    };

    const baseSx: Record<string, unknown> = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: isActive ? 600 : 500,
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      userSelect: "none",
      transition: "all 150ms ease",
      opacity: disabled ? 0.45 : 1,
      ...sizeStyles[size],
      ...getActiveStyles(),
      ...sx,
    };

    return (
      <Box
        ref={ref}
        component="button"
        type="button"
        disabled={disabled}
        aria-current={isActive ? "page" : undefined}
        sx={baseSx}
        className={`inline-flex items-center justify-center cursor-pointer transition-colors ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);
PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(({ size = "medium", sx, className, children, ...other }, ref) => (
  <PaginationLink
    ref={ref}
    size={size}
    aria-label="Go to previous page"
    sx={{ width: "auto", px: 1.5, gap: 0.5, ...sx }}
    className={`gap-1 ${className || ""}`.trim()}
    {...other}
  >
    <ChevronLeftIcon />
    <span>{children || "Previous"}</span>
  </PaginationLink>
));
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(({ size = "medium", sx, className, children, ...other }, ref) => (
  <PaginationLink
    ref={ref}
    size={size}
    aria-label="Go to next page"
    sx={{ width: "auto", px: 1.5, gap: 0.5, ...sx }}
    className={`gap-1 ${className || ""}`.trim()}
    {...other}
  >
    <span>{children || "Next"}</span>
    <ChevronRightIcon />
  </PaginationLink>
));
PaginationNext.displayName = "PaginationNext";

export const PaginationEllipsis = React.forwardRef<HTMLSpanElement, BoxProps>(
  ({ sx, className, ...other }, ref) => (
    <Box
      ref={ref}
      component="span"
      aria-hidden="true"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        color: "var(--theme-color-text-disabled)",
        fontSize: "1rem",
        letterSpacing: 2,
        ...sx,
      }}
      className={`inline-flex items-center justify-center select-none ${className || ""}`.trim()}
      {...other}
    >
      …<span className="sr-only">More pages</span>
    </Box>
  ),
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const PaginationComponent = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      count = 1,
      page: pageProp,
      defaultPage = 1,
      onChange,
      siblingCount = 1,
      boundaryCount = 1,
      disabled = false,
      size = "medium",
      color = "primary",
      showFirstButton,
      showLastButton,
      children,
      ...other
    },
    ref,
  ) => {
    const [pageState, setPageState] = React.useState(defaultPage);
    const isControlled = pageProp !== undefined;
    const page = isControlled ? pageProp : pageState;

    if (children) {
      return (
        <PaginationRoot ref={ref} {...other}>
          {children}
        </PaginationRoot>
      );
    }

    const handlePageChange = (
      event: React.MouseEvent<HTMLElement>,
      newPage: number,
    ) => {
      if (disabled || newPage < 1 || newPage > count || newPage === page)
        return;
      if (!isControlled) {
        setPageState(newPage);
      }
      onChange?.(event as unknown as React.ChangeEvent<unknown>, newPage);
    };

    // Generate page list with boundaries & siblings
    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, i) => start + i);
    };

    const startPages = range(1, Math.min(boundaryCount, count));
    const endPages = range(
      Math.max(count - boundaryCount + 1, boundaryCount + 1),
      count,
    );

    const siblingsStart = Math.max(
      Math.min(
        page - siblingCount,
        count - boundaryCount - siblingCount * 2 - 1,
      ),
      boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : count - 1,
    );

    const itemList: (number | "start-ellipsis" | "end-ellipsis")[] = [
      ...startPages,
      ...(siblingsStart > boundaryCount + 2
        ? (["start-ellipsis"] as const)
        : boundaryCount + 1 < count - boundaryCount
          ? [boundaryCount + 1]
          : []),
      ...range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < count - boundaryCount - 1
        ? (["end-ellipsis"] as const)
        : count - boundaryCount > boundaryCount
          ? [count - boundaryCount]
          : []),
      ...endPages,
    ];

    return (
      <PaginationRoot ref={ref} {...other}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={disabled || page <= 1}
              size={size}
              color={color}
              onClick={(e) => handlePageChange(e, page - 1)}
            />
          </PaginationItem>

          {itemList.map((item) => {
            if (item === "start-ellipsis" || item === "end-ellipsis") {
              return (
                <PaginationItem key={item}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const pageNum = item;
            const isSelected = pageNum === page;

            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={isSelected}
                  size={size}
                  color={color}
                  disabled={disabled}
                  onClick={(e) => handlePageChange(e, pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              disabled={disabled || page >= count}
              size={size}
              color={color}
              onClick={(e) => handlePageChange(e, page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    );
  },
);

PaginationComponent.displayName = "Pagination";

export const Pagination = Object.assign(PaginationComponent, {
  Root: PaginationRoot,
  Content: PaginationContent,
  Item: PaginationItem,
  Link: PaginationLink,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  Ellipsis: PaginationEllipsis,
});

export * from "./pagination.styles";
export * from "./pagination.types";
export * from "./pagination-context";
