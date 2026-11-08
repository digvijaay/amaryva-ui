/**
 * Component-level styling configurations and overrides compatible with Tailwind CSS.
 */

export interface ComponentThemeOverrides {
  [componentName: string]: Record<string, unknown> | undefined;
}

export const componentsTheme: ComponentThemeOverrides = {};

export * from "./accordion";
export * from "./alert";
export * from "./alert-dialog";
export * from "./app-bar";
export * from "./aspect-ratio";
export * from "./attachment";
export * from "./autocomplete";
export * from "./avatar";
export * from "./backdrop";
export * from "./badge";
export * from "./bottom-navigation";
export * from "./breadcrumb";
export * from "./bubble";
export * from "./button";
export * from "./button-group";
export * from "./calendar";
export * from "./card";
export * from "./carousel";
export * from "./checkbox";
export * from "./checkbox-group";
export * from "./code-block";
export * from "./collapsible";
export * from "./combobox";
export * from "./command";
export * from "./context-menu";
export * from "./data-table";
export * from "./date-picker";
export * from "./dialog";
export * from "./direction";
export * from "./drawer";
export * from "./empty";
export * from "./field";
export * from "./fieldset";
export * from "./form";
export * from "./input";
export * from "./input-label";
export * from "./kbd";
export * from "./marker";
export * from "./menu";
export * from "./menubar";
export * from "./message";
export * from "./message-scroller";
export * from "./meter";
export * from "./navigation-menu";
export * from "./number-field";
export * from "./otp-field";
export * from "./pagination";
export * from "./popover";
export * from "./preview-card";
export * from "./progress";
export * from "./questionnaire";
export * from "./radio-group";
export * from "./resizable";
export * from "./scroll-area";
export * from "./select";
export * from "./separator";
export * from "./sidebar";
export * from "./skeleton";
export * from "./slider";
export * from "./spinner";
export * from "./switch";
export * from "./table";
export * from "./tabs";
export * from "./toast";
export * from "./toggle";
export * from "./toggle-group";
export * from "./tool";
export * from "./toolbar";
export * from "./tooltip";
export * from "./trace";
export * from "./typography";
