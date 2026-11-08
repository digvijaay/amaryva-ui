import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Box } from "@mui/system";
import * as React from "react";
import type {
  CommandDialogProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandInputProps,
  CommandItemProps,
  CommandListProps,
  CommandProps,
  CommandSeparatorProps,
  CommandShortcutProps,
} from "./command.types";
import { CommandContext, useCommand } from "./command-context";

// ----------------------------------------------------------------------

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      {...props}
    >
      <title>Search</title>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// Command Root
// ----------------------------------------------------------------------

export const CommandRoot = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ children, className, onSelect, ...other }, ref) => {
    const [search, setSearch] = React.useState("");
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [items, setItems] = React.useState<Map<string, string>>(new Map());

    const registerItem = React.useCallback((id: string, text: string) => {
      setItems((prev) => {
        const next = new Map(prev);
        next.set(id, text.toLowerCase());
        return next;
      });
      return () => {
        setItems((prev) => {
          const next = new Map(prev);
          next.delete(id);
          return next;
        });
      };
    }, []);

    const hasMatches = React.useMemo(() => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      for (const text of items.values()) {
        if (text.includes(q)) return true;
      }
      return false;
    }, [search, items]);

    const contextValue = React.useMemo(
      () => ({
        search,
        setSearch,
        selectedId,
        setSelectedId,
        itemCount: items.size,
        registerItem,
        hasMatches,
      }),
      [search, selectedId, items.size, registerItem, hasMatches],
    );

    return (
      <CommandContext.Provider value={contextValue}>
        <Box
          ref={ref}
          className={`flex flex-col w-full overflow-hidden rounded-xl bg-background-paper text-text-primary ${className || ""}`.trim()}
          {...other}
        >
          {children}
        </Box>
      </CommandContext.Provider>
    );
  },
);

CommandRoot.displayName = "Command";

// ----------------------------------------------------------------------
// Command Input
// ----------------------------------------------------------------------

export const CommandInput = React.forwardRef<
  HTMLInputElement,
  CommandInputProps
>(
  (
    {
      placeholder = "Type a command or search...",
      value,
      onValueChange,
      className,
      ...other
    },
    ref,
  ) => {
    const { search, setSearch } = useCommand();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (onValueChange) onValueChange(val);
      else setSearch(val);
    };

    return (
      <div className="flex items-center border-b border-divider px-3">
        <SearchIcon className="mr-2 h-4 w-4 shrink-0 text-text-secondary opacity-70" />
        <input
          ref={ref}
          type="text"
          value={value ?? search}
          onChange={handleChange}
          placeholder={placeholder}
          className={`flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-text-disabled disabled:cursor-not-allowed disabled:opacity-50 ${className || ""}`.trim()}
          {...(other as any)}
        />
      </div>
    );
  },
);

CommandInput.displayName = "CommandInput";

// ----------------------------------------------------------------------
// Command List
// ----------------------------------------------------------------------

export const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ children, className, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        className={`max-h-[300px] overflow-y-auto overflow-x-hidden p-1 ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

CommandList.displayName = "CommandList";

// ----------------------------------------------------------------------
// Command Empty
// ----------------------------------------------------------------------

export const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ children, className, ...other }, ref) => {
    const { hasMatches, search } = useCommand();

    if (hasMatches && !search) return null;
    if (hasMatches) return null;

    return (
      <Box
        ref={ref}
        className={`py-6 text-center text-sm text-text-secondary ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

CommandEmpty.displayName = "CommandEmpty";

// ----------------------------------------------------------------------
// Command Group
// ----------------------------------------------------------------------

export const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ heading, children, className, ...other }, ref) => {
    return (
      <Box
        ref={ref}
        className={`overflow-hidden p-1 text-text-primary ${className || ""}`.trim()}
        {...other}
      >
        {heading && (
          <div className="px-2 py-1.5 text-xs font-semibold text-text-secondary uppercase tracking-wider">
            {heading}
          </div>
        )}
        {children}
      </Box>
    );
  },
);

CommandGroup.displayName = "CommandGroup";

// ----------------------------------------------------------------------
// Command Item
// ----------------------------------------------------------------------

export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ value, onSelect, disabled, children, className, ...other }, ref) => {
    const { search, registerItem } = useCommand();
    const id = React.useId();
    const itemText = typeof children === "string" ? children : value || "";

    React.useEffect(() => {
      return registerItem(id, itemText);
    }, [id, itemText, registerItem]);

    const isVisible = React.useMemo(() => {
      if (!search.trim()) return true;
      return itemText.toLowerCase().includes(search.toLowerCase());
    }, [search, itemText]);

    if (!isVisible) return null;

    return (
      <Box
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => {
          if (!disabled && onSelect) onSelect();
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            if (!disabled && onSelect) {
              e.preventDefault();
              onSelect();
            }
          }
        }}
        className={`relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2 py-1.5 text-sm outline-none transition-colors hover:bg-action-hover focus:bg-action-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className || ""}`.trim()}
        {...other}
      >
        {children}
      </Box>
    );
  },
);

CommandItem.displayName = "CommandItem";

// ----------------------------------------------------------------------
// Command Shortcut
// ----------------------------------------------------------------------

export const CommandShortcut = React.forwardRef<
  HTMLSpanElement,
  CommandShortcutProps
>(({ children, className, ...other }, ref) => {
  return (
    <span
      ref={ref as any}
      className={`ml-auto text-xs tracking-widest text-text-secondary bg-action-hover px-1.5 py-0.5 rounded border border-divider ${className || ""}`.trim()}
      {...(other as any)}
    >
      {children}
    </span>
  );
});

CommandShortcut.displayName = "CommandShortcut";

// ----------------------------------------------------------------------
// Command Separator
// ----------------------------------------------------------------------

export const CommandSeparator = React.forwardRef<
  HTMLHRElement,
  CommandSeparatorProps
>(({ className, ...other }, ref) => {
  return (
    <hr
      ref={ref as any}
      className={`-mx-1 my-1 h-px bg-divider border-0 ${className || ""}`.trim()}
      {...(other as any)}
    />
  );
});

CommandSeparator.displayName = "CommandSeparator";

// ----------------------------------------------------------------------
// Command Dialog
// ----------------------------------------------------------------------

export function CommandDialog({
  open,
  onOpenChange,
  children,
}: CommandDialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          render={
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                zIndex: 1300,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(4px)",
              }}
            />
          }
        />
        <BaseDialog.Popup
          render={
            <Box
              sx={{
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1301,
                width: 560,
                maxWidth: "calc(100vw - 32px)",
                outline: "none",
              }}
            >
              {children}
            </Box>
          }
        />
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

// ----------------------------------------------------------------------
// Compound Command Export
// ----------------------------------------------------------------------

export type CommandType = typeof CommandRoot & {
  Input: typeof CommandInput;
  List: typeof CommandList;
  Empty: typeof CommandEmpty;
  Group: typeof CommandGroup;
  Item: typeof CommandItem;
  Shortcut: typeof CommandShortcut;
  Separator: typeof CommandSeparator;
  Dialog: typeof CommandDialog;
};

export const Command = CommandRoot as CommandType;
Command.Input = CommandInput;
Command.List = CommandList;
Command.Empty = CommandEmpty;
Command.Group = CommandGroup;
Command.Item = CommandItem;
Command.Shortcut = CommandShortcut;
Command.Separator = CommandSeparator;
Command.Dialog = CommandDialog;

export * from "./command.styles";
export * from "./command.types";
export * from "./command-context";
