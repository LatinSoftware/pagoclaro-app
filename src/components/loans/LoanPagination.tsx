"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaginationMeta } from "@/types/loan";
import { cn } from "@/lib/utils";
import { useTransition } from "react";

interface LoanPaginationProps {
  meta: PaginationMeta;
}

export function LoanPagination({ meta }: LoanPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const page = Number(meta.page) || 1;
  const totalPages = Number(meta.totalPages) || 1;
  const total = Number(meta.total) || 0;
  const limit = Number(meta.limit) || 10;

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Build page numbers to show
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page > 3) pages.push("ellipsis");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (page < totalPages - 2) pages.push("ellipsis");

      pages.push(totalPages);
    }

    return pages;
  };

  const to = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2">
      {/* Info text */}
      <p className="text-[13px] text-muted-foreground order-2 sm:order-1 font-medium bg-card px-4 py-2 rounded-full border shadow-sm">
        Showing {to} of {total} loans
      </p>

      {/* Page controls */}
      {totalPages > 0 && (
        <div
          className={cn(
            "flex items-center gap-1 order-1 sm:order-2 bg-card p-1.5 rounded-full border shadow-sm",
            isPending && "opacity-50 pointer-events-none",
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>

          {getPageNumbers().map((p, idx) =>
            p === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 text-muted-foreground font-bold text-xs select-none tracking-widest"
              >
                ...
              </span>
            ) : (
              <Button
                key={p}
                variant={p === page ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "size-8 rounded-full text-xs font-bold transition-all duration-300",
                  p === page
                    ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 scale-105"
                    : "hover:bg-muted/80 text-muted-foreground hover:text-foreground",
                )}
                onClick={() => handlePageChange(p)}
              >
                {p}
              </Button>
            ),
          )}

          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
