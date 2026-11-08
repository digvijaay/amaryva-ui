import * as React from "react";
import type { AccordionContextValue } from "./accordion.types";

export const AccordionContext = React.createContext<AccordionContextValue>({
  variant: "outlined",
  transitionDuration: 300,
  disableHover: false,
  activeColor: undefined,
  disableTopPadding: undefined,
});

export const useAccordionContext = () => React.useContext(AccordionContext);
