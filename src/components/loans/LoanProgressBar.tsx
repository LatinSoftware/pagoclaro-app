import { cn } from "@/lib/utils";
import { Loan } from "@/types/loan";
import { getProgressPercent, formatCurrency } from "@/lib/utils/loan-helpers";

export function LoanProgressBar({ loan }: { loan: Loan; }) {
  const pct = getProgressPercent(loan);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Repayment Progress
        </span>
        <span className="text-[10px] font-bold text-foreground">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            pct < 30 && "bg-amber-500",
            pct >= 30 && pct < 80 && "bg-primary",
            pct >= 80 && "bg-emerald-500"
          )}
          style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Paid: {formatCurrency(loan.total_paid)}</span>
        <span>Total: {formatCurrency(loan.total_amount)}</span>
      </div>
    </div>
  );
}
