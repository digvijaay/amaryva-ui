import { Box } from "@mui/system";
import * as React from "react";
import type {
  ResizableHandleProps,
  ResizablePanelGroupProps,
  ResizablePanelProps,
} from "./resizable.types";
import { ResizableContext, useResizable } from "./resizable-context";

// ----------------------------------------------------------------------

export const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  ResizablePanelGroupProps
>(({ direction = "horizontal", children, className, sx, ...other }, ref) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const onResizeHandle = React.useCallback(
    (_index: number, _deltaPercent: number) => {
      // Resize delta calculation
    },
    [],
  );

  const contextValue = React.useMemo(
    () => ({
      direction,
      onResizeHandle,
      containerRef,
    }),
    [direction, onResizeHandle],
  );

  return (
    <ResizableContext.Provider value={contextValue}>
      <Box
        ref={(node: HTMLDivElement | null) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        sx={{
          display: "flex",
          flexDirection: direction === "horizontal" ? "row" : "column",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          ...sx,
        }}
        className={`flex w-full h-full overflow-hidden ${
          direction === "horizontal" ? "flex-row" : "flex-col"
        } ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    </ResizableContext.Provider>
  );
});

ResizablePanelGroup.displayName = "ResizablePanelGroup";

export const ResizablePanel = React.forwardRef<
  HTMLDivElement,
  ResizablePanelProps
>(
  (
    { defaultSize, minSize, maxSize, children, className, sx, ...other },
    ref,
  ) => {
    return (
      <Box
        ref={ref}
        sx={{
          flex: defaultSize !== undefined ? `${defaultSize} 1 0%` : "1 1 0%",
          minWidth: minSize ? `${minSize}%` : undefined,
          maxWidth: maxSize ? `${maxSize}%` : undefined,
          overflow: "auto",
          ...sx,
        }}
        className={`overflow-auto ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

ResizablePanel.displayName = "ResizablePanel";

export const ResizableHandle = React.forwardRef<
  HTMLDivElement,
  ResizableHandleProps
>(
  (
    {
      withHandle = false,
      disabled = false,
      handleIndex = 0,
      containerRef: propContainerRef,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const {
      direction,
      onResizeHandle,
      containerRef: contextContainerRef,
    } = useResizable();
    const containerRef = propContainerRef || contextContainerRef;
    const isHorizontal = direction === "horizontal";

    const [isDragging, setIsDragging] = React.useState(false);

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      event.preventDefault();
      setIsDragging(true);

      const startPos = isHorizontal ? event.clientX : event.clientY;

      const handlePointerMove = (moveEvent: PointerEvent) => {
        if (!containerRef?.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const totalSize = isHorizontal ? rect.width : rect.height;
        if (totalSize <= 0) return;

        const currentPos = isHorizontal ? moveEvent.clientX : moveEvent.clientY;
        const deltaPx = currentPos - startPos;
        const deltaPercent = (deltaPx / totalSize) * 100;

        onResizeHandle(handleIndex, deltaPercent);
      };

      const handlePointerUp = () => {
        setIsDragging(false);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    };

    const baseSx: Record<string, unknown> = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
      transition: "background-color 150ms ease, box-shadow 150ms ease",
      userSelect: "none",
      touchAction: "none",
      flexShrink: 0,
      cursor: isHorizontal ? "col-resize" : "row-resize",
      ...(isHorizontal
        ? {
            width: "3px",
            height: "100%",
          }
        : {
            height: "3px",
            width: "100%",
          }),
      "&:hover, &[data-dragging]": {
        backgroundColor: "var(--theme-color-primary-main)",
        boxShadow: "0 0 0 1px var(--theme-color-primary-main)",
      },
      ...sx,
    };

    return (
      <Box
        ref={ref}
        role="separator"
        tabIndex={disabled ? -1 : 0}
        data-dragging={isDragging ? "" : undefined}
        onPointerDown={handlePointerDown}
        sx={baseSx}
        className={`relative flex items-center justify-center shrink-0 select-none ${className || ""}`.trim()}
        {...other}
      >
        {withHandle && (
          <Box
            sx={{
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: isHorizontal ? 12 : 20,
              height: isHorizontal ? 20 : 12,
              borderRadius: "4px",
              border:
                "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.24))",
              backgroundColor: "var(--theme-color-background-paper)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                width: isHorizontal ? 2 : 10,
                height: isHorizontal ? 10 : 2,
                borderRadius: "1px",
                backgroundColor: "var(--theme-color-text-disabled)",
              }}
            />
          </Box>
        )}
      </Box>
    );
  },
);

ResizableHandle.displayName = "ResizableHandle";

export * from "./resizable.styles";
export * from "./resizable.types";
export * from "./resizable-context";
