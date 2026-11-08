import type { DocComponentData, NavCategoryGroup } from "./types";

// ----------------------------------------------------------------------
// Navigation Categories
// ----------------------------------------------------------------------

export const DOCS_NAV_GROUPS: NavCategoryGroup[] = [
  {
    title: "Getting Started",
    items: [
      { id: "theming", name: "Theming & Tokens" },
      { id: "cli", name: "CLI & Architecture" },
      { id: "changelog", name: "Changelog" },
    ],
  },
  {
    title: "Components",
    items: [
      { id: "accordion", name: "Accordion" },
      { id: "alert", name: "Alert" },
      { id: "alert-dialog", name: "Alert Dialog" },
      { id: "app-bar", name: "App Bar" },
      { id: "aspect-ratio", name: "Aspect Ratio" },
      { id: "attachment", name: "Attachment" },
      { id: "autocomplete", name: "Autocomplete" },
      { id: "avatar", name: "Avatar" },
      { id: "backdrop", name: "Backdrop" },
      { id: "badge", name: "Badge" },
      { id: "bottom-navigation", name: "Bottom Navigation" },
      { id: "breadcrumb", name: "Breadcrumb" },
      { id: "bubble", name: "Bubble" },
      { id: "button", name: "Button" },
      { id: "button-group", name: "Button Group" },
      { id: "calendar", name: "Calendar" },
      { id: "card", name: "Card" },
      { id: "carousel", name: "Carousel" },
      { id: "checkbox", name: "Checkbox" },
      { id: "checkbox-group", name: "Checkbox Group" },
      { id: "code-block", name: "Code Block" },
      { id: "collapsible", name: "Collapsible" },
      { id: "combobox", name: "Combobox" },
      { id: "command", name: "Command" },
      { id: "context-menu", name: "Context Menu" },
      { id: "data-table", name: "Data Table" },
      { id: "date-picker", name: "Date Picker" },
      { id: "dialog", name: "Dialog" },
      { id: "direction", name: "Direction" },
      { id: "drawer", name: "Drawer" },
      { id: "empty", name: "Empty" },
      { id: "field", name: "Field" },
      { id: "fieldset", name: "Fieldset" },
      { id: "form", name: "Form" },
      { id: "input", name: "Input" },
      { id: "input-label", name: "Input Label" },
      { id: "kbd", name: "Kbd" },
      { id: "marker", name: "Marker" },
      { id: "menu", name: "Menu" },
      { id: "menubar", name: "Menubar" },
      { id: "message", name: "Message" },
      { id: "message-scroller", name: "Message Scroller" },
      { id: "meter", name: "Meter" },
      { id: "navigation-menu", name: "Navigation Menu" },
      { id: "number-field", name: "Number Field" },
      { id: "otp-field", name: "OTP Field" },
      { id: "pagination", name: "Pagination" },
      { id: "popover", name: "Popover" },
      { id: "preview-card", name: "Preview Card" },
      { id: "progress", name: "Progress" },
      { id: "questionnaire", name: "Questionnaire" },
      { id: "radio-group", name: "Radio Group" },
      { id: "resizable", name: "Resizable" },
      { id: "scroll-area", name: "Scroll Area" },
      { id: "select", name: "Select" },
      { id: "separator", name: "Separator" },
      { id: "sidebar", name: "Sidebar" },
      { id: "skeleton", name: "Skeleton" },
      { id: "slider", name: "Slider" },
      { id: "spinner", name: "Spinner" },
      { id: "switch", name: "Switch" },
      { id: "table", name: "Table" },
      { id: "tabs", name: "Tabs" },
      { id: "toast", name: "Toast" },
      { id: "toggle", name: "Toggle" },
      { id: "toggle-group", name: "Toggle Group" },
      { id: "tool", name: "Tool" },
      { id: "toolbar", name: "Toolbar" },
      { id: "tooltip", name: "Tooltip" },
      { id: "trace", name: "Trace" },
      { id: "typography", name: "Typography" },
    ],
  },
];

// ----------------------------------------------------------------------
// Documentation Data Dictionary (Pure Data)
// ----------------------------------------------------------------------

export const DOCS_COMPONENTS_DATA: Record<string, DocComponentData> = {
  accordion: {
    id: "accordion",
    name: "Accordion",
    category: "Surfaces & Overlays",
    description:
      "A vertically stacked set of interactive headings that each reveal a section of content.",
    basePrimitive: "@base-ui/react Accordion",
    stylingEngine: "@mui/system Box + Theme Tokens",
    importCode: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from "@/_core/theme/components";`,
    usageCode: `<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>What are your shipping options?</AccordionTrigger>
    <AccordionPanel>
      We offer standard 3-5 day delivery as well as priority expedited express shipping.
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>What is your return policy?</AccordionTrigger>
    <AccordionPanel>
      You can return any unworn items within 30 days of delivery for a full refund.
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
    <AccordionPanel>
      Our 24/7 support team is available via chat or email.
    </AccordionPanel>
  </AccordionItem>
</Accordion>`,
    props: [
      {
        name: "value",
        type: "string[]",
        description: "The controlled open values array.",
      },
      {
        name: "defaultValue",
        type: "string[]",
        defaultValue: "[]",
        description: "The initial default open panel values.",
      },
      {
        name: "onValueChange",
        type: "(val: string[]) => void",
        description: "Callback triggered when panel expansion changes.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Whether the accordion interactions are disabled.",
      },
    ],
  },

  button: {
    id: "button",
    name: "Button",
    category: "Inputs & Forms",
    description:
      "Interactive button with elevation, soft fills, backdrop blur support, and full semantic color tokens.",
    basePrimitive: "@base-ui/react Button",
    stylingEngine: "@mui/system Box + Theme Tokens",
    importCode: `import { Button } from "@/_core/theme/components";`,
    usageCode: `<div className="flex flex-wrap gap-3">
  <Button variant="contained" color="primary">Contained</Button>
  <Button variant="outlined" color="primary">Outlined</Button>
  <Button variant="soft" color="primary">Soft</Button>
  <Button variant="text" color="primary">Text</Button>
</div>`,
    props: [
      {
        name: "variant",
        type: '"contained" | "outlined" | "soft" | "text"',
        defaultValue: '"contained"',
        description: "Visual appearance style variant.",
      },
      {
        name: "color",
        type: '"primary" | "secondary" | "success" | "warning" | "error" | "info" | "inherit"',
        defaultValue: '"primary"',
        description: "Semantic theme color token mapping.",
      },
      {
        name: "size",
        type: '"small" | "medium" | "large"',
        defaultValue: '"medium"',
        description: "Size dimensions and typography scaling.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables pointer events and lowers opacity.",
      },
    ],
  },

  badge: {
    id: "badge",
    name: "Badge",
    category: "Feedback & Status",
    description:
      "Small numerical or status badge indicator attached to an element or rendered standalone.",
    basePrimitive: "@mui/system Box",
    stylingEngine: "@mui/system Box + Theme Tokens",
    importCode: `import { Badge } from "@/_core/theme/components";`,
    usageCode: `<div className="flex items-center gap-4">
  <Badge color="primary" badgeContent="4">
    <Avatar>AG</Avatar>
  </Badge>
  <Badge color="success" variant="dot">
    <Avatar>JD</Avatar>
  </Badge>
  <Badge color="error" badgeContent="99+">
    <Avatar>US</Avatar>
  </Badge>
</div>`,
    props: [
      {
        name: "badgeContent",
        type: "ReactNode",
        description: "Text or numeric content inside the badge.",
      },
      {
        name: "color",
        type: '"primary" | "secondary" | "success" | "warning" | "error" | "info" | "default"',
        defaultValue: '"primary"',
        description: "Semantic badge color scheme.",
      },
      {
        name: "variant",
        type: '"standard" | "dot"',
        defaultValue: '"standard"',
        description: "Style variant: full pill or compact dot.",
      },
    ],
  },

  card: {
    id: "card",
    name: "Card",
    category: "Surfaces & Overlays",
    description:
      "Versatile card surface container supporting headers, bodies, action bars, and subtle borders.",
    basePrimitive: "@mui/system Box",
    stylingEngine: "@mui/system Box + Theme Tokens",
    importCode: `import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button
} from "@/_core/theme/components";`,
    usageCode: `<Card variant="outlined" className="max-w-sm">
  <CardHeader
    title="Design System Card"
    subheader="Seamless tokens & Base UI headless primitives"
  />
  <CardContent>
    Card content with support for high contrast and dark mode.
  </CardContent>
  <CardActions>
    <Button size="small" variant="text" color="primary">Learn More</Button>
  </CardActions>
</Card>`,
    props: [
      {
        name: "variant",
        type: '"elevation" | "outlined"',
        defaultValue: '"elevation"',
        description: "Surface presentation style.",
      },
      {
        name: "elevation",
        type: "number",
        defaultValue: "1",
        description: "Shadow elevation level (0-24).",
      },
    ],
  },

  dialog: {
    id: "dialog",
    name: "Dialog",
    category: "Surfaces & Overlays",
    description:
      "Modal dialog with accessible focus trapping, backdrop blur, and animated entrance.",
    basePrimitive: "@base-ui/react Dialog",
    stylingEngine: "@mui/system Box + Theme Tokens",
    importCode: `import { Dialog, Button } from "@/_core/theme/components";`,
    usageCode: `<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Confirm Action"
  description="Are you sure you want to proceed with this update?"
  actions={
    <>
      <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="contained" color="primary" onClick={() => setOpen(false)}>Confirm</Button>
    </>
  }
>
  <div className="py-2 text-sm text-text-secondary">
    Dialog modal content with focus management.
  </div>
</Dialog>`,
    props: [
      {
        name: "open",
        type: "boolean",
        description: "Controlled open state.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Callback on state change.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Heading title for the dialog.",
      },
      {
        name: "description",
        type: "ReactNode",
        description: "Description or helper text.",
      },
    ],
  },

  toast: {
    id: "toast",
    name: "Toast",
    category: "Feedback & Status",
    description:
      "Global toast notification system supporting stacked cards, progress indicators, and swipe dismiss.",
    basePrimitive: "@base-ui/react Toast",
    stylingEngine: "@mui/system Box + Theme Tokens",
    importCode: `import { Toast, Button } from "@/_core/theme/components";`,
    usageCode: `// In your component:
const toastManager = Toast.useToastManager();

<Button
  variant="contained"
  onClick={() => {
    toastManager.add({
      title: "Settings Saved",
      description: "Your preference updates were applied successfully.",
      type: "success",
    });
  }}
>
  Show Toast
</Button>`,
    props: [
      {
        name: "title",
        type: "ReactNode",
        description: "Title heading of the toast notification.",
      },
      {
        name: "description",
        type: "ReactNode",
        description: "Secondary text message.",
      },
      {
        name: "type",
        type: '"default" | "success" | "warning" | "error" | "info"',
        description: "Semantic severity type.",
      },
    ],
  },
};

// ----------------------------------------------------------------------
// Fallback Generator for all 70 Components
// ----------------------------------------------------------------------

export function getComponentDocData(id: string): DocComponentData {
  if (DOCS_COMPONENTS_DATA[id]) {
    return DOCS_COMPONENTS_DATA[id];
  }

  // Format title from kebab-case
  const name = id
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const pascalName = name.replace(/\s+/g, "");

  return {
    id,
    name,
    category: "Components",
    description: `Production-ready ${name} component built with Base UI headless primitives and custom theme tokens.`,
    basePrimitive: `@base-ui/react ${pascalName}`,
    stylingEngine: "@mui/system Box + Theme Tokens",
    importCode: `import { ${pascalName} } from "@/_core/theme/components";`,
    usageCode: `<${pascalName} />`,
    props: [
      {
        name: "sx",
        type: "SxProps<Theme>",
        description: "Custom styling overrides using theme tokens.",
      },
      {
        name: "className",
        type: "string",
        description: "Tailwind CSS utility classes.",
      },
      {
        name: "slotProps",
        type: "Record<string, BoxProps>",
        description: "Deep customization of internal element slots.",
      },
    ],
  };
}
