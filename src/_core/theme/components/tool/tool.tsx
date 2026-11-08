import { Box } from "@mui/system";
import * as React from "react";
import { Badge } from "../badge";
import { Collapsible } from "../collapsible";
import { Spinner } from "../spinner";
import type { ToolProps } from "./tool.types";

function TerminalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export const Tool = React.forwardRef<HTMLDivElement, ToolProps>(
  (
    {
      name,
      status = "success",
      input,
      output,
      defaultExpanded = false,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(defaultExpanded);

    const getStatusBadge = () => {
      switch (status) {
        case "running":
          return (
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
              <Spinner size={14} color="primary" />
              <Badge color="primary" size="small" badgeContent="running" />
            </Box>
          );
        case "error":
          return <Badge color="error" size="small" badgeContent="failed" />;
        case "pending":
          return <Badge color="default" size="small" badgeContent="pending" />;
        default:
          return (
            <Badge color="success" size="small" badgeContent="completed" />
          );
      }
    };

    const formatData = (data: unknown) => {
      if (typeof data === "string") return data;
      try {
        return JSON.stringify(data, null, 2);
      } catch {
        return String(data);
      }
    };

    return (
      <Box
        ref={ref}
        sx={{
          borderRadius: "var(--theme-shape-borderRadius, 10px)",
          border:
            "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
          backgroundColor: "var(--theme-color-background-paper)",
          overflow: "hidden",
          my: 1.5,
          ...sx,
        }}
        className={`rounded-xl overflow-hidden border border-divider ${className || ""}`.trim()}
        {...other}
      >
        {/* Tool Header Row */}
        <Box
          component="button"
          type="button"
          onClick={() => setOpen(!open)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            px: 2,
            py: 1.25,
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            textAlign: "left",
            transition: "background-color 150ms ease",
            "&:hover": {
              backgroundColor:
                "var(--theme-color-action-hover, rgba(145, 158, 171, 0.04))",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Box
              sx={{
                color: "var(--theme-color-primary-main)",
                display: "inline-flex",
              }}
            >
              <TerminalIcon />
            </Box>
            <Box
              sx={{
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "var(--theme-color-text-primary)",
              }}
            >
              {name}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {getStatusBadge()}
            <Box
              sx={{
                color: "var(--theme-color-text-disabled)",
                transform: open ? "rotate(180deg)" : "none",
                transition: "transform 200ms ease",
                display: "inline-flex",
              }}
            >
              <ChevronDownIcon />
            </Box>
          </Box>
        </Box>

        {/* Collapsible Tool Payload */}
        <Collapsible open={open}>
          <Box
            sx={{
              p: 2,
              borderTop:
                "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.16))",
              backgroundColor:
                "var(--theme-color-background-neutral, rgba(145, 158, 171, 0.04))",
              fontSize: "0.8125rem",
              fontFamily: "var(--theme-font-mono)",
            }}
          >
            {input !== undefined && (
              <Box sx={{ mb: output !== undefined ? 1.5 : 0 }}>
                <Box
                  sx={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--theme-color-text-disabled)",
                    mb: 0.5,
                  }}
                >
                  Input Parameters
                </Box>
                <Box
                  component="pre"
                  sx={{
                    m: 0,
                    p: 1.25,
                    borderRadius: "6px",
                    backgroundColor: "var(--theme-color-background-paper)",
                    border:
                      "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.12))",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {formatData(input)}
                </Box>
              </Box>
            )}

            {output !== undefined && (
              <Box>
                <Box
                  sx={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--theme-color-text-disabled)",
                    mb: 0.5,
                  }}
                >
                  Output Result
                </Box>
                <Box
                  component="pre"
                  sx={{
                    m: 0,
                    p: 1.25,
                    borderRadius: "6px",
                    backgroundColor: "var(--theme-color-background-paper)",
                    border:
                      "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.12))",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {formatData(output)}
                </Box>
              </Box>
            )}
          </Box>
        </Collapsible>
      </Box>
    );
  },
);

Tool.displayName = "Tool";

export * from "./tool.styles";
export * from "./tool.types";
export * from "./tool-context";
