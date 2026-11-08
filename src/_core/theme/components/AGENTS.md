# Component Architecture & Implementation Guide (`AGENTS.md`)

This document serves as the mandatory specification for designing, building, and maintaining all UI components in `src/_core/theme/components/`. Any agent or engineer working in this directory must strictly follow these conventions.

---

## 1. Core Architectural Rules

### Rule 1: NO `"use client"` in Component Library Files
- **Strict Prohibition**: Under no circumstance should any file inside `src/_core/theme/components/` contain the `"use client";` directive.
- **Universal Library Standard**: Components are authored as universal, headless-ready library modules. 
- **Client Boundary Responsibility**: The application view layer (e.g. `src/app/<route>/view/index.tsx`) declares `"use client";` at the page/view coordinator level. This keeps components reusable across Server and Client render contexts without forcing premature client boundary serialization.

---

## 2. Standard 5-File Component Structure

Every component folder inside `src/_core/theme/components/<component-name>/` must strictly follow this 5-file architecture:

```
src/_core/theme/components/<component-name>/
├── <component-name>.tsx            # Core component implementation (NO "use client")
├── <component-name>.styles.ts     # Visual styling functions, variant maps, slot styles
├── <component-name>.types.ts      # TypeScript interfaces, props, slots, variants, colors
├── <component-name>-context.ts    # React Context, ContextProvider, use<Component>Context hook
└── index.ts                       # Barrel re-exporting types, styles, context, and component
```

### File Responsibilities:

#### 1. `<component-name>.types.ts`
- Houses all TypeScript types, interfaces, and unions.
- Exports `<Component>Props` (extending or omitting `BoxProps`).
- Exports `<Component>Slots` and `<Component>SlotProps` for deep slot customization.
- Exports variant, color, size, and orientation types (`<Component>Variant`, `<Component>Color`, etc.).
- Must not contain JSX or styling code.

```ts
import type { BoxProps } from "@mui/system";
import type * as React from "react";

export type ButtonVariant = "contained" | "outlined" | "soft" | "text" | "glass";
export type ButtonColor = "primary" | "secondary" | "success" | "warning" | "error" | "info" | "inherit";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonSlots {
  root?: React.ElementType;
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
}

export interface ButtonSlotProps {
  root?: BoxProps;
  startIcon?: BoxProps;
  endIcon?: BoxProps;
}

export interface ButtonProps extends Omit<BoxProps, "color" | "size"> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  slots?: ButtonSlots;
  slotProps?: ButtonSlotProps;
}
```

#### 2. `<component-name>.styles.ts`
- Houses styling classes, style generator functions, and sx mappings.
- Uses theme tokens (`var(--theme-color-*)`, `var(--theme-shadow-*)`).
- Keeps visual styling decoupled from component markup logic.

```ts
import type { SxProps } from "@mui/system";
import type { ButtonColor, ButtonSize, ButtonVariant } from "./button.types";

export function getVariantStyles(variant: ButtonVariant = "contained", color: ButtonColor = "primary"): string {
  // Variant mapping with theme tokens
  // ...
  return "transition-all font-medium rounded-lg ...";
}

export function getSizeStyles(size: ButtonSize = "medium"): string {
  // Size padding and typography
  // ...
  return "px-4 py-2 text-sm";
}
```

#### 3. `<component-name>-context.ts`
- Defines React Context for state and props propagation across compound components.
- Provides `use<Component>Context()` hook with helpful fallback or error messages.
- Exports context provider wrapper if state is managed.

```ts
import * as React from "react";
import type { ButtonSize, ButtonVariant } from "./button.types";

export interface ButtonContextValue {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const ButtonContext = React.createContext<ButtonContextValue | null>(null);

export function useButtonContext(): ButtonContextValue | null {
  return React.useContext(ButtonContext);
}
```

#### 4. `<component-name>.tsx`
- Root component implementation using `React.forwardRef`.
- Integrates `@base-ui/react` headless primitives when applicable.
- Composes with `@mui/system` `Box` as the foundation element.
- Connects `<component-name>.styles.ts` and `<component-name>-context.ts`.
- **Must NEVER contain `"use client"`**.
- Sets explicit `displayName`.

```tsx
import * as React from "react";
import { Box } from "@mui/system";
import { Button as BaseButton } from "@base-ui/react/button";
import type { ButtonProps } from "./button.types";
import { getVariantStyles, getSizeStyles } from "./button.styles";
import { useButtonContext } from "./button-context";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "contained", color = "primary", size = "medium", className, sx, ...props },
  ref,
) {
  const context = useButtonContext();
  const effectiveVariant = context?.variant ?? variant;
  const effectiveSize = context?.size ?? size;

  return (
    <Box
      component={BaseButton}
      ref={ref}
      className={`${getVariantStyles(effectiveVariant, color)} ${getSizeStyles(effectiveSize)} ${className ?? ""}`}
      sx={sx}
      {...props}
    />
  );
});

Button.displayName = "Button";
```

#### 5. `index.ts`
- Centralized re-export barrel for the component module:

```ts
export * from "./<component-name>";
export * from "./<component-name>.types";
export * from "./<component-name>.styles";
export * from "./<component-name>-context";
```

---

## 3. Technology Stack Roles

| Technology | Role & Usage |
| :--- | :--- |
| **`@mui/system`** | **Layout & Semantic Primitives**: `{ Box, Container, Grid, Stack }`. Every component accepts `BoxProps` and `sx`. |
| **`@base-ui/react`** | **Headless Logic & Accessibility**: Use Base UI primitives for keyboard navigation, ARIA attributes, and headless state. |
| **Theme Tokens** | **Styling Authority**: Design tokens (`palette`, `typography`, `shadows`, CSS variables `var(--theme-color-*)`). |
| **Tailwind CSS (v4)** | **Utility Styling**: Spacing, sizing, flex/grid layouts, responsive modifiers (`sm:`, `md:`). |
| **`motion`** | **Micro-interactions**: Subtle transitions and animated layouts. |

---

## 4. Verification Checklist

Before completing changes to any component in `theme/components/`:
- [ ] Has the `"use client";` directive been omitted from all files?
- [ ] Does the folder contain all 5 files (`.tsx`, `.styles.ts`, `.types.ts`, `-context.ts`, `index.ts`)?
- [ ] Does `index.ts` re-export all 4 files?
- [ ] Does `npx @biomejs/biome check src/_core/theme/components` report 0 errors?
- [ ] Does `npx tsc --noEmit` pass with 0 errors?
- [ ] Does `npx next build --webpack` succeed cleanly?
