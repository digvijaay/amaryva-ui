import * as React from "react";

// ----------------------------------------------------------------------
// Breadcrumb Context
// ----------------------------------------------------------------------

export type BreadcrumbContextValue = Record<string, unknown>;

export const BreadcrumbContext =
  React.createContext<BreadcrumbContextValue | null>(null);

export const useBreadcrumbContext = () => React.useContext(BreadcrumbContext);
