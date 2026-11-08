import * as React from "react";

// ----------------------------------------------------------------------
// Autocomplete Context
// ----------------------------------------------------------------------

export type AutocompleteContextValue = Record<string, unknown>;

export const AutocompleteContext =
  React.createContext<AutocompleteContextValue | null>(null);

export const useAutocompleteContext = () =>
  React.useContext(AutocompleteContext);
