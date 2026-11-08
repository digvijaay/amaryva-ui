"use client";

import type { NavCategoryGroup } from "../types";

// ----------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------

export interface DocsSidebarProps {
  activeId: string;
  onSelectComponent: (id: string) => void;
  filteredGroups: NavCategoryGroup[];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

export function DocsSidebar({
  activeId,
  onSelectComponent,
  filteredGroups,
  isOpenMobile = false,
  onCloseMobile,
}: DocsSidebarProps) {
  // Static top-level sections matching the reference design
  const topSections = [
    { id: "theming", label: "Theming" },
    { id: "cli", label: "CLI" },
    { id: "typeset", label: "Typeset" },
    { id: "skills", label: "Skills" },
    { id: "registry", label: "Registry" },
    { id: "changelog", label: "Changelog" },
  ];

  const content = (
    <div className="flex h-full flex-col py-6">
      {/* Top Quick Links */}
      <div className="mb-6 space-y-1 px-4">
        {topSections.map((sec) => (
          <button
            key={sec.id}
            type="button"
            onClick={() => onSelectComponent(sec.id)}
            className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors font-medium ${
              activeId === sec.id
                ? "bg-text-primary text-background font-semibold"
                : "text-text-secondary hover:text-text-primary hover:bg-action-hover"
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      <div className="mx-4 mb-3 border-t border-divider" />

      {/* Nav Groups / Components Section */}
      <div className="flex-1 space-y-6 overflow-y-auto px-4 pr-3 scrollbar-thin">
        {filteredGroups.map((group) => {
          // If this is the "Components" category, list all components
          const isComponentsGroup = group.title === "Components";

          return (
            <div key={group.title} className="space-y-1">
              <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                <span>{group.title}</span>
                {isComponentsGroup && (
                  <span className="rounded-full bg-action-hover px-1.5 py-0.2 text-[10px] font-mono text-text-secondary">
                    {group.items.length}
                  </span>
                )}
              </div>

              <div className="mt-1 space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeId === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectComponent(item.id);
                        if (onCloseMobile) onCloseMobile();
                      }}
                      className={`group flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm transition-all ${
                        isActive
                          ? "bg-text-primary font-semibold text-background shadow-xs"
                          : "text-text-secondary hover:bg-action-hover hover:text-text-primary"
                      }`}
                    >
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <span
                          className={`ml-2 rounded px-1.5 py-0.2 text-[10px] uppercase font-mono ${
                            isActive
                              ? "bg-background text-text-primary"
                              : "bg-primary-main/10 text-primary-main"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden w-60 shrink-0 md:block lg:w-64">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden border-r border-divider/60">
          {content}
        </div>
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative z-50 flex h-full w-72 max-w-[85vw] flex-col border-r border-divider bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-divider px-4 py-3">
              <span className="text-sm font-semibold text-text-primary">
                Components
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="rounded-md p-1 text-text-secondary hover:text-text-primary"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
