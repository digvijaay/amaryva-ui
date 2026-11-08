# App Directory Architecture & Route Structure Guide (`AGENTS.md`)

This guide specifies the mandatory architectural convention for all routes and pages in `src/app/`. Every agent and engineer working on this codebase must adhere strictly to this pattern.

---

## 1. Route Directory Architecture

Every route folder under `src/app/` must follow this uniform structure:

```
src/app/<route>/
├── page.tsx                    <-- Server Component only: metadata, generateStaticParams, renders <RouteView />
└── view/
    ├── index.tsx               <-- Main view coordinator (Client Component with "use client")
    ├── types.ts                <-- Dedicated TypeScript interfaces for this route
    ├── constants.ts            <-- Content, step data, FAQs, pricing tiers, mock data for this route
    ├── hooks/                  <-- Route-specific hooks (if needed; shared hooks go to src/_core/hooks)
    │   └── index.ts
    └── components/             <-- Cleanly separated, atomic section components
        ├── <SectionOne>.tsx
        ├── <SectionTwo>.tsx
        └── index.ts
```

---

## 2. Responsibilities by File

### 1. `page.tsx` (Server Component Only)
- **Role**: Entry point for Next.js App Router routing.
- **Rules**:
  - Must NOT contain `"use client"`.
  - Responsible for route `metadata` (`title`, `description`, `openGraph`).
  - Responsible for SSR data loading, search param parsing, or `generateStaticParams` when applicable.
  - Simply renders the Client Component coordinator `<RouteView />` from `./view`.

```tsx
import type { Metadata } from "next";
import RouteView from "./view";

export const metadata: Metadata = {
  title: "Page Title | Antigravity Design System",
  description: "Page description and summary.",
};

export default function RoutePage() {
  return <RouteView />;
}
```

---

### 2. `view/index.tsx` (Main View Coordinator)
- **Role**: Client Component coordinator managing high-level state, active sections, and layout composition.
- **Rules**:
  - Must begin with `"use client"`.
  - Coordinates child components imported from `./components`.
  - Does NOT contain inline massive markup or duplicate business logic; delegates presentation to atomic section components.

---

### 3. `view/types.ts` (Route Types)
- **Role**: Dedicated TypeScript types and interfaces used exclusively within this route.
- **Rules**:
  - Define prop interfaces, state models, navigation item definitions, and data structures.
  - Export all types with `export type` or `export interface`.

---

### 4. `view/constants.ts` (Route Constants)
- **Role**: Static data, navigation lists, documentation models, default configurations, and copy.
- **Rules**:
  - Keep components clean by separating static data and copy from JSX rendering.

---

### 5. `view/hooks/` (Route-Specific Hooks)
- **Role**: Custom React hooks scoped strictly to this route (e.g., active section spy, search query debouncer).
- **Rules**:
  - Re-export all hooks from `view/hooks/index.ts`.
  - If a hook is shared across multiple routes, place it in `src/_core/hooks/`.

---

### 6. `view/components/` (Atomic Section Components)
- **Role**: Clean, focused, self-contained section components.
- **Rules**:
  - Each component is in its own file (`section-header.tsx`, `section-hero.tsx`, etc.).
  - Always export all section components from `view/components/index.ts`.
  - Use our design tokens (`var(--theme-color-*)`, `--theme-shadow-*`) and `@mui/system` Box foundation.

---

## 3. Strict Coding Standards
1. **Zero Biome Errors**: Every file must pass `npx @biomejs/biome check src`.
2. **Zero TypeScript Errors**: Strict typing with `npx tsc --noEmit`.
3. **No Unstable Prerendering**: Avoid top-level `new Date()` or `Math.random()` during SSR render; move dynamic evaluations into `useEffect` or event handlers.
4. **Theme Token Authority**: Reference theme variables (`var(--theme-color-*)`) instead of raw hex values.

