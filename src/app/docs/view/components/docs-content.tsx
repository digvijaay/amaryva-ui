"use client";

import { useState } from "react";
import { Badge } from "@/_core/theme/components";
import type { DocComponentData } from "../types";
import { DocsPreview } from "./docs-preview";

// ----------------------------------------------------------------------
// Icons
// ----------------------------------------------------------------------

function CopyIcon() {
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
      <title>Copy</title>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <title>Copied</title>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <title>Chevron Down</title>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArrowLeftIcon() {
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
      <title>Previous</title>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
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
      <title>Next</title>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------

export interface DocsContentProps {
  component: DocComponentData;
  prevComponent: { id: string; name: string } | null;
  nextComponent: { id: string; name: string } | null;
  onNavigate: (id: string) => void;
  copied: boolean;
  onCopyPage: (text: string) => void;
}

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

export function DocsContent({
  component,
  prevComponent,
  nextComponent,
  onNavigate,
  copied,
  onCopyPage,
}: DocsContentProps) {
  const [activePrimitiveTab, setActivePrimitiveTab] =
    useState<string>("Base UI");
  const [codeCopied, setCodeCopied] = useState(false);
  const [showFullCode, setShowFullCode] = useState(false);

  const primitiveTabs = ["Base UI", "React Aria", "Radix UI", "MUI System"];

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const codeLines = (component.usageCode || "").split("\n");
  const visibleLines = showFullCode ? codeLines : codeLines.slice(0, 10);

  return (
    <article className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
      {/* 1. Header Bar: Title, Copy Page, Prev/Next Arrows */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {component.name}
          </h1>
          <p className="mt-2 text-base text-text-secondary">
            {component.description}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {/* Copy Page Button */}
          <button
            type="button"
            onClick={() =>
              onCopyPage(
                `# ${component.name}\n\n${component.description}\n\n\`\`\`tsx\n${component.importCode}\n\n${component.usageCode}\n\`\`\``,
              )
            }
            className="flex items-center gap-2 rounded-lg border border-divider bg-background-paper px-3 py-1.5 text-xs font-medium text-text-primary transition-all hover:bg-action-hover"
          >
            {copied ? (
              <span className="flex items-center gap-1.5 text-success-main font-semibold">
                <CheckIcon /> Copied!
              </span>
            ) : (
              <>
                <CopyIcon />
                <span>Copy Page</span>
                <ChevronDownIcon />
              </>
            )}
          </button>

          {/* Prev Arrow */}
          <button
            type="button"
            disabled={!prevComponent}
            onClick={() => prevComponent && onNavigate(prevComponent.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-divider text-text-secondary transition-colors hover:bg-action-hover hover:text-text-primary disabled:opacity-30 disabled:pointer-events-none"
            title={
              prevComponent ? `Previous: ${prevComponent.name}` : undefined
            }
            aria-label="Previous component"
          >
            <ArrowLeftIcon />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            disabled={!nextComponent}
            onClick={() => nextComponent && onNavigate(nextComponent.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-divider text-text-secondary transition-colors hover:bg-action-hover hover:text-text-primary disabled:opacity-30 disabled:pointer-events-none"
            title={nextComponent ? `Next: ${nextComponent.name}` : undefined}
            aria-label="Next component"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      {/* 2. Framework Pills / Tabs matching reference image */}
      <div className="mt-6 flex items-center gap-6 border-b border-divider pb-2">
        {primitiveTabs.map((tab) => {
          const isActive = activePrimitiveTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActivePrimitiveTab(tab)}
              className={`pb-2 text-sm font-medium transition-all relative ${
                isActive
                  ? "text-text-primary font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-main rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Section: Live Interactive Preview */}
      <section id="preview" className="mt-8">
        <div className="relative rounded-2xl border border-divider bg-background-paper p-6 sm:p-10 shadow-xs">
          <div className="absolute top-3 right-3">
            <span className="rounded-full bg-primary-main/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-primary-main">
              Live Preview
            </span>
          </div>

          <div className="flex min-h-[180px] items-center justify-center">
            <DocsPreview componentId={component.id} />
          </div>
        </div>
      </section>

      {/* 4. Section: Code Snippet Box with View Code & Copy */}
      <section id="usage" className="mt-6">
        <div className="overflow-hidden rounded-2xl border border-divider bg-neutral-950 font-mono text-xs text-neutral-200 shadow-md dark:border-neutral-800">
          <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/60 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-neutral-400">
                {component.name.toLowerCase()}.tsx
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopyCode(component.usageCode)}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
              >
                {codeCopied ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckIcon /> Copied
                  </span>
                ) : (
                  <>
                    <CopyIcon />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Line Numbers and Code Content */}
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {visibleLines.map((line, idx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: Fixed code listing lines
                  <tr key={idx} className="hover:bg-neutral-900/40">
                    <td className="w-8 select-none pr-4 text-right text-neutral-600">
                      {idx + 1}
                    </td>
                    <td className="whitespace-pre font-mono text-neutral-300">
                      {line}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {codeLines.length > 10 && (
              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => setShowFullCode(!showFullCode)}
                  className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs text-neutral-300 transition-colors hover:bg-neutral-800"
                >
                  {showFullCode ? "Show Less" : "View Full Code"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Section: Installation & Imports */}
      <section id="installation" className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-text-primary">
          Installation
        </h2>
        <p className="text-sm text-text-secondary">
          Import the component directly from our centralized theme barrel:
        </p>

        <div className="relative rounded-xl border border-divider bg-background-paper p-4 font-mono text-xs text-text-primary">
          <pre className="overflow-x-auto whitespace-pre">
            {component.importCode}
          </pre>
          <button
            type="button"
            onClick={() => handleCopyCode(component.importCode)}
            className="absolute top-3 right-3 rounded-md p-1.5 text-text-secondary hover:bg-action-hover hover:text-text-primary"
            aria-label="Copy import code"
          >
            <CopyIcon />
          </button>
        </div>
      </section>

      {/* 6. Section: Props API Reference */}
      <section id="props-reference" className="mt-12 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-text-primary">
              API Reference
            </h2>
            <p className="text-sm text-text-secondary">
              Props and slots available for the{" "}
              <code className="rounded bg-action-hover px-1.5 py-0.5 text-xs font-mono">
                {component.name}
              </code>{" "}
              component.
            </p>
          </div>
          <Badge
            color="primary"
            variant="standard"
            badgeContent={`${component.props.length} Props`}
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-divider bg-background-paper">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-divider bg-background/50 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              <tr>
                <th className="px-4 py-3">Prop</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider font-mono text-xs">
              {component.props.map((prop) => (
                <tr key={prop.name} className="hover:bg-action-hover/50">
                  <td className="px-4 py-3 font-semibold text-text-primary">
                    {prop.name}
                    {prop.required && (
                      <span className="ml-1 text-error-main">*</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-primary-main">
                    <code>{prop.type}</code>
                  </td>
                  <td className="px-4 py-3 text-text-secondary font-mono">
                    {prop.defaultValue || "—"}
                  </td>
                  <td className="px-4 py-3 font-sans text-xs text-text-secondary">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Bottom Navigation Cards: Previous & Next */}
      <nav
        aria-label="Component pagination"
        className="mt-16 flex flex-col gap-4 border-t border-divider pt-6 sm:flex-row sm:justify-between"
      >
        {prevComponent ? (
          <button
            type="button"
            onClick={() => onNavigate(prevComponent.id)}
            className="group flex flex-1 flex-col items-start rounded-xl border border-divider p-4 text-left transition-all hover:border-primary-main hover:bg-action-hover"
          >
            <span className="flex items-center gap-1 text-xs text-text-secondary">
              <ArrowLeftIcon /> Previous
            </span>
            <span className="mt-1 font-semibold text-text-primary group-hover:text-primary-main">
              {prevComponent.name}
            </span>
          </button>
        ) : (
          <div className="flex-1" />
        )}

        {nextComponent ? (
          <button
            type="button"
            onClick={() => onNavigate(nextComponent.id)}
            className="group flex flex-1 flex-col items-end rounded-xl border border-divider p-4 text-right transition-all hover:border-primary-main hover:bg-action-hover"
          >
            <span className="flex items-center gap-1 text-xs text-text-secondary">
              Next <ArrowRightIcon />
            </span>
            <span className="mt-1 font-semibold text-text-primary group-hover:text-primary-main">
              {nextComponent.name}
            </span>
          </button>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </article>
  );
}
