import * as React from "react";
import type { CommandContextValue } from "./command.types";

export const CommandContext = React.createContext<CommandContextValue>({
  search: "",
  setSearch: () => {},
  selectedId: null,
  setSelectedId: () => {},
  itemCount: 0,
  registerItem: () => () => {},
  hasMatches: true,
});

export function useCommand() {
  return React.useContext(CommandContext);
}
