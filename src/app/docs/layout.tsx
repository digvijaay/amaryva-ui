import type { Metadata } from "next";
import type * as React from "react";

export const metadata: Metadata = {
  title: "Component Documentation | Antigravity Design System",
  description:
    "Explore accessible, high-performance UI components built with Base UI headless primitives, MUI Box engine, and custom theme tokens.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
