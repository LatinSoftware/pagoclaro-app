import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Briefcase,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  Layers,
} from "lucide-react";
import { Loan, Status } from "@/types/loan";
import { cn } from "@/lib/utils";
import {
  formatCurrency,
  formatDate,
  FREQUENCY_LABELS,
  METHOD_LABELS,
} from "@/lib/utils/loan-helpers";
import { LoanStatusBadge } from "./LoanStatusBadge";
import { LoanProgressBar } from "./LoanProgressBar";
import { DisburseLoanButton } from "./DisburseLoanButton";

// ─── Sub-component ───────────────────────────────────────────────────────────

function LoanMetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider whitespace-nowrap">
        {label}
      </span>
      <span className="text-xs font-semibold text-foreground flex items-center gap-1 truncate">
        <Icon className="size-3 text-muted-foreground shrink-0" />
        {value}
      </span>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function LoanCard({ loan }: { loan: Loan }) {
  const clientName = loan.client.name;

  return (
    <Link
      href={`/loans/${loan.id}`}
      className="block bg-card border border-border rounded-xl shadow-sm group hover:border-primary/30 hover:shadow-md transition-all duration-200"
    >
      {/* ── Top bar: accent line based on status ── */}
      <div
        className={cn(
          "h-0.5 w-full rounded-t-xl",
          loan.status === Status.Active && "bg-emerald-500",
          loan.status === Status.Draft && "bg-slate-400",
          loan.status === Status.Defaulted && "bg-destructive",
          loan.status === Status.PaidOff && "bg-blue-500",
          loan.status === Status.Cancelled && "bg-amber-500",
        )}
      />

      <div className="p-4 space-y-4">
        {/* ── Header Row ── */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* Icon avatar */}
            <div className="shrink-0 size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
              <Briefcase className="size-4" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-tight">
                  {clientName}
                </span>
                <LoanStatusBadge status={loan.status} />
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                <Calendar className="size-3" />
                <span>Disbursed {formatDate(loan.disbursement_date)}</span>
                <span className="text-border mx-1">·</span>
                <span className="font-mono text-[10px]">
                  #{loan.id.slice(-8).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Capital amount */}
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-foreground leading-tight">
              {formatCurrency(loan.capital)}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Capital
            </p>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <LoanProgressBar loan={loan} />

        {/* ── Meta grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 pt-1 border-t border-border/50">
          <LoanMetaItem
            icon={TrendingUp}
            label="Rate"
            value={`${(loan.interest_rate * 100).toFixed(1)}%`}
          />
          <LoanMetaItem
            icon={Clock}
            label="Frequency"
            value={FREQUENCY_LABELS[loan.frequency] ?? loan.frequency}
          />
          <LoanMetaItem
            icon={Layers}
            label="Term"
            value={`${loan.term} installments`}
          />
          <LoanMetaItem
            icon={BarChart3}
            label="Method"
            value={METHOD_LABELS[loan.method] ?? loan.method}
          />
        </div>

        {/* ── Footer: outstanding balance + CTA ── */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <div className="flex items-center gap-1.5 min-w-0">
            <DollarSign className="size-3.5 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground truncate">
              Balance:
            </span>
            <span
              className={cn(
                "text-sm font-bold truncate",
                loan.outstanding_balance > 0
                  ? "text-primary"
                  : "text-emerald-500",
              )}
            >
              {formatCurrency(loan.outstanding_balance)}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {loan.status === Status.Draft && (
              <DisburseLoanButton loanId={loan.id} />
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors font-medium">
              View
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
