"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { ClientStatus } from "@/types/client";
import { cn } from "@/lib/utils";

const statuses: { label: string; value: ClientStatus | "all" }[] = [
  { label: "All Clients", value: "all" },
  { label: "Active", value: "active" },
];

export function ClientFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(search, 500);
  const currentStatus = (searchParams.get("status") as ClientStatus) ?? "all";

  // Update URL when debounced search changes
  useEffect(() => {
    const currentSearch = searchParams.get("search") ?? "";
    if (debouncedSearch === currentSearch) return;

    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    params.delete("page"); // Reset to first page by removing page param

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [debouncedSearch, pathname, router, searchParams]);

  const handleStatusChange = (status: ClientStatus | "all") => {
    const params = new URLSearchParams(searchParams);
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.delete("page"); // Reset to first page by removing page param

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <Input
          className="pl-10 h-12 bg-card border-border/50 ring-primary/10 focus-visible:ring-2 focus-visible:ring-primary rounded-xl transition-all shadow-sm"
          placeholder="Search clients by name, ID or cedula..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {statuses.map((s) => (
          <Button
            key={s.value}
            variant={currentStatus === s.value ? "default" : "secondary"}
            size="sm"
            className={cn(
              "rounded-full px-5 py-2 text-xs font-semibold whitespace-nowrap",
              currentStatus === s.value
                ? "shadow-sm"
                : "bg-primary/5 hover:bg-primary/10 text-primary border-none",
            )}
            onClick={() => handleStatusChange(s.value)}
          >
            {s.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
