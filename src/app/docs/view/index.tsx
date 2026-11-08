"use client";

import { useState } from "react";
import {
  DocsContent,
  DocsHeader,
  DocsSidebar,
  DocsToc,
} from "./components";
import { useDocsNavigation } from "./hooks";

// ----------------------------------------------------------------------
// Main Docs View Coordinator
// ----------------------------------------------------------------------

export default function DocsView() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const {
    activeId,
    setActiveId,
    searchQuery,
    setSearchQuery,
    filteredGroups,
    currentComponent,
    prevComponent,
    nextComponent,
    copied,
    copyToClipboard,
  } = useDocsNavigation("accordion");

  return (
    <div className="min-h-screen bg-background text-text-primary antialiased selection:bg-primary-main/20 selection:text-primary-main">
      {/* 1. Top Global Navigation Header */}
      <DocsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* 2. Main Content Grid (Sidebar + Center Content + TOC) */}
      <div className="mx-auto flex w-full max-w-7xl">
        {/* Left Navigation Sidebar */}
        <DocsSidebar
          activeId={activeId}
          onSelectComponent={setActiveId}
          filteredGroups={filteredGroups}
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Center Main Documentation Area */}
        <main className="flex-1 min-w-0">
          <DocsContent
            component={currentComponent}
            prevComponent={prevComponent}
            nextComponent={nextComponent}
            onNavigate={setActiveId}
            copied={copied}
            onCopyPage={copyToClipboard}
          />
        </main>

        {/* Right Table of Contents Sidebar */}
        <DocsToc />
      </div>
    </div>
  );
}
