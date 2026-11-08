import { Box } from "@mui/system";
import * as React from "react";
import type { AttachmentProps } from "./attachment.types";

// ----------------------------------------------------------------------

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="12" x2="18" y2="18" />
    </svg>
  );
}

export const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  (
    {
      filename,
      size,
      icon,
      variant = "card",
      url,
      progress,
      onRemove,
      onDownload,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const isChip = variant === "chip";

    const baseSx: Record<string, unknown> = isChip
      ? {
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.5,
          borderRadius: "16px",
          border:
            "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
          backgroundColor: "var(--theme-color-background-paper)",
          fontSize: "0.8125rem",
          color: "var(--theme-color-text-primary)",
        }
      : {
          display: "inline-flex",
          alignItems: "center",
          gap: 1.5,
          p: 1.5,
          width: 260,
          borderRadius: "10px",
          border:
            "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
          backgroundColor: "var(--theme-color-background-paper)",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
          position: "relative",
          overflow: "hidden",
        };

    return (
      <Box
        ref={ref}
        sx={{ ...baseSx, ...sx }}
        className={`inline-flex items-center transition-all ${className || ""}`.trim()}
        {...other}
      >
        {/* File Icon */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--theme-color-primary-main)",
            flexShrink: 0,
          }}
        >
          {icon || <FileIcon />}
        </Box>

        {/* Text Details */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              fontSize: isChip ? "0.8125rem" : "0.875rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "var(--theme-color-text-primary)",
            }}
          >
            {filename}
          </Box>
          {!isChip && size && (
            <Box
              sx={{
                fontSize: "0.75rem",
                color: "var(--theme-color-text-secondary)",
                mt: 0.25,
              }}
            >
              {size}
            </Box>
          )}
        </Box>

        {/* Actions */}
        <Box
          sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, ml: 1 }}
        >
          {(url || onDownload) && (
            <Box
              component={url ? "a" : "button"}
              href={url}
              download={url ? filename : undefined}
              type={url ? undefined : "button"}
              onClick={onDownload}
              aria-label={`Download ${filename}`}
              sx={{
                display: "inline-flex",
                p: 0.5,
                borderRadius: "4px",
                border: "none",
                backgroundColor: "transparent",
                color: "var(--theme-color-text-secondary)",
                cursor: "pointer",
                transition: "color 150ms ease",
                "&:hover": {
                  color: "var(--theme-color-primary-main)",
                },
              }}
            >
              <DownloadIcon />
            </Box>
          )}

          {onRemove && (
            <Box
              component="button"
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${filename}`}
              sx={{
                display: "inline-flex",
                p: 0.5,
                borderRadius: "4px",
                border: "none",
                backgroundColor: "transparent",
                color: "var(--theme-color-text-disabled)",
                cursor: "pointer",
                transition: "color 150ms ease",
                "&:hover": {
                  color: "var(--theme-color-error-main)",
                },
              }}
            >
              <CloseIcon />
            </Box>
          )}
        </Box>

        {/* Optional Upload Progress Bar */}
        {progress !== undefined && progress < 100 && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 2,
              width: `${progress}%`,
              backgroundColor: "var(--theme-color-primary-main)",
              transition: "width 200ms ease",
            }}
          />
        )}
      </Box>
    );
  },
);

Attachment.displayName = "Attachment";

export * from "./attachment.styles";
export * from "./attachment.types";
export * from "./attachment-context";
