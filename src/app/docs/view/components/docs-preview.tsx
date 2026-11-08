"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Alert,
  AspectRatio,
  Attachment,
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Breadcrumb,
  Bubble,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  CodeBlock,
  Collapsible,
  DataTable,
  type DataTableColumn,
  DatePicker,
  Dialog,
  Empty,
  Input,
  Kbd,
  Marker,
  Message,
  NumberField,
  OTPField,
  Pagination,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Toast,
  Toggle,
  ToggleGroup,
  Toolbar,
  Tooltip,
  Typography,
} from "@/_core/theme/components";

// ----------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------

export interface DocsPreviewProps {
  componentId: string;
}

// ----------------------------------------------------------------------
// Component Preview Registry
// ----------------------------------------------------------------------

export function DocsPreview({ componentId }: DocsPreviewProps) {
  const toastManager = Toast.useToastManager();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dateVal, setDateVal] = React.useState<Date | null>(null);

  switch (componentId) {
    case "accordion":
      return (
        <div className="w-full max-w-lg">
          <Accordion defaultValue={["shipping"]}>
            <AccordionItem value="shipping">
              <AccordionTrigger>
                What are your shipping options?
              </AccordionTrigger>
              <AccordionPanel>
                We offer standard 3-5 day delivery as well as priority expedited
                express shipping.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionPanel>
                You can return any unworn items within 30 days of delivery for a
                full refund.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger>
                How can I contact customer support?
              </AccordionTrigger>
              <AccordionPanel>
                Our 24/7 dedicated engineering support team can be reached via
                in-app chat or email.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      );

    case "alert":
      return (
        <div className="w-full max-w-md space-y-3">
          <Alert severity="success" title="Success">
            Your profile updates have been successfully saved.
          </Alert>
          <Alert severity="info" title="Information">
            A new software update is available for installation.
          </Alert>
          <Alert severity="warning" title="Warning">
            Your subscription will renew in 3 days.
          </Alert>
        </div>
      );

    case "button":
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="contained" color="primary">
            Contained
          </Button>
          <Button variant="outlined" color="primary">
            Outlined
          </Button>
          <Button variant="soft" color="primary">
            Soft
          </Button>
          <Button variant="text" color="primary">
            Text
          </Button>
        </div>
      );

    case "badge":
      return (
        <div className="flex items-center justify-center gap-6">
          <Badge color="primary" badgeContent="4">
            <Avatar alt="User 1">AG</Avatar>
          </Badge>
          <Badge color="success" variant="dot">
            <Avatar alt="User 2">JD</Avatar>
          </Badge>
          <Badge color="error" badgeContent="99+">
            <Avatar alt="User 3">US</Avatar>
          </Badge>
          <Badge color="warning" badgeContent="VIP">
            <Button size="small" variant="outlined">
              Member
            </Button>
          </Badge>
        </div>
      );

    case "card":
      return (
        <Card variant="outlined" className="w-full max-w-sm">
          <CardHeader
            title="Design System Card"
            subheader="Headless Base UI + @mui/system tokens"
          />
          <CardContent>
            High contrast, accessible, and theme-adaptive card surface
            container.
          </CardContent>
          <CardActions>
            <Button size="small" variant="text" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      );

    case "dialog":
      return (
        <div className="flex flex-col items-center gap-3">
          <Button variant="contained" onClick={() => setDialogOpen(true)}>
            Open Modal Dialog
          </Button>
          <Dialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Confirm Action"
            description="Are you sure you want to proceed with this update? This action cannot be undone."
            actions={
              <>
                <Button variant="outlined" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setDialogOpen(false)}
                >
                  Confirm
                </Button>
              </>
            }
          >
            <div className="py-2 text-sm text-text-secondary">
              Accessible dialog with focus management, backdrop blur, and smooth
              entrance.
            </div>
          </Dialog>
        </div>
      );

    case "toast":
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              toastManager.add({
                title: "Changes Saved",
                description: "Your settings were updated in real-time.",
                type: "success",
              })
            }
          >
            Success Toast
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              toastManager.add({
                title: "New Notification",
                description: "You have 3 unread messages.",
                type: "info",
              })
            }
          >
            Info Toast
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              toastManager.add({
                title: "Error Occurred",
                description: "Failed to connect to the server.",
                type: "error",
              })
            }
          >
            Error Toast
          </Button>
        </div>
      );

    case "aspect-ratio":
      return (
        <div className="w-full max-w-md">
          <AspectRatio
            ratio={16 / 9}
            className="rounded-xl overflow-hidden bg-neutral-900 border border-divider flex items-center justify-center text-text-secondary"
          >
            16:9 Aspect Ratio Container
          </AspectRatio>
        </div>
      );

    case "attachment":
      return (
        <div className="w-full max-w-sm">
          <Attachment
            filename="quarterly-report-2026.pdf"
            size="2.4 MB"
            variant="card"
            onRemove={() => alert("Attachment removed")}
          />
        </div>
      );

    case "avatar":
      return (
        <div className="flex items-center gap-4">
          <Avatar alt="User 1" size="small">
            AG
          </Avatar>
          <Avatar alt="User 2" size="medium">
            JD
          </Avatar>
          <Avatar alt="User 3" size="large">
            US
          </Avatar>
        </div>
      );

    case "bottom-navigation":
      return (
        <div className="w-full max-w-md border border-divider rounded-xl overflow-hidden bg-background-paper">
          <BottomNavigation showLabels defaultValue={0}>
            <BottomNavigationAction label="Recents" value={0} />
            <BottomNavigationAction label="Favorites" value={1} />
            <BottomNavigationAction label="Nearby" value={2} />
          </BottomNavigation>
        </div>
      );

    case "breadcrumb":
      return (
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/docs" },
            { label: "Breadcrumb" },
          ]}
        />
      );

    case "bubble":
      return (
        <div className="w-full max-w-md space-y-3">
          <Bubble pointer="left" color="default">
            Hi! How can I assist you with the design system today?
          </Bubble>
          <Bubble pointer="right" color="primary">
            I would love to explore the new Base UI headless primitives!
          </Bubble>
        </div>
      );

    case "button-group":
      return (
        <ButtonGroup variant="contained" color="primary">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      );

    case "checkbox":
    case "checkbox-group":
      return (
        <CheckboxGroup defaultValue={["email", "push"]}>
          <Checkbox value="email" label="Email Notifications" />
          <Checkbox value="sms" label="SMS Alerts" />
          <Checkbox value="push" label="In-App Push" />
        </CheckboxGroup>
      );

    case "code-block":
      return (
        <div className="w-full max-w-md">
          <CodeBlock
            code={`const theme = createTheme({ mode: 'dark' });`}
            language="typescript"
            showLineNumbers
          />
        </div>
      );

    case "collapsible":
      return (
        <div className="w-full max-w-sm">
          <Collapsible title="Click to reveal details">
            <div className="p-3 text-sm text-text-secondary bg-action-hover rounded-lg mt-2">
              Smooth collapsible accordion panel with automatic height
              animations.
            </div>
          </Collapsible>
        </div>
      );

    case "data-table": {
      const sampleData = [
        { id: 1, name: "Alpha", status: "Active" },
        { id: 2, name: "Beta", status: "Pending" },
        { id: 3, name: "Gamma", status: "Completed" },
      ];
      const sampleCols: DataTableColumn<(typeof sampleData)[0]>[] = [
        { id: "id", header: "ID", accessorKey: "id" },
        { id: "name", header: "Name", accessorKey: "name" },
        { id: "status", header: "Status", accessorKey: "status" },
      ];
      return (
        <div className="w-full max-w-md">
          <DataTable data={sampleData} columns={sampleCols} />
        </div>
      );
    }

    case "date-picker":
      return (
        <div className="w-full max-w-xs">
          <DatePicker
            value={dateVal}
            onChange={setDateVal}
            placeholder="Select date..."
          />
        </div>
      );

    case "empty":
      return (
        <Empty
          title="No Results Found"
          description="Try adjusting your search filters to find what you are looking for."
        />
      );

    case "input":
    case "input-label":
      return (
        <div className="w-full max-w-xs space-y-2">
          <Input placeholder="Enter username..." />
        </div>
      );

    case "kbd":
      return (
        <div className="flex items-center gap-2">
          <Kbd>⌘</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>K</Kbd>
        </div>
      );

    case "marker":
      return (
        <div className="flex items-center gap-3">
          <Marker variant="dot" pulse color="success">
            Live
          </Marker>
          <Marker variant="pin" color="error">
            Critical
          </Marker>
          <Marker variant="dot" color="primary">
            Stable
          </Marker>
        </div>
      );

    case "message":
    case "message-scroller":
      return (
        <div className="w-full max-w-md space-y-3">
          <Message
            messageRole="assistant"
            content="Hello! I am your AI coding assistant."
          />
          <Message
            messageRole="user"
            content="Can you show me the components?"
          />
        </div>
      );

    case "number-field":
      return (
        <div className="w-full max-w-xs">
          <NumberField defaultValue={42} min={0} max={100} />
        </div>
      );

    case "otp-field":
      return (
        <div className="flex justify-center">
          <OTPField length={6} />
        </div>
      );

    case "pagination":
      return <Pagination count={10} page={1} />;

    case "popover":
      return (
        <Popover
          trigger={
            <Button variant="outlined" color="primary">
              Open Popover
            </Button>
          }
        >
          <div className="p-3 w-56 text-xs space-y-1">
            <div className="font-semibold text-text-primary">
              Base UI Popover
            </div>
            <div className="text-text-secondary">
              Positioned automatically using Base UI floating anchor logic.
            </div>
          </div>
        </Popover>
      );

    case "progress":
      return (
        <div className="w-full max-w-sm space-y-4">
          <Progress value={65} />
        </div>
      );

    case "radio-group":
      return (
        <RadioGroup defaultValue="standard" className="flex gap-4">
          <Radio value="standard" label="Standard Shipping (Free)" />
          <Radio
            value="express"
            label="Express Shipping ($10)"
            color="primary"
          />
        </RadioGroup>
      );

    case "scroll-area":
      return (
        <ScrollArea className="h-32 w-full max-w-xs rounded-xl border border-divider p-3">
          <div className="space-y-2 text-sm text-text-secondary">
            <p>1. Highly responsive scrolling region.</p>
            <p>2. Built with customized cross-browser scrollbars.</p>
            <p>3. Smooth touch scrolling support on mobile.</p>
            <p>4. Dynamic content expansion.</p>
          </div>
        </ScrollArea>
      );

    case "select":
      return (
        <div className="w-full max-w-xs">
          <Select
            options={[
              { value: "apple", label: "Apple" },
              { value: "banana", label: "Banana" },
              { value: "orange", label: "Orange" },
            ]}
            placeholder="Select a fruit..."
          />
        </div>
      );

    case "separator":
      return (
        <div className="w-full max-w-sm space-y-3 text-center text-sm text-text-secondary">
          <div>Top Content</div>
          <Separator />
          <div>Bottom Content</div>
        </div>
      );

    case "skeleton":
      return (
        <div className="w-full max-w-xs space-y-2">
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="rectangular" width="100%" height={80} />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      );

    case "slider":
      return (
        <div className="w-full max-w-xs">
          <Slider defaultValue={50} min={0} max={100} />
        </div>
      );

    case "spinner":
      return (
        <div className="flex items-center gap-4">
          <Spinner size="small" />
          <Spinner size="medium" />
          <Spinner size="large" />
        </div>
      );

    case "switch":
      return (
        <div className="flex items-center gap-4">
          <Switch defaultChecked label="Airplane Mode" />
          <Switch label="Do Not Disturb" />
        </div>
      );

    case "table":
      return (
        <TableContainer className="w-full max-w-md border border-divider rounded-xl">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Qty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Base UI Button</TableCell>
                <TableCell align="right">12</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Theme Token</TableCell>
                <TableCell align="right">70</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );

    case "tabs":
      return (
        <div className="w-full max-w-md">
          <Tabs defaultValue="account">
            <Tabs.List>
              <Tabs.Tab value="account">Account</Tabs.Tab>
              <Tabs.Tab value="password">Password</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel
              value="account"
              className="p-4 text-sm text-text-secondary"
            >
              Manage your account information and preferences.
            </Tabs.Panel>
            <Tabs.Panel
              value="password"
              className="p-4 text-sm text-text-secondary"
            >
              Update and manage your account security credentials.
            </Tabs.Panel>
          </Tabs>
        </div>
      );

    case "toggle":
    case "toggle-group":
      return (
        <ToggleGroup defaultValue={["bold"]}>
          <Toggle value="bold">B</Toggle>
          <Toggle value="italic">I</Toggle>
          <Toggle value="underline">U</Toggle>
        </ToggleGroup>
      );

    case "tool":
    case "toolbar":
    case "tooltip":
      return (
        <Toolbar>
          <Tooltip content="Execute Search">
            <Button size="small" variant="outlined">
              Search
            </Button>
          </Tooltip>
          <Tooltip content="Open Settings">
            <Button size="small" variant="outlined">
              Settings
            </Button>
          </Tooltip>
        </Toolbar>
      );

    case "typography":
      return (
        <div className="space-y-1 text-center">
          <Typography variant="h5">Heading 5 Text</Typography>
          <Typography variant="body2" color="secondary">
            Secondary body text with scalable typography tokens.
          </Typography>
        </div>
      );

    default:
      return (
        <div className="p-8 text-center border border-dashed border-divider rounded-2xl bg-background-paper text-sm text-text-secondary">
          Interactive preview for{" "}
          <strong className="text-text-primary capitalize">
            {componentId.replace(/-/g, " ")}
          </strong>
          .
        </div>
      );
  }
}
