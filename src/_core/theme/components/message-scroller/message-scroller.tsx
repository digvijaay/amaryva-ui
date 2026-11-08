import { Box } from "@mui/system";
import * as React from "react";
import type { MessageScrollerProps } from "./message-scroller.types";

// ----------------------------------------------------------------------

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

export const MessageScroller = React.forwardRef<
  HTMLDivElement,
  MessageScrollerProps
>(({ autoScroll = true, children, sx, className, ...other }, ref) => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [showScrollBottom, setShowScrollBottom] = React.useState(false);

  const scrollToBottom = React.useCallback((smooth = true) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollBottom(!isNearBottom);
  };

  React.useEffect(() => {
    if (autoScroll && !showScrollBottom) {
      scrollToBottom(false);
    }
  }, [autoScroll, showScrollBottom, scrollToBottom]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        ...sx,
      }}
      className={`relative flex flex-col w-full h-full overflow-hidden ${className || ""}`.trim()}
      {...other}
    >
      <Box
        ref={(el: HTMLDivElement) => {
          scrollRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        onScroll={handleScroll}
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          p: 2,
        }}
        className="flex-1 overflow-y-auto"
      >
        {children}
      </Box>

      {/* Floating Scroll-to-Bottom Button */}
      {showScrollBottom && (
        <Box
          component="button"
          type="button"
          onClick={() => scrollToBottom(true)}
          aria-label="Scroll to bottom"
          sx={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            border:
              "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.24))",
            backgroundColor: "var(--theme-color-background-paper)",
            color: "var(--theme-color-text-primary)",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.16)",
            cursor: "pointer",
            transition: "all 150ms ease",
            "&:hover": {
              transform: "translateX(-50%) scale(1.08)",
              backgroundColor: "var(--theme-color-action-hover)",
            },
          }}
        >
          <ArrowDownIcon />
        </Box>
      )}
    </Box>
  );
});

MessageScroller.displayName = "MessageScroller";

export * from "./message-scroller.styles";
export * from "./message-scroller.types";
export * from "./message-scroller-context";
