import * as React from "react";
import type { CarouselContextValue } from "./carousel.types";

export const CarouselContext = React.createContext<CarouselContextValue>({
  currentIndex: 0,
  totalSlides: 0,
  goTo: () => {},
  prev: () => {},
  next: () => {},
  canPrev: false,
  canNext: false,
});

export function useCarousel() {
  return React.useContext(CarouselContext);
}
