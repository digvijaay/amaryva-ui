import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { Box, type BoxProps } from "@mui/system";
import * as React from "react";
import type { AvatarProps } from "./avatar.types";

const sizeMap = {
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 56,
};

const radiusMap = {
  circular: "50%",
  rounded: "8px",
  square: "0px",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      fallback,
      variant = "circular",
      size = "medium",
      badge,
      children,
      sx,
      className,
      slotProps,
      ...other
    },
    ref,
  ) => {
    const dimension =
      typeof size === "number" ? size : sizeMap[size] || sizeMap.medium;
    const borderRadius = radiusMap[variant] || radiusMap.circular;

    const baseSx: Record<string, unknown> = {
      position: "relative",
      display: "inline-flex",
      width: dimension,
      height: dimension,
    };

    const rootSlotSx = slotProps?.root?.sx;
    const mergedSx = [
      baseSx,
      ...(Array.isArray(sx) ? sx : [sx]),
      ...(Array.isArray(rootSlotSx) ? rootSlotSx : [rootSlotSx]),
    ] as BoxProps["sx"];

    return (
      <Box
        ref={ref}
        sx={mergedSx}
        className={`relative inline-flex shrink-0 ${className || ""} ${slotProps?.root?.className || ""}`.trim()}
        {...other}
        {...slotProps?.root}
      >
        <BaseAvatar.Root
          render={
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  "var(--theme-color-action-hover, rgba(145, 158, 171, 0.16))",
                userSelect: "none",
              }}
              className="w-full h-full flex items-center justify-center overflow-hidden"
            >
              {src && (
                <BaseAvatar.Image
                  src={src}
                  alt={alt}
                  render={
                    <Box
                      component="img"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        ...slotProps?.image?.sx,
                      }}
                      className={slotProps?.image?.className}
                      {...slotProps?.image}
                    />
                  }
                />
              )}

              <BaseAvatar.Fallback
                render={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      fontSize: dimension * 0.4,
                      fontWeight: 600,
                      color: "var(--theme-color-text-secondary)",
                      textTransform: "uppercase",
                      ...slotProps?.fallback?.sx,
                    }}
                    className={`flex items-center justify-center w-full h-full font-semibold ${slotProps?.fallback?.className || ""}`.trim()}
                    {...slotProps?.fallback}
                  >
                    {fallback || children || (alt ? alt.charAt(0) : "?")}
                  </Box>
                }
              />
            </Box>
          }
        />

        {badge && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
              zIndex: 1,
              ...slotProps?.badge?.sx,
            }}
            className={slotProps?.badge?.className}
            {...slotProps?.badge}
          >
            {badge}
          </Box>
        )}
      </Box>
    );
  },
) as unknown as React.ForwardRefExoticComponent<
  AvatarProps & React.RefAttributes<HTMLDivElement>
> & {
  Root: typeof BaseAvatar.Root;
  Image: typeof BaseAvatar.Image;
  Fallback: typeof BaseAvatar.Fallback;
};

Avatar.displayName = "Avatar";
Avatar.Root = BaseAvatar.Root;
Avatar.Image = BaseAvatar.Image;
Avatar.Fallback = BaseAvatar.Fallback;

export * from "./avatar.styles";
export * from "./avatar.types";
export * from "./avatar-context";
