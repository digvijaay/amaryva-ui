"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps,
  useTheme as useNextTheme,
} from "next-themes";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Toast,
  type ToastLayout,
  type ToastPosition,
  type ToastSeverity,
} from "./components/toast";
import {
  createTheme,
  defaultTheme,
  generateThemeCssString,
} from "./create-theme";
import { themeConfig } from "./theme-config";
import type { Theme, ThemeColorScheme, ThemeOptions } from "./types";

// ----------------------------------------------------------------------

// Suppress React 19 false-positive warning for next-themes script tag in development.
// next-themes deliberately renders an inline script for SSR FOUC prevention,
// which React 19 flags as a client-side anti-pattern even though it functions correctly.
if (process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextValue {
  mode: ThemeMode;
  colorScheme: ThemeColorScheme;
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
  systemTheme?: string;
  resolvedTheme?: string;
}

export interface ThemeProviderProps
  extends Omit<NextThemesProviderProps, "children"> {
  children: React.ReactNode;
  theme?: Theme;
  themeOptions?: Partial<ThemeOptions>;
  toastPosition?: ToastPosition;
  toastLayout?: ToastLayout;
  disableToast?: boolean;
}

// ----------------------------------------------------------------------

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DEFAULT_STORAGE_KEY = `${themeConfig.classesPrefix}-theme-mode`;

// ----------------------------------------------------------------------

/**
 * Next.js App Router Emotion Style Registry
 *
 * Prevents hydration errors by collecting all Emotion / @mui/system styles on the server
 * and inserting them cleanly into <head> via useServerInsertedHTML, eliminating inline <style> tags.
 */
function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const emotionCache = createCache({ key: "mui" });
    emotionCache.compat = true;
    const prevInsert = emotionCache.insert;
    let inserted: string[] = [];

    emotionCache.insert = (...args) => {
      const serialized = args[1];
      if (emotionCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };

    const flushFn = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache: emotionCache, flush: flushFn };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted Emotion CSS server insertion
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

// ----------------------------------------------------------------------

/**
 * Internal bridge component that consumes next-themes and provides our rich Theme tokens context
 */
function ThemeTokenBridge({
  children,
  customTheme,
  themeOptions,
}: {
  children: React.ReactNode;
  customTheme?: Theme;
  themeOptions?: Partial<ThemeOptions>;
}) {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();

  const colorScheme: ThemeColorScheme =
    resolvedTheme === "dark" ? "dark" : "light";

  const mode: ThemeMode = (theme as ThemeMode) || "system";

  const activeTheme = useMemo(() => {
    if (customTheme) return customTheme;
    return createTheme(colorScheme, themeOptions);
  }, [customTheme, colorScheme, themeOptions]);

  const setMode = useCallback(
    (newMode: ThemeMode) => {
      setTheme(newMode);
    },
    [setTheme],
  );

  const toggleMode = useCallback(() => {
    setTheme(colorScheme === "dark" ? "light" : "dark");
  }, [colorScheme, setTheme]);

  const themeCss = useMemo(
    () => generateThemeCssString(customTheme ?? defaultTheme),
    [customTheme],
  );

  // Insert theme CSS variables into <head> during SSR
  useServerInsertedHTML(() => {
    return (
      <style
        id="theme-css-vars"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Static theme design tokens CSS variables
        dangerouslySetInnerHTML={{ __html: themeCss }}
      />
    );
  });

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      mode,
      colorScheme,
      theme: activeTheme,
      setMode,
      toggleMode,
      isDark: colorScheme === "dark",
      systemTheme,
      resolvedTheme,
    }),
    [
      mode,
      colorScheme,
      activeTheme,
      setMode,
      toggleMode,
      systemTheme,
      resolvedTheme,
    ],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// ----------------------------------------------------------------------

function GlobalToastPortal({
  position = "bottom-right",
  layout = "stack",
}: {
  position?: ToastPosition;
  layout?: ToastLayout;
}) {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport position={position} layout={layout}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            layout={layout}
            severity={(toast.type as ToastSeverity) || "default"}
            title={toast.title}
            description={toast.description}
            action={
              toast.actionProps ? (
                <Toast.Action {...toast.actionProps} />
              ) : undefined
            }
            closeText="Dismiss"
          />
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

// ----------------------------------------------------------------------

/**
 * Next.js & Tailwind CSS ThemeProvider powered by next-themes, Base UI Toast, and EmotionRegistry
 *
 * Integrates next-themes with our theme token system and @mui/system:
 * - Uses next-themes for HTML attribute/class management, system preference detection, and cross-tab sync
 * - Integrates EmotionRegistry to prevent Next.js App Router hydration errors with @mui/system Box
 * - Injects design token CSS variables into <head> via useServerInsertedHTML
 * - Provides app-wide <Toast.Provider> and stacked card toast queue via useToast()
 * - Provides typed useTheme() with full Theme object (palette, shadows, typography)
 */
export function ThemeProvider({
  children,
  theme: customTheme,
  themeOptions,
  toastPosition = "bottom-right",
  toastLayout = "stack",
  disableToast = false,
  attribute = ["class", "data-color-scheme"],
  defaultTheme: initialDefaultTheme = "system",
  enableSystem = true,
  storageKey = DEFAULT_STORAGE_KEY,
  disableTransitionOnChange = true,
  ...nextThemesProps
}: ThemeProviderProps) {
  return (
    <EmotionRegistry>
      <NextThemesProvider
        attribute={attribute}
        defaultTheme={initialDefaultTheme}
        enableSystem={enableSystem}
        storageKey={storageKey}
        disableTransitionOnChange={disableTransitionOnChange}
        {...nextThemesProps}
      >
        <ThemeTokenBridge customTheme={customTheme} themeOptions={themeOptions}>
          <Toast.Provider>
            {children}
            {!disableToast && (
              <GlobalToastPortal
                position={toastPosition}
                layout={toastLayout}
              />
            )}
          </Toast.Provider>
        </ThemeTokenBridge>
      </NextThemesProvider>
    </EmotionRegistry>
  );
}

// ----------------------------------------------------------------------

/**
 * Global hook to trigger toast notifications anywhere across the application
 */
export const useToast = Toast.useToastManager;

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

/**
 * Hook to consume theme context in client components
 *
 * @returns ThemeContextValue ({ mode, colorScheme, theme, setMode, toggleMode, isDark, systemTheme, resolvedTheme })
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }

  return context;
}

// Re-export raw next-themes hook if needed for specialized usage
export { useNextTheme };
