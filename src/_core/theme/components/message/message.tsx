import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import { Avatar } from "../avatar";
import { Bubble } from "../bubble";
import type { MessageActionProps, MessageProps } from "./message.types";

export const MessageAction = React.forwardRef<
  HTMLButtonElement,
  MessageActionProps
>(({ icon, label, onClick, sx, className, children, ...other }, ref) => (
  <Box
    ref={ref}
    component="button"
    type="button"
    onClick={onClick}
    aria-label={label}
    sx={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 28,
      height: 28,
      p: 0,
      borderRadius: "6px",
      border: "none",
      backgroundColor: "transparent",
      color: "var(--theme-color-text-disabled)",
      cursor: "pointer",
      transition: "all 150ms ease",
      "&:hover": {
        backgroundColor:
          "var(--theme-color-action-hover, rgba(145, 158, 171, 0.08))",
        color: "var(--theme-color-text-primary)",
      },
      ...sx,
    }}
    className={`inline-flex items-center justify-center cursor-pointer ${className || ""}`.trim()}
    {...other}
  >
    {icon || children}
  </Box>
));
MessageAction.displayName = "MessageAction";

export const MessageActions = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ sx, className, children, ...other }, ref) => (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        mt: 0.75,
        ...sx,
      }}
      className={`flex items-center gap-1 mt-1.5 ${className || ""}`.trim()}
      {...other}
    >
      {children}
    </Box>
  ),
);
MessageActions.displayName = "MessageActions";

const MessageRoot = React.forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      messageRole,
      role = "assistant",
      sender,
      timestamp,
      avatar,
      actions,
      children,
      sx,
      className,
      ...other
    },
    ref,
  ) => {
    const isUser = (messageRole || role) === "user";

    return (
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: isUser ? "row-reverse" : "row",
          alignItems: "flex-start",
          gap: 1.5,
          width: "100%",
          my: 1.5,
          ...sx,
        }}
        className={`flex items-start gap-3 w-full ${isUser ? "flex-row-reverse" : ""} ${className || ""}`.trim()}
        {...other}
      >
        {/* Avatar */}
        {avatar !== undefined ? (
          avatar
        ) : (
          <Avatar
            size="small"
            color={isUser ? "primary" : "default"}
            sx={{ width: 32, height: 32, fontSize: "0.8125rem" }}
          >
            {isUser ? "U" : "AI"}
          </Avatar>
        )}

        {/* Bubble & Metadata */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: isUser ? "flex-end" : "flex-start",
            maxWidth: "78%",
          }}
        >
          {(sender || timestamp) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 0.5,
                fontSize: "0.75rem",
                color: "var(--theme-color-text-secondary)",
              }}
            >
              {sender && <span style={{ fontWeight: 600 }}>{sender}</span>}
              {timestamp && <span>{timestamp}</span>}
            </Box>
          )}

          <Bubble
            variant={isUser ? "filled" : "soft"}
            color={isUser ? "primary" : "default"}
            pointer={isUser ? "right" : "left"}
          >
            {children}
          </Bubble>

          {actions && <MessageActions>{actions}</MessageActions>}
        </Box>
      </Box>
    );
  },
);

MessageRoot.displayName = "Message";

export const Message = Object.assign(MessageRoot, {
  Action: MessageAction,
  Actions: MessageActions,
});

export * from "./message.styles";
export * from "./message.types";
export * from "./message-context";
