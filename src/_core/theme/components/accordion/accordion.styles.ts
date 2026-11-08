export function getActiveStyles(colorKey?: string) {
  if (!colorKey) {
    return {
      bg: "var(--theme-color-action-selected)",
      text: "var(--theme-color-text-primary)",
      chevron: "var(--theme-color-text-secondary)",
    };
  }
  if (colorKey === "none" || colorKey === "transparent") {
    return {
      bg: "transparent",
      text: "var(--theme-color-text-primary)",
      chevron: "var(--theme-color-text-secondary)",
    };
  }
  if (colorKey === "primary") {
    return {
      bg: "var(--theme-color-action-selected)",
      text: "var(--theme-color-primary-main)",
      chevron: "var(--theme-color-primary-main)",
    };
  }
  if (colorKey === "secondary") {
    return {
      bg: "var(--theme-color-action-selected)",
      text: "var(--theme-color-secondary-main)",
      chevron: "var(--theme-color-secondary-main)",
    };
  }
  return {
    bg: colorKey,
    text: "var(--theme-color-text-primary)",
    chevron: "var(--theme-color-text-secondary)",
  };
}
