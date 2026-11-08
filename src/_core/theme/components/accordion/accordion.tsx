import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import * as React from "react";
import type {
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./accordion.types";
import { AccordionContext, useAccordionContext } from "./accordion-context";

// ----------------------------------------------------------------------

export const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      defaultValue,
      value,
      onValueChange,
      multiple = false,
      openMultiple,
      disabled = false,
      variant = "outlined",
      transitionDuration = 300,
      disableHover = false,
      activeColor,
      disableTopPadding = false,
      items,
      className,
      sx,
      ...other
    },
    ref,
  ) => {
    const contextValue = React.useMemo(
      () => ({
        variant,
        transitionDuration,
        disableHover,
        activeColor,
        disableTopPadding,
      }),
      [
        variant,
        transitionDuration,
        disableHover,
        activeColor,
        disableTopPadding,
      ],
    );

    const formattedDefaultValue = defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : undefined;
    const formattedValue = value
      ? Array.isArray(value)
        ? value
        : [value]
      : undefined;

    return (
      <AccordionContext.Provider value={contextValue}>
        <BaseAccordion.Root
          ref={ref}
          defaultValue={formattedDefaultValue}
          value={formattedValue}
          onValueChange={onValueChange}
          disabled={disabled}
          className={`w-full divide-y divide-border rounded-lg ${
            variant === "outlined" ? "border border-border" : ""
          } ${className || ""}`.trim()}
          {...(other as any)}
        >
          {items
            ? items.map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                >
                  <AccordionTrigger
                    disableHover={item.disableHover}
                    activeColor={item.activeColor}
                  >
                    {item.title}
                  </AccordionTrigger>
                  <AccordionPanel disableTopPadding={item.disableTopPadding}>
                    {item.content}
                  </AccordionPanel>
                </AccordionItem>
              ))
            : children}
        </BaseAccordion.Root>
      </AccordionContext.Provider>
    );
  },
);

AccordionRoot.displayName = "Accordion";

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ children, value, disabled, className, ...other }, ref) => {
  return (
    <BaseAccordion.Item
      ref={ref}
      value={value}
      disabled={disabled}
      className={`group overflow-hidden border-b border-border last:border-b-0 ${className || ""}`.trim()}
      {...(other as any)}
    >
      {children}
    </BaseAccordion.Item>
  );
});

AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(
  (
    { children, className, expandIcon, disableHover, activeColor, ...other },
    ref,
  ) => {
    const context = useAccordionContext();
    const shouldDisableHover = disableHover ?? context.disableHover;

    return (
      <BaseAccordion.Header className="flex">
        <BaseAccordion.Trigger
          ref={ref}
          className={`flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all ${
            shouldDisableHover ? "" : "hover:bg-action-hover"
          } ${className || ""}`.trim()}
          {...(other as any)}
        >
          <span className="text-left">{children}</span>
          {expandIcon || (
            <svg
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[expanded]:rotate-180 text-text-secondary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Chevron</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
    );
  },
);

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionPanel = React.forwardRef<
  HTMLDivElement,
  AccordionPanelProps
>(({ children, className, disableTopPadding, ...other }, ref) => {
  const context = useAccordionContext();
  const noTopPad = disableTopPadding ?? context.disableTopPadding;

  return (
    <BaseAccordion.Panel
      ref={ref}
      className={`overflow-hidden text-sm transition-all duration-300 data-[closed]:h-0 data-[open]:h-[var(--accordion-panel-height)] ${className || ""}`.trim()}
      {...(other as any)}
    >
      <div className={`px-4 pb-4 ${noTopPad ? "pt-0" : "pt-2"}`}>
        {children}
      </div>
    </BaseAccordion.Panel>
  );
});

AccordionPanel.displayName = "AccordionPanel";

type AccordionType = typeof AccordionRoot & {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Panel: typeof AccordionPanel;
};

export const Accordion = AccordionRoot as AccordionType;
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Panel = AccordionPanel;

export * from "./accordion.styles";
export * from "./accordion.types";
export * from "./accordion-context";
