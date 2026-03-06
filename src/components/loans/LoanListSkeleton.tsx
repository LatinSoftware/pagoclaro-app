import { Skeleton } from "@/components/ui/skeleton";

export function LoanCardSkeleton() {
  return (
    <div className="relative bg-card border rounded-[1.25rem] p-5 shadow-sm overflow-hidden">
      <div className="flex flex-col h-full gap-5">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            {/* Icon avatar skeleton */}
            <Skeleton className="size-10 rounded-full shrink-0" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-4" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
          {/* Capital amount skeleton */}
          <div className="text-right space-y-1">
            <Skeleton className="h-6 w-20 ml-auto" />
            <Skeleton className="h-3 w-12 ml-auto" />
          </div>
        </div>

        {/* Progress bar skeleton */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>

        {/* Meta grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/40 rounded-2xl border border-border/50">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-2 w-8" />
              <div className="flex items-center gap-1.5">
                <Skeleton className="size-3 rounded-sm" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-2 w-12" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function LoanListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <LoanCardSkeleton key={i} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 pt-4">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  );
}
