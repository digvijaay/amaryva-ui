"use client";

import { Container, Stack } from "@mui/system";
import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  AlertDialog,
  AppBar,
  AspectRatio,
  Attachment,
  Autocomplete,
  Avatar,
  Backdrop,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Breadcrumb,
  Bubble,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Checkbox,
  CheckboxGroup,
  CodeBlock,
  Collapsible,
  Combobox,
  Command,
  ContextMenu,
  DataTable,
  type DataTableColumn,
  DatePicker,
  Dialog,
  Direction,
  Drawer,
  Empty,
  Field,
  Fieldset,
  Form,
  Input,
  Kbd,
  Marker,
  Menu,
  Menubar,
  Message,
  MessageAction,
  MessageActions,
  MessageScroller,
  Meter,
  NavigationMenu,
  NumberField,
  OTPField,
  Pagination,
  Popover,
  PreviewCard,
  Progress,
  Questionnaire,
  Radio,
  RadioGroup,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Select,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarProvider,
  SidebarToggle,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Toast,
  Toggle,
  ToggleGroup,
  Tool,
  Toolbar,
  Tooltip,
  Trace,
  TraceStep,
  Typography,
} from "@/_core/theme/components";

// ----------------------------------------------------------------------
// Icons
// ----------------------------------------------------------------------

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <title>Plus</title>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MailIcon() {
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
      <title>Mail</title>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function SearchIcon() {
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
      <title>Search</title>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon() {
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
      <title>Settings</title>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function BellIcon() {
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
      <title>Bell</title>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <title>Home</title>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <title>Favorites</title>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <title>Calendar</title>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <title>Profile</title>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// Interactive Toast Demo Component
// ----------------------------------------------------------------------

function InteractiveToastDemo() {
  const toastManager = Toast.useToastManager();
  const [toastCount, setToastCount] = React.useState(28);

  const handleCreateToast = () => {
    const nextCount = toastCount + 1;
    setToastCount(nextCount);
    toastManager.add({
      title: `Toast ${nextCount} created`,
      description: "This is a toast notification.",
      type: "default",
      timeout: 5000,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="small"
          variant="contained"
          color="inherit"
          onClick={handleCreateToast}
        >
          Create Toast
        </Button>
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => {
            toastManager.add({
              title: "Changes Saved",
              description: "Your settings have been saved successfully.",
              type: "success",
              timeout: 4000,
            });
          }}
        >
          Success
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            toastManager.add({
              title: "Error Occurred",
              description: "Could not connect to the remote database.",
              type: "error",
              timeout: 4000,
            });
          }}
        >
          Error
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="warning"
          onClick={() => {
            toastManager.add({
              title: "Storage Warning",
              description: "Approaching 90% disk capacity limit.",
              type: "warning",
              timeout: 4000,
            });
          }}
        >
          Warning
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="info"
          onClick={() => {
            toastManager.add({
              title: "System Notification",
              description: "Scheduled maintenance tonight at 02:00 UTC.",
              type: "info",
              timeout: 4000,
            });
          }}
        >
          Info
        </Button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Table Data Interface
// ----------------------------------------------------------------------

interface TeamMember extends Record<string, unknown> {
  id: string;
  name: string;
  role: string;
  department: string;
  status: string;
}

// ----------------------------------------------------------------------
// Main Showcase Page
// ----------------------------------------------------------------------

export default function Home() {
  // State for all interactive widgets
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [sliderValue, setSliderValue] = React.useState<number | number[]>(65);
  const [checkboxChecked, setCheckboxChecked] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState("pro");
  const [activeTab, setActiveTab] = React.useState("overview");
  const [selectValue, setSelectValue] = React.useState<string | number>(
    "system",
  );
  const [comboboxVal, setComboboxVal] = React.useState<string | number>(
    "react",
  );
  const [togglePressed, setTogglePressed] = React.useState(true);
  const [toggleGroupVal, setToggleGroupVal] = React.useState<string[]>([
    "center",
  ]);
  const [bottomNavVal, setBottomNavVal] = React.useState<unknown>("home");
  const [paginationPage, setPaginationPage] = React.useState(2);
  const [calendarDate, setCalendarDate] = React.useState<Date | null>(null);
  const [datePickerVal, setDatePickerVal] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setCalendarDate(new Date(2026, 10, 8));
    setDatePickerVal(new Date(2026, 10, 8));
  }, []);
  const [quantity, setQuantity] = React.useState<number | null>(3);
  const [otpValue, setOtpValue] = React.useState("984120");
  const [autocompleteValue, setAutocompleteValue] =
    React.useState<string>("nextjs");
  const [formSubmitted, setFormSubmitted] = React.useState<string | null>(null);

  const frameworkOptions = [
    { value: "nextjs", label: "Next.js 16 (App Router)" },
    { value: "react", label: "React 19" },
    { value: "base-ui", label: "@base-ui/react Headless" },
    { value: "mui", label: "@mui/system Box & Engine" },
    { value: "tailwind", label: "Tailwind CSS v4" },
    { value: "biome", label: "Biome 2.0 Formatter & Linter" },
  ];

  const sampleTableData: TeamMember[] = [
    {
      id: "1",
      name: "Ada Lovelace",
      role: "Lead Architect",
      department: "Systems",
      status: "Active",
    },
    {
      id: "2",
      name: "Alan Turing",
      role: "Cryptographer",
      department: "Security",
      status: "Active",
    },
    {
      id: "3",
      name: "Grace Hopper",
      role: "Compiler Engineer",
      department: "Platform",
      status: "Offline",
    },
    {
      id: "4",
      name: "Claude Shannon",
      role: "Information Scientist",
      department: "Research",
      status: "Active",
    },
  ];

  const tableColumns: DataTableColumn<TeamMember>[] = [
    { id: "name", header: "Name", accessorKey: "name", sortable: true },
    { id: "role", header: "Role", accessorKey: "role", sortable: true },
    {
      id: "department",
      header: "Department",
      accessorKey: "department",
      sortable: true,
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <Badge
          variant="standard"
          color={row.status === "Active" ? "success" : "default"}
          badgeContent={row.status}
        />
      ),
    },
  ];

  return (
    <Container maxWidth="xl" className="py-8 space-y-12">
      {/* 1. APP BAR & HEADER NAVIGATION */}
      <Stack spacing={3}>
        <AppBar
          position="static"
          color="transparent"
          elevation={1}
          className="rounded-2xl border border-divider px-4"
        >
          <div className="flex items-center justify-between w-full h-16">
            <div className="flex items-center gap-3">
              <Avatar
                alt="Antigravity Logo"
                sx={{
                  bgcolor: "var(--theme-color-primary-main)",
                  color: "var(--theme-color-primary-contrastText)",
                  width: 36,
                  height: 36,
                  fontWeight: "bold",
                }}
              >
                AG
              </Avatar>
              <div>
                <Typography
                  variant="subtitle1"
                  className="font-bold leading-none"
                >
                  Antigravity Design System
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  70 Headless & Themed Components Suite
                </Typography>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <Menubar>
                <Menu
                  trigger={
                    <Button variant="text" size="small" color="inherit">
                      File
                    </Button>
                  }
                  items={[
                    { label: "New Document" },
                    { label: "Open Project" },
                    { label: "Export UI Bundle", separatorAfter: true },
                  ]}
                />
                <Menu
                  trigger={
                    <Button variant="text" size="small" color="inherit">
                      Edit
                    </Button>
                  }
                  items={[
                    { label: "Undo" },
                    { label: "Redo" },
                    { label: "Find & Replace", separatorAfter: true },
                  ]}
                />
                <Menu
                  trigger={
                    <Button variant="text" size="small" color="inherit">
                      View
                    </Button>
                  }
                  items={[{ label: "Toggle Fullscreen" }, { label: "Zoom In" }]}
                />
              </Menubar>
            </div>

            <div className="flex items-center gap-2">
              <Badge color="error" variant="dot" overlap="circular">
                <Button
                  variant="soft"
                  color="inherit"
                  size="small"
                  sx={{ p: 1, minWidth: "auto", borderRadius: "50%" }}
                >
                  <BellIcon />
                </Button>
              </Badge>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => setDialogOpen(true)}
              >
                <PlusIcon />{" "}
                <span className="ml-1 hidden sm:inline">New Action</span>
              </Button>
            </div>
          </div>
        </AppBar>

        <Breadcrumb
          items={[
            { label: "Home", href: "#", icon: <HomeIcon /> },
            { label: "Design System", href: "#" },
            { label: "Components Suite" },
          ]}
        />
      </Stack>

      {/* 2. NAVIGATION & TOOLBARS */}
      <Card variant="outlined">
        <CardHeader
          title="Navigation & Command Surfaces"
          subheader="AppBar, Breadcrumb, NavigationMenu, Menubar, Toolbar, BottomNavigation, and Command Palette"
        />
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="uppercase tracking-wider text-xs font-semibold"
              >
                NavigationMenu & Dropdowns
              </Typography>
              <NavigationMenu>
                <NavigationMenu.List>
                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger>Platform</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <div className="flex flex-col gap-1 w-48 p-2">
                        <NavigationMenu.Link href="#core">
                          System Architecture
                        </NavigationMenu.Link>
                        <NavigationMenu.Link href="#tokens">
                          Design Tokens
                        </NavigationMenu.Link>
                        <NavigationMenu.Link href="#components">
                          Component Library
                        </NavigationMenu.Link>
                      </div>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <div className="flex flex-col gap-1 w-48 p-2">
                        <NavigationMenu.Link href="#docs">
                          Documentation
                        </NavigationMenu.Link>
                        <NavigationMenu.Link href="#guidelines">
                          MUI & Base UI Guides
                        </NavigationMenu.Link>
                      </div>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link href="#changelog">
                      Changelog
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="uppercase tracking-wider text-xs font-semibold pt-2"
              >
                Toolbar & Actions
              </Typography>
              <Toolbar className="border border-divider rounded-xl p-1.5 flex-wrap gap-2">
                <Button variant="text" size="small" color="inherit">
                  <MailIcon /> <span className="ml-1 text-xs">Email</span>
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <ToggleGroup
                  value={toggleGroupVal}
                  onValueChange={setToggleGroupVal}
                  exclusive
                >
                  <Toggle value="left" aria-label="Align left">
                    Left
                  </Toggle>
                  <Toggle value="center" aria-label="Align center">
                    Center
                  </Toggle>
                  <Toggle value="right" aria-label="Align right">
                    Right
                  </Toggle>
                </ToggleGroup>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant="soft" size="small" color="primary">
                  <SettingsIcon />
                </Button>
              </Toolbar>
            </div>

            <div className="space-y-4">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="uppercase tracking-wider text-xs font-semibold"
              >
                Command Palette (Search & Shortcuts)
              </Typography>
              <div className="border border-divider rounded-xl overflow-hidden shadow-sm">
                <Command className="h-44">
                  <Command.Input placeholder="Search commands, docs, or files..." />
                  <Command.List>
                    <Command.Empty>No results found.</Command.Empty>
                    <Command.Group heading="Suggestions">
                      <Command.Item onSelect={() => setDialogOpen(true)}>
                        <span>Open Modal Dialog</span>
                        <Command.Shortcut>⌘D</Command.Shortcut>
                      </Command.Item>
                      <Command.Item onSelect={() => setDrawerOpen(true)}>
                        <span>Open Navigation Drawer</span>
                        <Command.Shortcut>⌘B</Command.Shortcut>
                      </Command.Item>
                      <Command.Item>
                        <span>Change Theme Mode</span>
                        <Command.Shortcut>⌘T</Command.Shortcut>
                      </Command.Item>
                    </Command.Group>
                  </Command.List>
                </Command>
              </div>

              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="uppercase tracking-wider text-xs font-semibold pt-2"
              >
                Mobile Bottom Navigation
              </Typography>
              <div className="border border-divider rounded-xl overflow-hidden bg-background-paper max-w-sm mx-auto w-full">
                <BottomNavigation
                  value={bottomNavVal}
                  onChange={(_, val) => setBottomNavVal(val)}
                  showLabels
                >
                  <BottomNavigationAction
                    label="Home"
                    value="home"
                    icon={<HomeIcon />}
                  />
                  <BottomNavigationAction
                    label="Favorites"
                    value="favorites"
                    icon={<StarIcon />}
                  />
                  <BottomNavigationAction
                    label="Events"
                    value="events"
                    icon={<CalendarIcon />}
                  />
                  <BottomNavigationAction
                    label="Profile"
                    value="profile"
                    icon={<UserIcon />}
                  />
                </BottomNavigation>
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="text" size="small" color="primary">
            Explore All 70 Components
          </Button>
        </CardActions>
      </Card>

      {/* 3. BUTTONS, TOGGLES, BADGES & KEYS */}
      <Card variant="outlined">
        <CardHeader
          title="Buttons, Toggles, Badges & Micro-Typography"
          subheader="Button variants, ButtonGroup, Toggle, ToggleGroup, Badge indicators, Marker and Kbd"
        />
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className="text-xs uppercase font-semibold"
            >
              Button Variants & Colors
            </Typography>
            <div className="flex flex-wrap gap-2.5 items-center">
              <Button variant="contained" color="primary">
                Primary Contained
              </Button>
              <Button variant="contained" color="success">
                Success
              </Button>
              <Button variant="contained" color="error">
                Error
              </Button>
              <Button variant="contained" color="warning">
                Warning
              </Button>
              <Button variant="contained" color="info">
                Info
              </Button>
              <Button variant="contained" color="inherit">
                Inherit
              </Button>
            </div>
            <div className="flex flex-wrap gap-2.5 items-center">
              <Button variant="outlined" color="primary">
                Primary Outlined
              </Button>
              <Button variant="soft" color="primary">
                Primary Soft
              </Button>
              <Button variant="text" color="primary">
                Text Action
              </Button>
              <Button variant="contained" color="primary" disabled>
                Disabled
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                ButtonGroup
              </Typography>
              <ButtonGroup variant="contained" color="primary" size="small">
                <Button>Years</Button>
                <Button>Months</Button>
                <Button>Days</Button>
              </ButtonGroup>
            </div>

            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Toggle & State
              </Typography>
              <div className="flex items-center gap-2">
                <Toggle
                  pressed={togglePressed}
                  onPressedChange={setTogglePressed}
                  color="primary"
                >
                  <StarIcon />{" "}
                  <span className="ml-1 text-xs">
                    {togglePressed ? "Starred" : "Star"}
                  </span>
                </Toggle>
              </div>
            </div>

            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Keyboard Keys (Kbd) & Markers
              </Typography>
              <div className="flex flex-wrap items-center gap-2">
                <Kbd>⌘</Kbd>
                <Kbd>Shift</Kbd>
                <Kbd>P</Kbd>
                <Marker variant="dot" pulse color="success">
                  Live
                </Marker>
                <Marker variant="pin" color="error">
                  Critical
                </Marker>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className="text-xs uppercase font-semibold"
            >
              Badge Anchors & Counts
            </Typography>
            <div className="flex flex-wrap gap-6 items-center">
              <Badge badgeContent={4} color="primary">
                <Avatar alt="User 1">U1</Avatar>
              </Badge>
              <Badge badgeContent={99} max={50} color="error">
                <Avatar alt="User 2">U2</Avatar>
              </Badge>
              <Badge variant="dot" color="success">
                <Avatar alt="Online User">ON</Avatar>
              </Badge>
              <Badge badgeContent="VIP" color="warning">
                <Button variant="outlined" size="small">
                  Member
                </Button>
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="text" size="small" color="primary">
            Explore All 70 Components
          </Button>
        </CardActions>
      </Card>

      {/* 4. FORM INPUTS & SELECTIONS */}
      <Card variant="outlined">
        <CardHeader
          title="Form Controls, Date Picker & Inputs"
          subheader="Input, NumberField, OTPField, DatePicker, Select, Combobox, Autocomplete, Switch, Slider, Radio & Checkbox"
        />
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field
              label="Standard Text Input"
              helperText="With start adornment icon"
            >
              <Input
                placeholder="Search or input text..."
                startAdornment={<SearchIcon />}
              />
            </Field>

            <Field
              label="Interactive Date Picker"
              helperText="Calendar popover input"
            >
              <DatePicker
                value={datePickerVal}
                onChange={setDatePickerVal}
                placeholder="Select inspection date..."
              />
            </Field>

            <NumberField
              label="Seat Quantity"
              helperText="Min: 1, Max: 10 seats"
              value={quantity}
              min={1}
              max={10}
              onValueChange={setQuantity}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Select Dropdown" helperText="Native single choice">
              <Select
                value={selectValue}
                onValueChange={(val) => setSelectValue(val as string | number)}
                options={[
                  { value: "system", label: "System Default" },
                  { value: "light", label: "Light Theme" },
                  { value: "dark", label: "Dark Theme" },
                ]}
              />
            </Field>

            <Field
              label="Searchable Combobox"
              helperText="Autocomplete selection"
            >
              <Combobox
                value={comboboxVal}
                onValueChange={(val) => setComboboxVal(val as string | number)}
                options={[
                  { value: "react", label: "React 19" },
                  { value: "nextjs", label: "Next.js 16" },
                  { value: "tailwind", label: "Tailwind CSS v4" },
                  { value: "figma", label: "Figma Tokens" },
                ]}
                placeholder="Select platform..."
              />
            </Field>

            <Autocomplete
              label="Autocomplete Framework"
              helperText="Type to filter technologies"
              options={frameworkOptions}
              value={autocompleteValue}
              onValueChange={(val) => setAutocompleteValue(String(val))}
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* OTPField */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                OTP 6-Digit PIN Code
              </Typography>
              <OTPField
                length={6}
                value={otpValue}
                onValueChange={setOtpValue}
              />
              <Typography
                variant="caption"
                color="textSecondary"
                className="block pt-1"
              >
                Value: <strong>{otpValue}</strong>
              </Typography>
            </div>

            {/* Switch & Slider */}
            <div className="space-y-3">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Switch & Slider
              </Typography>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Automatic Backups</span>
                <Switch
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                  color="primary"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-text-secondary">
                  <span>Bandwidth Cap</span>
                  <span>{sliderValue}%</span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  color="primary"
                />
              </div>
            </div>

            {/* Checkbox & Radio Groups */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Radio & Checkbox Groups
              </Typography>
              <RadioGroup
                value={radioValue}
                onValueChange={(val) => setRadioValue(String(val))}
                className="flex gap-4"
              >
                <Radio value="starter" label="Starter" />
                <Radio value="pro" label="Pro Tier" color="primary" />
              </RadioGroup>
              <Fieldset legend="Permissions & Consent">
                <CheckboxGroup defaultValue={["terms"]}>
                  <Checkbox
                    value="terms"
                    checked={checkboxChecked}
                    onCheckedChange={(val) => setCheckboxChecked(Boolean(val))}
                    label="I agree to developer terms"
                    color="primary"
                  />
                </CheckboxGroup>
              </Fieldset>
            </div>
          </div>

          <Separator />

          {/* Form wrapper validation demo */}
          <Form
            onFormSubmit={(data) =>
              setFormSubmitted(JSON.stringify(data, null, 2))
            }
            className="flex flex-wrap items-end gap-4 p-4 rounded-xl border border-dashed border-divider"
          >
            <div className="flex-1 min-w-[240px]">
              <Field name="sampleEmail" label="Form Controlled Field" required>
                <Input
                  name="sampleEmail"
                  type="email"
                  placeholder="dev@antigravity.ai"
                  required
                />
              </Field>
            </div>
            <Button type="submit" variant="contained" color="primary">
              Validate Form
            </Button>
            {formSubmitted && (
              <span className="text-xs text-emerald-500 font-semibold self-center">
                ✓ Validated & Submitted!
              </span>
            )}
          </Form>
        </CardContent>
      </Card>

      {/* 5. DATA TABLES, TABLES, CALENDARS & EMPTY STATES */}
      <Card variant="outlined">
        <CardHeader
          title="Data Tables, Calendar, Pagination & Empty State"
          subheader="DataTable with sorting and filters, Table styled primitives, pure Calendar grid, and Empty illustrations"
        />
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Interactive Calendar
              </Typography>
              <div className="border border-divider rounded-xl p-3 bg-background-paper">
                <Calendar value={calendarDate} onChange={setCalendarDate} />
              </div>
            </div>

            {/* DataTable */}
            <div className="lg:col-span-2 space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                DataTable (Search, Sort & Row Select)
              </Typography>
              <DataTable
                columns={tableColumns}
                data={sampleTableData}
                searchable
                selectable
                pageSize={3}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Raw Table primitives */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Styled Table Primitives
              </Typography>
              <TableContainer className="border border-divider rounded-xl overflow-hidden">
                <Table size="small">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Protocol</TableHead>
                      <TableHead>Port</TableHead>
                      <TableHead align="right">Latency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>HTTP/3 Quick</TableCell>
                      <TableCell>443</TableCell>
                      <TableCell align="right">12ms</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>WebSocket TLS</TableCell>
                      <TableCell>8443</TableCell>
                      <TableCell align="right">18ms</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <div className="pt-2 flex justify-center">
                <Pagination
                  count={10}
                  page={paginationPage}
                  onChange={(_, p) => setPaginationPage(p)}
                  color="primary"
                />
              </div>
            </div>

            {/* Empty State Illustration */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Empty State Component
              </Typography>
              <div className="border border-divider rounded-xl p-4 bg-background-paper">
                <Empty
                  title="No Active Deployments"
                  description="Deploy your first Next.js service to activate real-time telemetry."
                  action={
                    <Button variant="contained" color="primary" size="small">
                      Create Deployment
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="text" size="small" color="primary">
            Explore All 70 Components
          </Button>
        </CardActions>
      </Card>

      {/* 6. AGENTIC, AI, CODE & WORKFLOWS */}
      <Card variant="outlined">
        <CardHeader
          title="Agentic, AI Chat, Execution Traces & Code Blocks"
          subheader="Message, Bubble, MessageScroller, Tool Call viewer, Trace Step timeline, and CodeBlock"
        />
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Messages & MessageScroller */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                AI Chat Messages & Bubble
              </Typography>
              <div className="border border-divider rounded-xl p-4 bg-background-paper h-80 overflow-hidden">
                <MessageScroller className="h-full">
                  <Message
                    messageRole="user"
                    sender="You"
                    timestamp="10:41 AM"
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: "var(--theme-color-info-main)",
                          width: 28,
                          height: 28,
                        }}
                      >
                        U
                      </Avatar>
                    }
                  >
                    Can you generate the remaining UI components with Tailwind
                    and MUI Box?
                  </Message>

                  <Message
                    messageRole="assistant"
                    sender="Antigravity Agent"
                    timestamp="10:42 AM"
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: "var(--theme-color-primary-main)",
                          width: 28,
                          height: 28,
                        }}
                      >
                        AG
                      </Avatar>
                    }
                    actions={
                      <MessageActions>
                        <MessageAction>Copy</MessageAction>
                        <MessageAction>Thumbs Up</MessageAction>
                        <MessageAction>Regenerate</MessageAction>
                      </MessageActions>
                    }
                  >
                    All 70 components have been implemented following AGENTS.md,
                    with full slot customization, zero Biome errors, and zero
                    TypeScript errors.
                  </Message>

                  <div className="pt-2 flex flex-col gap-2">
                    <Bubble variant="soft" color="primary" pointer="left">
                      Direct standalone bubble component with directional
                      pointer
                    </Bubble>
                  </div>
                </MessageScroller>
              </div>
            </div>

            {/* Agent Tool & Trace Timeline */}
            <div className="space-y-4">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Agent Tool Call & Execution Trace
              </Typography>
              <Tool
                name="npm_run_build"
                status="success"
                input={{
                  target: "production",
                  webpack: true,
                  experimental: { agentFeedback: true },
                }}
                output={{
                  status: "compiled",
                  durationMs: 29800,
                  modulesCount: 174,
                }}
              />

              <div className="border border-divider rounded-xl p-3 bg-background-paper">
                <Trace title="Pipeline Build Trace">
                  <TraceStep
                    title="Initialize Environment"
                    status="success"
                    duration="140ms"
                  >
                    Verified Node 20 runtime and loaded .env.local variables.
                  </TraceStep>
                  <TraceStep
                    title="Compile TypeScript AST"
                    status="success"
                    duration="22.3s"
                  >
                    npx tsc completed with zero errors across all components.
                  </TraceStep>
                  <TraceStep
                    title="Optimized Webpack Bundle"
                    status="success"
                    duration="29.8s"
                  >
                    Generated production chunks and pre-rendered static routes.
                  </TraceStep>
                </Trace>
              </div>
            </div>
          </div>

          <Separator />

          {/* CodeBlock & Questionnaire */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                CodeBlock with Copy Feedback
              </Typography>
              <CodeBlock
                language="tsx"
                filename="toast-usage.tsx"
                code={`import { Toast, Button } from "@/_core/theme/components";

export function NotifyButton() {
  const toast = Toast.useToastManager();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => toast.add({
        title: "Deployment Complete",
        description: "Your app is live on Cloud Run.",
        type: "success"
      })}
    >
      Deploy Now
    </Button>
  );
}`}
              />
            </div>

            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Interactive Questionnaire Wizard
              </Typography>
              <div className="border border-divider rounded-xl p-4 bg-background-paper">
                <Questionnaire
                  questions={[
                    {
                      id: "engine",
                      question:
                        "Which styling engine powers your responsive sx props?",
                      options: [
                        {
                          label: "@mui/system Box & Theme Engine",
                          value: "mui",
                        },
                        { label: "Unstyled CSS Modules", value: "css" },
                      ],
                    },
                    {
                      id: "primitives",
                      question:
                        "Which headless library manages accessible overlays?",
                      options: [
                        {
                          label: "@base-ui/react Accessible Primitives",
                          value: "base-ui",
                        },
                        {
                          label: "Native HTML Dialog tags only",
                          value: "native",
                        },
                      ],
                    },
                  ]}
                  onComplete={(answers) => {
                    console.log("Questionnaire answers:", answers);
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="text" size="small" color="primary">
            Explore All 70 Components
          </Button>
        </CardActions>
      </Card>

      {/* 7. LAYOUT: RESIZABLE, SIDEBAR, CAROUSEL, ATTACHMENTS & RATIOS */}
      <Card variant="outlined">
        <CardHeader
          title="Structural Layouts, Resizable Panels & Media"
          subheader="ResizablePanelGroup, Sidebar layout, Carousel, AspectRatio, Attachment cards, and Direction"
        />
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resizable Panels */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Resizable Panel Group (Drag Handle)
              </Typography>
              <div className="h-44 border border-divider rounded-xl overflow-hidden">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel
                    defaultSize={40}
                    minSize={20}
                    className="p-4 bg-background-paper flex items-center justify-center"
                  >
                    <span className="text-xs font-semibold text-text-secondary">
                      Left Panel (Drag splitter →)
                    </span>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel
                    defaultSize={60}
                    minSize={30}
                    className="bg-background-default h-full"
                  >
                    <ScrollArea className="h-full w-full p-4">
                      <div className="flex flex-col gap-1 text-xs text-text-secondary">
                        <span className="font-semibold text-text-primary">
                          ScrollArea Container
                        </span>
                        <span>Item 1 • Responsive resizer</span>
                        <span>Item 2 • Smooth scrolling area</span>
                        <span>Item 3 • Accessible thumb bar</span>
                      </div>
                    </ScrollArea>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>

            {/* Carousel */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Carousel with Dot Indicators
              </Typography>
              <div className="border border-divider rounded-xl p-3 bg-background-paper">
                <Carousel autoPlay={false}>
                  <CarouselContent>
                    <CarouselItem>
                      <div className="h-32 rounded-lg bg-primary/10 border border-primary/20 flex flex-col items-center justify-center p-4 text-center">
                        <Typography
                          variant="subtitle1"
                          color="primary"
                          className="font-bold"
                        >
                          Next.js 16 Ready
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Webpack and Turbopack fully compatible
                        </Typography>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="h-32 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center p-4 text-center">
                        <Typography
                          variant="subtitle1"
                          className="text-emerald-500 font-bold"
                        >
                          100% Theme Tokens
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          No hardcoded hex colors, full dark mode sync
                        </Typography>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="h-32 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center p-4 text-center">
                        <Typography
                          variant="subtitle1"
                          className="text-indigo-500 font-bold"
                        >
                          Base UI Headless
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Accessible WAI-ARIA interaction patterns
                        </Typography>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <div className="flex items-center justify-between pt-2">
                    <CarouselPrevious />
                    <CarouselDots />
                    <CarouselNext />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Embedded Sidebar preview */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Sidebar Component
              </Typography>
              <div className="border border-divider rounded-xl h-52 overflow-hidden bg-background-paper flex">
                <SidebarProvider defaultOpen={true}>
                  <Sidebar className="w-full border-r border-divider">
                    <SidebarHeader>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs">Workspace</span>
                        <SidebarToggle />
                      </div>
                    </SidebarHeader>
                    <SidebarContent>
                      <SidebarGroup label="General">
                        <SidebarItem
                          label="Dashboard"
                          active
                          icon={<HomeIcon />}
                        />
                        <SidebarItem label="Schedule" icon={<CalendarIcon />} />
                        <SidebarItem label="Settings" icon={<SettingsIcon />} />
                      </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                      <span className="text-[10px] text-text-secondary">
                        v2.4 Enterprise
                      </span>
                    </SidebarFooter>
                  </Sidebar>
                </SidebarProvider>
              </div>
            </div>

            {/* AspectRatio */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                AspectRatio (16:9 Container)
              </Typography>
              <AspectRatio
                ratio={16 / 9}
                className="rounded-xl overflow-hidden border border-divider bg-neutral-900 flex items-center justify-center"
              >
                <div className="text-center p-4">
                  <span className="text-xs font-semibold text-white/80 block">
                    16:9 Aspect Ratio
                  </span>
                  <span className="text-[10px] text-white/50">
                    Responsive container
                  </span>
                </div>
              </AspectRatio>
            </div>

            {/* Attachment Cards & Direction */}
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Attachment & Direction
              </Typography>
              <div className="space-y-2">
                <Attachment
                  filename="system-architecture.pdf"
                  size="2.4 MB"
                  variant="card"
                />
                <Attachment
                  filename="design-tokens.json"
                  size="48 KB"
                  variant="chip"
                  onRemove={() => console.log("Removed attachment")}
                />
                <Direction
                  dir="ltr"
                  className="pt-2 text-xs text-text-secondary"
                >
                  Direction container: <span>LTR Bi-directional Support</span>
                </Direction>
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="text" size="small" color="primary">
            Explore All 70 Components
          </Button>
        </CardActions>
      </Card>

      {/* 8. OVERLAYS, FEEDBACK, LOADERS & TOASTS */}
      <Card variant="outlined">
        <CardHeader
          title="Overlays, Modal Disclosures, Loaders & Toast"
          subheader="AlertDialog, Dialog, Drawer, Popover, PreviewCard, Tooltip, ContextMenu, Spinner, Skeleton, and Toast"
        />
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDialogOpen(true)}
            >
              Open Dialog Modal
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              Open Navigation Drawer
            </Button>
            <Button
              variant="soft"
              color="inherit"
              onClick={() => setBackdropOpen(false)}
            >
              Trigger Backdrop Blur
            </Button>

            <Popover
              trigger={
                <Button variant="outlined" color="primary">
                  Open Popover
                </Button>
              }
            >
              <div className="p-3 w-56 text-xs space-y-1">
                <div className="font-semibold text-text-primary">
                  Quick Information
                </div>
                <div className="text-text-secondary">
                  Popover positioned automatically using Base UI floating anchor
                  logic.
                </div>
              </div>
            </Popover>

            <PreviewCard
              trigger={
                <Button variant="soft" color="info">
                  Hover Preview Card
                </Button>
              }
              content={
                <div className="p-2 w-60 text-xs space-y-1.5">
                  <div className="font-bold text-text-primary">
                    Base UI Primitives
                  </div>
                  <div className="text-text-secondary">
                    Rich preview cards display detailed metadata upon pointer
                    hover.
                  </div>
                </div>
              }
            />

            <Tooltip content="Instant accessible hover hint" side="top">
              <Button variant="text" color="primary">
                Hover Tooltip
              </Button>
            </Tooltip>

            {/* ContextMenu */}
            <ContextMenu
              content={
                <>
                  <ContextMenu.Item>Inspect Element</ContextMenu.Item>
                  <ContextMenu.Item>Copy Reference</ContextMenu.Item>
                  <ContextMenu.Separator />
                  <ContextMenu.Item color="error">
                    Delete Entity
                  </ContextMenu.Item>
                </>
              }
            >
              <div className="px-3 py-1.5 rounded-lg border border-dashed border-divider text-xs text-text-secondary cursor-context-menu">
                Right-Click Context Menu Area
              </div>
            </ContextMenu>
          </div>

          <Separator />

          {/* AlertDialog Severity Showcases */}
          <div className="space-y-2">
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className="text-xs uppercase font-semibold"
            >
              Alert Dialog Disclosures
            </Typography>
            <div className="flex flex-wrap items-center gap-3">
              <AlertDialog
                trigger={
                  <Button variant="contained" color="error">
                    Delete Entity (Error)
                  </Button>
                }
                severity="error"
                title="Permanently Delete Entity?"
                description="This action cannot be undone. All related database records and sessions will be permanently purged."
                confirmText="Yes, Delete"
                confirmColor="error"
                cancelText="Cancel"
              />
              <AlertDialog
                trigger={
                  <Button variant="soft" color="warning">
                    Discard Edits (Warning)
                  </Button>
                }
                severity="warning"
                title="Discard Unsaved Changes?"
                description="You have draft modifications that will be discarded if you navigate away now."
                confirmText="Discard Changes"
                confirmColor="warning"
                cancelText="Keep Editing"
              />
              <AlertDialog
                trigger={
                  <Button variant="outlined" color="info">
                    Upgrade Plan (Info)
                  </Button>
                }
                severity="info"
                title="Upgrade Workspace Plan?"
                description="Upgrading to Enterprise unlocks 70 custom theme components and multi-tenant isolation."
                confirmText="Confirm Upgrade"
                confirmColor="info"
              />
            </div>
          </div>

          <Separator />

          {/* Loaders, Meters & Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Spinners (Circle & Dots)
              </Typography>
              <div className="flex items-center gap-4">
                <Spinner size="small" color="primary" />
                <Spinner size="medium" color="success" />
                <Spinner size="large" variant="dots" color="primary" />
              </div>
            </div>

            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Progress & Meter
              </Typography>
              <Progress value={68} color="primary" />
              <Meter value={45} max={100} color="warning" />
            </div>

            <div className="space-y-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                className="text-xs uppercase font-semibold"
              >
                Skeleton Loading States
              </Typography>
              <div className="flex items-center gap-2">
                <Skeleton variant="circular" width={32} height={32} />
                <div className="space-y-1 flex-1">
                  <Skeleton variant="text" width="80%" height={12} />
                  <Skeleton variant="text" width="60%" height={10} />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Toast interactive & standalone */}
          <div className="space-y-3">
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className="text-xs uppercase font-semibold"
            >
              Interactive Toast Queue & Standalone Cards
            </Typography>
            <InteractiveToastDemo />

            <div className="pt-2">
              <Toast
                severity="success"
                title="Components Suite Ready"
                description="All 70 UI components verified with zero Biome errors and full Next.js webpack compatibility."
                showClose={false}
              />
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="text" size="small" color="primary">
            Explore All 70 Components
          </Button>
        </CardActions>
      </Card>

      {/* 9. ACCORDIONS, TABS & COLLAPSIBLES */}
      <Card variant="outlined">
        <CardHeader
          title="Accordions, Tabs & Collapsible Panels"
          subheader="Accordion with smooth arrows, Tabs with indicators, and Collapsible cards"
        />
        <CardContent className="space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as string)}
          >
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="architecture">Architecture</Tabs.Tab>
              <Tabs.Tab value="slots">Slots & Customization</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel
              value="overview"
              className="pt-4 text-xs text-text-secondary leading-relaxed"
            >
              Every component is built with @mui/system Box to support
              responsive sx props and design tokens without runtime style
              recalculation.
            </Tabs.Panel>
            <Tabs.Panel
              value="architecture"
              className="pt-4 text-xs text-text-secondary leading-relaxed"
            >
              Base UI provides accessible WAI-ARIA behaviors and keyboard
              interactions with equal padding and zero layout shift.
            </Tabs.Panel>
            <Tabs.Panel
              value="slots"
              className="pt-4 text-xs text-text-secondary leading-relaxed"
            >
              Each component exposes slots and slotProps for granular
              customization down to internal icon and container nodes.
            </Tabs.Panel>
          </Tabs>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Accordion defaultValue={["item-1"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How does theme token overriding work?
                </AccordionTrigger>
                <AccordionPanel>
                  Custom tokens take highest precedence via CSS variables,
                  seamlessly falling back to Tailwind classes and sx overrides.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Is Next.js 16 App Router supported?
                </AccordionTrigger>
                <AccordionPanel>
                  Yes, EmotionRegistry cleanly handles SSR style injection via
                  useServerInsertedHTML without hydration flashes.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Collapsible title="Collapsible Container Panel" defaultOpen>
              <div className="text-xs text-text-secondary leading-relaxed">
                Collapsible panels smoothly animate height using native CSS
                transitions and Base UI data-expanded attributes.
              </div>
            </Collapsible>
          </div>
        </CardContent>
        <CardActions>
          <Button variant="text" size="small" color="primary">
            Explore All 70 Components
          </Button>
        </CardActions>
      </Card>

      {/* 10. TYPOGRAPHY HIERARCHY */}
      <Stack spacing={2} className="pt-8 border-t border-divider">
        <Typography variant="h3">Typography Scale Hierarchy</Typography>
        <Typography variant="h4">
          Heading 4 • Google Sans Code & Flex
        </Typography>
        <Typography variant="h5">Heading 5 • System Components</Typography>
        <Typography variant="h6">Heading 6 • Token-Driven Metrics</Typography>
        <Typography variant="subtitle1" color="primary">
          Subtitle 1 with Primary Color token
        </Typography>
        <Typography variant="body1">
          Body 1: Antigravity UI merges Tailwind CSS v4, @mui/system Box, and
          @base-ui/react into a high-performance design system with zero DOM
          bloat.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Body 2: All 70 components follow strict AGENTS.md guidelines, export
          full TypeScript interfaces, and build cleanly with webpack and
          turbopack.
        </Typography>
        <Typography variant="caption" color="textDisabled">
          Caption Text • Built with Next.js 16 and Biome
        </Typography>
      </Stack>

      {/* OVERLAY PORTALS */}
      {/* Dialog Modal */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="System Preferences Modal"
        description="Configure display parameters and notification dispatchers."
        actions={
          <>
            <Button
              variant="text"
              color="inherit"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDialogOpen(false)}
            >
              Save Settings
            </Button>
          </>
        }
      >
        <div className="space-y-3 py-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Dark Color Scheme Mode</span>
            <Switch defaultChecked color="primary" />
          </div>
          <div className="flex items-center justify-between">
            <span>Hardware Acceleration</span>
            <Switch defaultChecked color="success" />
          </div>
        </div>
      </Dialog>

      {/* Drawer Overlay */}
      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Navigation Drawer"
        description="Quick access links and settings."
        anchor="right"
      >
        <div className="space-y-3 py-4 text-xs">
          <div className="p-3 border border-divider rounded-lg">
            <span className="font-semibold block text-text-primary">
              Documentation
            </span>
            <span className="text-text-secondary">
              Read full architecture notes for all 70 components.
            </span>
          </div>
          <div className="p-3 border border-divider rounded-lg">
            <span className="font-semibold block text-text-primary">
              Theme Customizer
            </span>
            <span className="text-text-secondary">
              Modify primary, secondary, and semantic color palettes.
            </span>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="w-full"
            onClick={() => setDrawerOpen(false)}
          >
            Close Drawer
          </Button>
        </div>
      </Drawer>

      {/* Backdrop */}
      <Backdrop open={backdropOpen} onClick={() => setBackdropOpen(false)}>
        <div className="text-center text-white space-y-2 p-6 rounded-2xl bg-black/60 backdrop-blur-md">
          <Spinner size="large" color="inherit" />
          <div className="text-sm font-semibold">Active Backdrop Overlay</div>
          <div className="text-xs text-white/70">Click anywhere to dismiss</div>
        </div>
      </Backdrop>
    </Container>
  );
}
