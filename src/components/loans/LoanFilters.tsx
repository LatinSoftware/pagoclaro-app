"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Status } from "@/types/loan";
import { cn } from "@/lib/utils";

const statuses: { label: string; value: Status | "all" }[] = [
  { label: "All Loans", value: "all" },
  { label: "Active", value: Status.Active },
  { label: "Draft", value: Status.Draft },
  { label: "Paid Off", value: Status.PaidOff },
  { label: "Defaulted", value: Status.Defaulted },
  { label: "Cancelled", value: Status.Cancelled },
];

export function LoanFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(search, 500);
  const currentStatus = (searchParams.get("status") as Status | "all") ?? "all";

  // Update URL when debounced search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to first page on search
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [debouncedSearch, pathname, router]);

  const handleStatusChange = (status: Status | "all") => {
    const params = new URLSearchParams(searchParams);
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.set("page", "1"); // Reset to first page on filter change
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <Input
          className="pl-10 h-12 bg-card border-border/50 ring-primary/10 focus-visible:ring-2 focus-visible:ring-primary rounded-xl transition-all shadow-sm"
          placeholder="Search by client ID..."
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
              currentStatus === s.value ? "shadow-sm" : "bg-primary/5 hover:bg-primary/10 text-primary border-none"
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
