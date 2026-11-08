import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { CarouselContext, useCarousel } from "./carousel-context";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
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
// Carousel Root & Content
// ----------------------------------------------------------------------

export interface CarouselProps extends BoxProps {
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
}

const CarouselRoot = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      autoPlay = false,
      interval = 4000,
      loop = true,
      children,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [totalSlides, setTotalSlides] = React.useState(0);

    const canPrev = loop || currentIndex > 0;
    const canNext = loop || currentIndex < totalSlides - 1;

    const goTo = React.useCallback(
      (index: number) => {
        if (totalSlides === 0) return;
        if (loop) {
          const wrapped = (index + totalSlides) % totalSlides;
          setCurrentIndex(wrapped);
        } else {
          setCurrentIndex(Math.max(0, Math.min(totalSlides - 1, index)));
        }
      },
      [loop, totalSlides],
    );

    const prev = React.useCallback(
      () => goTo(currentIndex - 1),
      [goTo, currentIndex],
    );
    const next = React.useCallback(
      () => goTo(currentIndex + 1),
      [goTo, currentIndex],
    );

    // Autoplay
    React.useEffect(() => {
      if (!autoPlay || totalSlides <= 1) return;
      const timer = setInterval(next, interval);
      return () => clearInterval(timer);
    }, [autoPlay, interval, next, totalSlides]);

    // Keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };

    return (
      <CarouselContext.Provider
        value={{
          currentIndex,
          totalSlides,
          goTo,
          prev,
          next,
          canPrev,
          canNext,
        }}
      >
        <Box
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            outline: "none",
            ...sx,
          }}
          className={`relative w-full overflow-hidden focus-visible:ring-2 focus-visible:ring-primary ${className || ""}`.trim()}
          {...other}
        >
          {/* Internal bridge to count slides */}
          <CarouselCollector onCountChange={setTotalSlides}>
            {children}
          </CarouselCollector>
        </Box>
      </CarouselContext.Provider>
    );
  },
);
CarouselRoot.displayName = "Carousel";

function CarouselCollector({
  children,
  onCountChange,
}: {
  children: React.ReactNode;
  onCountChange: (count: number) => void;
}) {
  React.useEffect(() => {
    let count = 0;
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        (child.type as { displayName?: string })?.displayName ===
          "CarouselContent"
      ) {
        count = React.Children.count(
          (child.props as { children?: React.ReactNode }).children,
        );
      }
    });
    onCountChange(count);
  }, [children, onCountChange]);

  return <>{children}</>;
}

export const CarouselContent = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    const { currentIndex } = useCarousel();

    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
          ...sx,
        }}
        className={`flex ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      role="group"
      aria-roledescription="slide"
      sx={{
        minWidth: "100%",
        flex: "0 0 100%",
        ...sx,
      }}
      className={`min-w-full shrink-0 grow-0 basis-full ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    const { prev, canPrev } = useCarousel();

    return (
      <Box
        ref={ref}
        component="button"
        type="button"
        disabled={!canPrev}
        onClick={prev}
        aria-label="Previous slide"
        sx={{
          position: "absolute",
          top: "50%",
          left: 12,
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border:
            "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
          backgroundColor:
            "rgba(var(--theme-color-background-paper-channel, 255 255 255) / 0.85)",
          backdropFilter: "blur(6px)",
          color: "var(--theme-color-text-primary)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
          cursor: canPrev ? "pointer" : "not-allowed",
          opacity: canPrev ? 1 : 0.4,
          transition: "all 150ms ease",
          "&:hover:not([disabled])": {
            backgroundColor: "var(--theme-color-background-paper)",
            transform: "translateY(-50%) scale(1.08)",
          },
          ...sx,
        }}
        className={`absolute left-3 top-1/2 -translate-y-1/2 rounded-full cursor-pointer ${className || ""}`.trim()}
        {...other}
      >
        {children || <ChevronLeftIcon />}
      </Box>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<HTMLButtonElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => {
    const { next, canNext } = useCarousel();

    return (
      <Box
        ref={ref}
        component="button"
        type="button"
        disabled={!canNext}
        onClick={next}
        aria-label="Next slide"
        sx={{
          position: "absolute",
          top: "50%",
          right: 12,
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border:
            "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
          backgroundColor:
            "rgba(var(--theme-color-background-paper-channel, 255 255 255) / 0.85)",
          backdropFilter: "blur(6px)",
          color: "var(--theme-color-text-primary)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
          cursor: canNext ? "pointer" : "not-allowed",
          opacity: canNext ? 1 : 0.4,
          transition: "all 150ms ease",
          "&:hover:not([disabled])": {
            backgroundColor: "var(--theme-color-background-paper)",
            transform: "translateY(-50%) scale(1.08)",
          },
          ...sx,
        }}
        className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full cursor-pointer ${className || ""}`.trim()}
        {...other}
      >
        {children || <ChevronRightIcon />}
      </Box>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export const CarouselDots = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, ...other }, ref) => {
    const { currentIndex, totalSlides, goTo } = useCarousel();

    if (totalSlides <= 1) return null;

    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          py: 1.5,
          ...sx,
        }}
        className={`flex items-center justify-center gap-2 ${className || ""}`.trim()}
        {...other}
      >
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <Box
              // biome-ignore lint/suspicious/noArrayIndexKey: carousel slide dots are purely positional
              key={index}
              component="button"
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              sx={{
                width: isActive ? 20 : 8,
                height: 8,
                borderRadius: "4px",
                border: "none",
                p: 0,
                backgroundColor: isActive
                  ? "var(--theme-color-primary-main)"
                  : "var(--theme-color-divider, rgba(145, 158, 171, 0.3))",
                cursor: "pointer",
                transition: "all 250ms ease",
                "&:hover": {
                  backgroundColor: isActive
                    ? "var(--theme-color-primary-main)"
                    : "var(--theme-color-text-secondary)",
                },
              }}
            />
          );
        })}
      </Box>
    );
  },
);
CarouselDots.displayName = "CarouselDots";

export type CarouselComponent = typeof CarouselRoot & {
  Content: typeof CarouselContent;
  Item: typeof CarouselItem;
  Previous: typeof CarouselPrevious;
  Next: typeof CarouselNext;
  Dots: typeof CarouselDots;
};

export const Carousel = CarouselRoot as CarouselComponent;
Carousel.Content = CarouselContent;
Carousel.Item = CarouselItem;
Carousel.Previous = CarouselPrevious;
Carousel.Next = CarouselNext;
Carousel.Dots = CarouselDots;

export * from "./carousel.styles";
export * from "./carousel.types";
export * from "./carousel-context";
