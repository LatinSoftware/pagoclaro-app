"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, CalendarDays, X } from "lucide-react";
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
  const [dateFrom, setDateFrom] = useState(searchParams.get("date_from") ?? "");
  const [dateTo, setDateTo] = useState(searchParams.get("date_to") ?? "");

  const debouncedSearch = useDebounce(search, 500);
  const debouncedDateFrom = useDebounce(dateFrom, 600);
  const debouncedDateTo = useDebounce(dateTo, 600);

  const currentStatus = (searchParams.get("status") as Status | "all") ?? "all";
  const hasDateFilter =
    !!searchParams.get("date_from") || !!searchParams.get("date_to");

  // Update URL when debounced search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update URL when debounced date filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedDateFrom) {
      params.set("date_from", debouncedDateFrom);
    } else {
      params.delete("date_from");
    }
    if (debouncedDateTo) {
      params.set("date_to", debouncedDateTo);
    } else {
      params.delete("date_to");
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [debouncedDateFrom, debouncedDateTo]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStatusChange = (status: Status | "all") => {
    const params = new URLSearchParams(searchParams);
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.set("page", "1");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearDates = () => {
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Top row: Statuses */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {statuses.map((s) => (
          <Button
            key={s.value}
            variant={currentStatus === s.value ? "default" : "ghost"}
            size="sm"
            className={cn(
              "rounded-full px-4 text-[13px] font-semibold whitespace-nowrap transition-all duration-300",
              currentStatus === s.value
                ? "shadow-md bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
            onClick={() => handleStatusChange(s.value)}
          >
            {s.label}
          </Button>
        ))}
      </div>

      {/* Bottom row: Search & Dates */}
      <div className="flex flex-col md:flex-row gap-3 items-center bg-card p-1.5 rounded-3xl md:rounded-full border shadow-sm">
        {/* Search Bar */}
        <div className="relative flex-1 group w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          </div>
          <Input
            className="pl-10 h-10 w-full bg-transparent border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:shadow-none placeholder:text-muted-foreground/70 transition-all text-sm"
            placeholder="Search by client ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="h-6 w-px bg-border hidden md:block" />

        {/* Date Range Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto px-2 md:px-0 pb-2 md:pb-0">
          <div className="relative flex-1 md:w-36">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarDays className="size-3.5 text-muted-foreground" />
            </div>
            <Input
              id="date-from"
              type="date"
              className={cn(
                "pl-9 h-10 bg-transparent border-0 shadow-none hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/30 rounded-full text-xs font-medium transition-all",
                !dateFrom && "text-muted-foreground/70",
              )}
              value={dateFrom}
              max={dateTo || undefined}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          <span className="text-muted-foreground/50 text-xs font-medium">
            —
          </span>

          <div className="relative flex-1 md:w-36">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarDays className="size-3.5 text-muted-foreground" />
            </div>
            <Input
              id="date-to"
              type="date"
              className={cn(
                "pl-9 h-10 bg-transparent border-0 shadow-none hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/30 rounded-full text-xs font-medium transition-all",
                !dateTo && "text-muted-foreground/70",
              )}
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300 flex items-center justify-center",
              hasDateFilter ? "w-10 opacity-100" : "w-0 opacity-0",
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-full ml-1"
              onClick={clearDates}
              title="Clear dates"
              type="button"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
