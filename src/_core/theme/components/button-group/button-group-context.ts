import * as React from "react";
import type { ButtonColor, ButtonSize, ButtonVariant } from "../button";
import type { ButtonGroupOrientation } from "./button-group.types";

export interface ButtonGroupContextValue {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  orientation?: ButtonGroupOrientation;
}

export const ButtonGroupContext = React.createContext<ButtonGroupContextValue>(
  {},
);

export const useButtonGroup = () => React.useContext(ButtonGroupContext);
