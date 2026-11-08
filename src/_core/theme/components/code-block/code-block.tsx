import { Box } from "@mui/system";
import * as React from "react";
import type { CodeBlockProps } from "./code-block.types";

// ----------------------------------------------------------------------

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * CodeBlock Component
 *
 * Implements AGENTS.md guidelines:
 * - Built on @mui/system Box with full BoxProps and sx support
 * - Formats syntax snippets with optional line numbers, filename tab, and copy button
 * - Maps to custom theme design tokens (paper, neutral, mono font)
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code: codeProp,
      children,
      language = "typescript",
      filename,
      showLineNumbers = false,
      copyable = true,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false);

    const rawCode = codeProp ?? (typeof children === "string" ? children : "");

    const lines = React.useMemo(() => {
      const trimmed = rawCode.replace(/\r\n/g, "\n");
      return trimmed.split("\n");
    }, [rawCode]);

    const handleCopy = async () => {
      if (!rawCode) return;
      try {
        await navigator.clipboard.writeText(rawCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard fallback
      }
    };

    return (
      <Box
        ref={ref}
        sx={{
          position: "relative",
          borderRadius: "var(--theme-shape-borderRadius, 10px)",
          border:
            "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
          backgroundColor: "#161c24", // deep dark coding canvas in both themes
          color: "#e6e8ec",
          overflow: "hidden",
          fontFamily:
            "var(--theme-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)",
          fontSize: "0.8125rem",
          lineHeight: 1.6,
          ...sx,
        }}
        className={`relative overflow-hidden font-mono text-xs rounded-xl ${className || ""}`.trim()}
        {...other}
      >
        {/* Header Bar */}
        {(filename || language || copyable) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "0.75rem",
              color: "#919eab",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {filename && (
                <Box
                  component="span"
                  sx={{ fontWeight: 600, color: "#FFFFFF" }}
                >
                  {filename}
                </Box>
              )}
              {language && !filename && (
                <Box
                  component="span"
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                  }}
                >
                  {language}
                </Box>
              )}
            </Box>

            {copyable && (
              <Box
                component="button"
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Copied code" : "Copy code"}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.25,
                  py: 0.5,
                  borderRadius: "4px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  backgroundColor: copied
                    ? "rgba(34, 197, 94, 0.16)"
                    : "rgba(255, 255, 255, 0.04)",
                  color: copied ? "#4ade80" : "#919eab",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                  },
                }}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </Box>
            )}
          </Box>
        )}

        {/* Code Content */}
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            overflowX: "auto",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {showLineNumbers && (
            <Box
              component="span"
              aria-hidden="true"
              sx={{
                userSelect: "none",
                color: "#637381",
                textAlign: "right",
                pr: 2,
                mr: 2,
                borderRight: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {lines.map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: Line numbers are monotonically 1-indexed
                <div key={i}>{i + 1}</div>
              ))}
            </Box>
          )}

          <Box
            component="code"
            sx={{ flex: 1, minWidth: 0, whiteSpace: "pre" }}
          >
            {rawCode || children}
          </Box>
        </Box>
      </Box>
    );
  },
);

CodeBlock.displayName = "CodeBlock";

export * from "./code-block.styles";
export * from "./code-block.types";
export * from "./code-block-context";
