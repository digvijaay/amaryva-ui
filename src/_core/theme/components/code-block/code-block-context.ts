import * as React from "react";

// ----------------------------------------------------------------------
// CodeBlock Context
// ----------------------------------------------------------------------

export type CodeBlockContextValue = Record<string, unknown>;

export const CodeBlockContext =
  React.createContext<CodeBlockContextValue | null>(null);

export const useCodeBlockContext = () => React.useContext(CodeBlockContext);
