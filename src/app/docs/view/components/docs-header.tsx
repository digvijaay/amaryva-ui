"use client";

import Link from "next/link";
import { Button } from "@/_core/theme/components";
import { useTheme } from "@/_core/theme/theme-provider";

// ----------------------------------------------------------------------
// Icons
// ----------------------------------------------------------------------

function GithubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <title>GitHub</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function SunIcon() {
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
    >
      <title>Light Mode</title>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
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
    >
      <title>Dark Mode</title>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SearchIcon() {
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
    >
      <title>Search</title>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MenuIcon() {
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
    >
      <title>Toggle Menu</title>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------

export interface DocsHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleSidebar?: () => void;
}

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

export function DocsHeader({
  searchQuery,
  onSearchChange,
  onToggleSidebar,
}: DocsHeaderProps) {
  const { isDark, toggleMode } = useTheme();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs", active: true },
    { label: "Components", href: "/docs#components" },
    { label: "Blocks", href: "#blocks" },
    { label: "Charts", href: "#charts" },
    { label: "Directory", href: "#directory" },
    { label: "Typeset", href: "#typeset" },
    { label: "Create", href: "#create" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-divider/60 bg-background/95 backdrop-blur-md">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Mobile Menu Button + Nav Links */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex items-center justify-center p-1.5 text-text-secondary hover:text-text-primary md:hidden"
            aria-label="Toggle navigation menu"
          >
            <MenuIcon />
          </button>

          <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors ${
                  link.active
                    ? "font-semibold text-text-primary underline decoration-primary decoration-2 underline-offset-8"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Side: Search + GitHub Badge + Theme Toggle + New Button */}
        <div className="flex items-center gap-3">
          {/* Search Input Box */}
          <div className="relative hidden w-64 sm:block md:w-72">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search documentation..."
              className="h-8 w-full rounded-full border border-divider bg-background-paper pl-8 pr-12 text-xs text-text-primary placeholder-text-disabled outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
              <kbd className="rounded border border-divider bg-background px-1.5 py-0.5 text-[10px] font-mono text-text-secondary">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* GitHub Stars Badge */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-divider px-3 py-1 text-xs font-semibold text-text-primary transition-colors hover:bg-action-hover"
          >
            <GithubIcon />
            <span>128k</span>
          </a>

          {/* Theme Mode Toggle */}
          <button
            type="button"
            onClick={toggleMode}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-divider text-text-secondary transition-colors hover:bg-action-hover hover:text-text-primary"
            aria-label="Toggle color theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* "+ New" Action Button */}
          <Button
            size="small"
            variant="contained"
            color="primary"
            className="rounded-full px-3.5 text-xs font-medium"
          >
            + New
          </Button>
        </div>
      </div>
    </header>
  );
}
