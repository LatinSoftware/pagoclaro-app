import { cn } from "@/lib/utils";
import { Status } from "@/types/loan";

// ─── Sub-components ──────────────────────────────────────────────────────────
export function LoanStatusBadge({ status }: { status: Status; }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider border",
        status === Status.Active &&
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        status === Status.Draft &&
        "bg-slate-500/10 text-slate-500 border-slate-400/20",
        status === Status.Defaulted &&
        "bg-destructive/10 text-destructive border-destructive/20",
        status === Status.PaidOff &&
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        status === Status.Cancelled &&
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === Status.Active && "bg-emerald-500",
          status === Status.Draft && "bg-slate-400",
          status === Status.Defaulted && "bg-destructive",
          status === Status.PaidOff && "bg-blue-500",
          status === Status.Cancelled && "bg-amber-500"
        )} />
      {status.replace("_", " ")}
    </span>
  );
}
