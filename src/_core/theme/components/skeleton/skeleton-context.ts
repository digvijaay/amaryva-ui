import * as React from "react";

// ----------------------------------------------------------------------
// Skeleton Context
// ----------------------------------------------------------------------

export type SkeletonContextValue = Record<string, unknown>;

export const SkeletonContext = React.createContext<SkeletonContextValue | null>(
  null,
);

export const useSkeletonContext = () => React.useContext(SkeletonContext);
