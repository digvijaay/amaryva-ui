"use client";

import { useEffect, useState } from "react";
import { Button } from "@/_core/theme/components";
import type { TocItem } from "../types";

// ----------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------

export interface DocsTocProps {
  items?: TocItem[];
}

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

export function DocsToc({
  items = [
    { id: "preview", label: "Live Preview" },
    { id: "usage", label: "Usage & Code" },
    { id: "installation", label: "Installation" },
    { id: "props-reference", label: "API Reference" },
  ],
}: DocsTocProps) {
  const [activeSection, setActiveSection] = useState<string>("preview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <aside className="hidden w-64 shrink-0 xl:block">
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-6 pr-4">
        {/* On This Page Section */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            On This Page
          </p>
          <ul className="space-y-1.5 text-sm">
            {items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left transition-colors ${
                      isActive
                        ? "font-semibold text-text-primary"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Promo / Callout Card Matching Red Box 4 in the Reference Image */}
        <div className="mt-10 rounded-2xl border border-divider/80 bg-background-paper p-5 shadow-xs">
          <h4 className="text-sm font-semibold text-text-primary">
            Deploy your Masterpiece on Vercel
          </h4>
          <p className="mt-2 text-xs text-text-secondary leading-relaxed">
            Trusted by modern product teams worldwide. Base UI primitives styled
            with @mui/system tokens and Tailwind CSS at scale.
          </p>
          <div className="mt-4">
            <Button
              size="small"
              variant="outlined"
              color="primary"
              className="w-full text-xs font-medium"
              onClick={() => {
                window.open("https://vercel.com", "_blank");
              }}
            >
              Deploy Now
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
