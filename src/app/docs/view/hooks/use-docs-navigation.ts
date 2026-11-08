"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DOCS_NAV_GROUPS, getComponentDocData } from "../constants";
import type { DocComponentData, NavCategoryGroup } from "../types";

export interface UseDocsNavigationReturn {
  activeId: string;
  setActiveId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredGroups: NavCategoryGroup[];
  currentComponent: DocComponentData;
  prevComponent: { id: string; name: string } | null;
  nextComponent: { id: string; name: string } | null;
  copied: boolean;
  copyToClipboard: (text: string) => void;
}

export function useDocsNavigation(
  initialId = "accordion",
): UseDocsNavigationReturn {
  const [activeId, setActiveIdState] = useState<string>(initialId);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveIdState(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const setActiveId = useCallback((id: string) => {
    setActiveIdState(id);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#${id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Flattened components list for prev / next navigation
  const allComponents = useMemo(() => {
    const compGroup = DOCS_NAV_GROUPS.find((g) => g.title === "Components");
    return compGroup ? compGroup.items : [];
  }, []);

  const currentIndex = useMemo(() => {
    return allComponents.findIndex((c) => c.id === activeId);
  }, [allComponents, activeId]);

  const prevComponent = useMemo(() => {
    if (currentIndex > 0) {
      return allComponents[currentIndex - 1];
    }
    return null;
  }, [allComponents, currentIndex]);

  const nextComponent = useMemo(() => {
    if (currentIndex >= 0 && currentIndex < allComponents.length - 1) {
      return allComponents[currentIndex + 1];
    }
    return null;
  }, [allComponents, currentIndex]);

  // Filtered navigation groups based on search query
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return DOCS_NAV_GROUPS;
    const query = searchQuery.toLowerCase().trim();

    return DOCS_NAV_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query),
      ),
    })).filter((group) => group.items.length > 0);
  }, [searchQuery]);

  const currentComponent = useMemo(() => {
    return getComponentDocData(activeId);
  }, [activeId]);

  const copyToClipboard = useCallback((text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return {
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
  };
}
