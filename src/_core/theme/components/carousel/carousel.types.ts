import type { BoxProps } from "@mui/system";

export interface CarouselContextValue {
  currentIndex: number;
  totalSlides: number;
  goTo: (index: number) => void;
  prev: () => void;
  next: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export interface CarouselProps extends BoxProps {
  defaultSlide?: number;
  slide?: number;
  onSlideChange?: (index: number) => void;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export interface CarouselContentProps extends BoxProps {}
export interface CarouselItemProps extends BoxProps {
  index?: number;
}
export interface CarouselPreviousProps extends BoxProps {}
export interface CarouselNextProps extends BoxProps {}
export interface CarouselDotsProps extends BoxProps {}
