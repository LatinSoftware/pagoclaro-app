"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getClientsListAction } from "@/actions/clients";
import { ClientProfile } from "@/types/client";

interface ClientComboboxProps {
  value: string;
  onChange: (clientId: string) => void;
  error?: string;
}

export function ClientCombobox({
  value,
  onChange,
  error,
}: ClientComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const [clients, setClients] = React.useState<ClientProfile[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [, setPage] = React.useState(1);

  // For the Intersection Observer
  const observerTarget = React.useRef<HTMLDivElement>(null);

  const fetchClients = React.useCallback(
    async (currentPage: number, currentSearch: string, isNewSearch = false) => {
      setIsLoading(true);
      const res = await getClientsListAction({
        search: currentSearch,
        page: currentPage,
        limit: 15,
      });

      if (res.success && res.data) {
        setClients((prev) =>
          isNewSearch ? res.data!.data : [...prev, ...res.data!.data],
        );
        setHasMore(res.data.meta.page < res.data.meta.totalPages);
      }
      setIsLoading(false);
    },
    [],
  );

  // Debounce search effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchClients(1, search, true);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, fetchClients]);

  // Load more on scroll
  React.useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => {
            const next = prev + 1;
            fetchClients(next, search, false);
            return next;
          });
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [hasMore, isLoading, search, fetchClients]);

  // Handle selected client name to display
  // In real case we might not have the client in the current page results,
  // but if they just selected it or we preload, we can find it.
  const [selectedClientName, setSelectedClientName] =
    React.useState<string>("");

  // Need an effect to fetch selected client details if value is present
  // but not in the clients array (e.g., initial load or edit mode)
  React.useEffect(() => {
    if (value) {
      const found = clients.find((c) => c.id === value);
      if (found) {
        setSelectedClientName(`${found.name} (${found.cedula})`);
      } else if (!selectedClientName && !isLoading && clients.length > 0) {
        // We could fetch single client here if needed for Edit mode,
        // but since this is Create form, initial value is empty.
      }
    } else {
      setSelectedClientName("");
    }
  }, [value, clients, selectedClientName, isLoading]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-12 shadow-sm rounded-lg border-input bg-transparent text-left font-normal",
            !value && "text-muted-foreground",
            error && "border-destructive focus-visible:ring-destructive",
          )}
        >
          {value ? (
            <span className="truncate">
              {selectedClientName || "Client selected"}
            </span>
          ) : (
            "Select a client..."
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search clients..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <CommandGroup>
              {clients.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.id}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setSelectedClientName(`${client.name} (${client.cedula})`);
                    setOpen(false);
                  }}
                  className="cursor-pointer flex flex-col items-start px-4 py-2"
                >
                  <div className="flex items-center w-full justify-between">
                    <span className="font-medium text-sm">{client.name}</span>
                    <Check
                      className={cn(
                        "ml-auto size-4",
                        value === client.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Cedula: {client.cedula}
                  </span>
                </CommandItem>
              ))}

              {isLoading && (
                <div className="flex justify-center p-4">
                  <Loader2 className="animate-spin text-muted-foreground size-5" />
                </div>
              )}

              {!isLoading && clients.length === 0 && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No clients found.
                </div>
              )}

              {/* Intersection target for infinite scrolling */}
              <div ref={observerTarget} className="h-1" />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
