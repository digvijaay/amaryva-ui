import { Box } from "@mui/system";
import * as React from "react";
import { Spinner } from "../spinner";
import type { TraceProps, TraceStepProps } from "./trace.types";

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ErrorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
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

export const TraceStep = React.forwardRef<HTMLDivElement, TraceStepProps>(
  (
    {
      title,
      description,
      status = "success",
      duration,
      timestamp,
      isLast = false,
      children,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const getStatusIcon = () => {
      switch (status) {
        case "running":
          return <Spinner size={14} color="primary" />;
        case "error":
          return (
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: "var(--theme-color-error-main)",
                color: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ErrorIcon />
            </Box>
          );
        case "pending":
          return (
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: "2px solid var(--theme-color-text-disabled)",
                backgroundColor: "transparent",
              }}
            />
          );
        default:
          return (
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: "var(--theme-color-success-main)",
                color: "#FFFFFF",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckIcon />
            </Box>
          );
      }
    };

    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          position: "relative",
          gap: 2,
          pb: isLast ? 0 : 2.5,
          ...sx,
        }}
        className={`flex relative gap-4 ${className || ""}`.trim()}
        {...other}
      >
        {/* Timeline Icon Column + Connector Line */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 24,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              zIndex: 2,
            }}
          >
            {getStatusIcon()}
          </Box>

          {!isLast && (
            <Box
              sx={{
                width: "2px",
                flex: 1,
                minHeight: 16,
                backgroundColor:
                  status === "success"
                    ? "var(--theme-color-success-main)"
                    : "var(--theme-color-divider, rgba(145, 158, 171, 0.2))",
                my: 0.5,
              }}
            />
          )}
        </Box>

        {/* Step Body */}
        <Box sx={{ flex: 1, minWidth: 0, pt: 0.25 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Box
              sx={{
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "var(--theme-color-text-primary)",
              }}
            >
              {title}
            </Box>

            {(duration || timestamp) && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: "0.75rem",
                  color: "var(--theme-color-text-secondary)",
                }}
              >
                {duration && <span>{duration}</span>}
                {timestamp && <span>{timestamp}</span>}
              </Box>
            )}
          </Box>

          {description && (
            <Box
              sx={{
                fontSize: "0.8125rem",
                color: "var(--theme-color-text-secondary)",
                mt: 0.5,
              }}
            >
              {description}
            </Box>
          )}

          {children && <Box sx={{ mt: 1 }}>{children}</Box>}
        </Box>
      </Box>
    );
  },
);
TraceStep.displayName = "TraceStep";

const TraceRoot = React.forwardRef<HTMLDivElement, TraceProps>(
  ({ steps, children, sx, className, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          p: 2,
          borderRadius: "var(--theme-shape-borderRadius, 12px)",
          border:
            "1px solid var(--theme-color-divider, rgba(145, 158, 171, 0.16))",
          backgroundColor: "var(--theme-color-background-paper)",
          ...sx,
        }}
        className={`flex flex-col w-full rounded-xl ${className || ""}`.trim()}
        {...other}
      >
        {children ||
          steps?.map((step, index) => (
            <TraceStep
              // biome-ignore lint/suspicious/noArrayIndexKey: Timeline steps order is static
              key={index}
              isLast={index === steps.length - 1}
              {...step}
            />
          ))}
      </Box>
    );
  },
);

TraceRoot.displayName = "Trace";

export const Trace = Object.assign(TraceRoot, {
  Step: TraceStep,
});

export * from "./trace.styles";
export * from "./trace.types";
export * from "./trace-context";
