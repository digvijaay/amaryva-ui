import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { Box } from "@mui/system";
import * as React from "react";
import type { SeparatorProps } from "./separator.types";

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = "horizontal", sx, className, ...other }, ref) => {
    const isHorizontal = orientation === "horizontal";

    return (
      <BaseSeparator
        orientation={orientation}
        render={
          <Box
            ref={ref}
            sx={{
              backgroundColor:
                "var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
              width: isHorizontal ? "100%" : "1px",
              height: isHorizontal ? "1px" : "100%",
              minHeight: isHorizontal ? undefined : 16,
              shrink: 0,
              ...sx,
            }}
            className={`shrink-0 ${isHorizontal ? "w-full h-px" : "h-full w-px"} ${className || ""}`.trim()}
            {...other}
          />
        }
      />
    );
  },
);

Separator.displayName = "Separator";

export * from "./separator.styles";
export * from "./separator.types";
export * from "./separator-context";
