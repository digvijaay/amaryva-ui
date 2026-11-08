// ----------------------------------------------------------------------
// Documentation Data Types
// ----------------------------------------------------------------------

export type ComponentCategory =
  | "Getting Started"
  | "Components"
  | "Inputs & Forms"
  | "Data Display"
  | "Feedback & Status"
  | "Navigation"
  | "Surfaces & Overlays"
  | "Layout"
  | "Agentic & AI";

export interface DocComponentProp {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface DocComponentExample {
  title: string;
  description?: string;
  code: string;
}

export interface DocComponentData {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  basePrimitive?: string;
  stylingEngine?: string;
  importCode: string;
  usageCode: string;
  props: DocComponentProp[];
  examples?: DocComponentExample[];
}

export interface NavCategoryGroup {
  title: string;
  items: {
    id: string;
    name: string;
    badge?: string;
  }[];
}

export interface TocItem {
  id: string;
  label: string;
}
