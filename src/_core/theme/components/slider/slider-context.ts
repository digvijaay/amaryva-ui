import * as React from "react";

// ----------------------------------------------------------------------
// Slider Context
// ----------------------------------------------------------------------

export type SliderContextValue = Record<string, unknown>;

export const SliderContext = React.createContext<SliderContextValue | null>(
  null,
);

export const useSliderContext = () => React.useContext(SliderContext);
