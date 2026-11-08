import type { Metadata } from "next";
import DocsView from "./view";

// Server Component only: metadata, generateStaticParams, renders <RouteView />
export const metadata: Metadata = {
  title: "Components Documentation | Masterpiece Theme",
  description:
    "Interactive documentation and API reference for all theme components, built with Base UI headless primitives and MUI System design tokens.",
};

export default function DocsPage() {
  return <DocsView />;
}
