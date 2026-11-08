import { Box } from "@mui/system";
import * as React from "react";
import type {
  DirectionContextValue,
  DirectionProps,
  DirectionProviderProps,
} from "./direction.types";
import { DirectionContext, useDirection } from "./direction-context";

export function DirectionProvider({
  direction = "ltr",
  children,
}: DirectionProviderProps) {
  const value = React.useMemo<DirectionContextValue>(
    () => ({
      direction,
      isRtl: direction === "rtl",
    }),
    [direction],
  );

  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  );
}

export const Direction = React.forwardRef<HTMLDivElement, DirectionProps>(
  ({ dir = "ltr", children, sx, className, ...other }, ref) => {
    return (
      <DirectionProvider direction={dir}>
        <Box
          ref={ref}
          dir={dir}
          sx={{
            direction: dir,
            ...sx,
          }}
          className={className}
          {...other}
        >
          {children}
        </Box>
      </DirectionProvider>
    );
  },
);

Direction.displayName = "Direction";

export { useDirection };
export * from "./direction.styles";
export * from "./direction.types";
export * from "./direction-context";
