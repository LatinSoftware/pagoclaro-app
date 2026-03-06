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
    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider whitespace-nowrap">
        {label}
      </span>
      <span className="text-xs font-medium text-foreground flex items-center gap-1.5 truncate">
        <Icon className="size-3.5 text-primary/70 shrink-0" />
        {value}
      </span>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<
  Status,
  {
    border: string;
    shadow: string;
    gradient: string;
    iconBg: string;
    iconColor: string;
    glow: string;
    hoverText: string;
  }
> = {
  [Status.Active]: {
    border: "hover:border-emerald-500/50",
    shadow: "hover:shadow-emerald-500/20",
    gradient: "from-emerald-500/5 via-transparent to-transparent",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    glow: "bg-emerald-500/30",
    hoverText: "group-hover:text-emerald-500",
  },
  [Status.PaidOff]: {
    border: "hover:border-blue-500/50",
    shadow: "hover:shadow-blue-500/20",
    gradient: "from-blue-500/5 via-transparent to-transparent",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    glow: "bg-blue-500/30",
    hoverText: "group-hover:text-blue-500",
  },
  [Status.Draft]: {
    border: "hover:border-slate-500/50",
    shadow: "hover:shadow-slate-500/20",
    gradient: "from-slate-500/5 via-transparent to-transparent",
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-500",
    glow: "bg-slate-500/30",
    hoverText: "group-hover:text-slate-500",
  },
  [Status.Cancelled]: {
    border: "hover:border-amber-500/50",
    shadow: "hover:shadow-amber-500/20",
    gradient: "from-amber-500/5 via-transparent to-transparent",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    glow: "bg-amber-500/30",
    hoverText: "group-hover:text-amber-500",
  },
  [Status.Defaulted]: {
    border: "hover:border-rose-500/50",
    shadow: "hover:shadow-rose-500/20",
    gradient: "from-rose-500/5 via-transparent to-transparent",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
    glow: "bg-rose-500/30",
    hoverText: "group-hover:text-rose-500",
  },
};

export function LoanCard({ loan }: { loan: Loan }) {
  const clientName = loan.client.name;
  const styles = STATUS_STYLES[loan.status];

  return (
    <Link
      href={`/loans/${loan.id}`}
      className={cn(
        "block relative bg-card border rounded-[1.25rem] p-5 shadow-sm group transition-all duration-300 overflow-hidden",
        styles.border,
        styles.shadow,
      )}
    >
      {/* Epic Status Top Glow */}
      <div
        className={cn(
          "absolute -top-10 inset-x-4 h-20 blur-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full",
          styles.glow,
        )}
      />

      {/* Subtle background gradient on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
          styles.gradient,
        )}
      />

      <div className="relative z-10 flex flex-col h-full gap-5">
        {/* ── Header Row ── */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            {/* Icon avatar */}
            <div
              className={cn(
                "shrink-0 size-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-transparent group-hover:border-current/10",
                styles.iconBg,
                styles.iconColor,
              )}
            >
              <Briefcase className="size-4.5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={cn(
                    "font-bold text-foreground transition-colors text-base leading-tight",
                    styles.hoverText,
                  )}
                >
                  {clientName}
                </span>
                <LoanStatusBadge status={loan.status} />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                <Calendar className="size-3.5" />
                <span>Disbursed {formatDate(loan.disbursement_date)}</span>
                <span className="text-border mx-0.5">•</span>
                <span className="font-mono text-muted-foreground/80 tracking-wide">
                  #{loan.id.slice(-6).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Capital amount */}
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-foreground leading-tight tracking-tight">
              {formatCurrency(loan.capital)}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider mt-0.5">
              Capital
            </p>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="px-1">
          <LoanProgressBar loan={loan} />
        </div>

        {/* ── Meta grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-muted/40 rounded-2xl border border-border/50">
          <LoanMetaItem
            icon={TrendingUp}
            label="Rate"
            value={`${(loan.interest_rate * 100).toFixed(1)}%`}
          />
          <LoanMetaItem
            icon={Clock}
            label="Freq"
            value={FREQUENCY_LABELS[loan.frequency] ?? loan.frequency}
          />
          <LoanMetaItem
            icon={Layers}
            label="Term"
            value={`${loan.term} instals`}
          />
          <LoanMetaItem
            icon={BarChart3}
            label="Method"
            value={METHOD_LABELS[loan.method] ?? loan.method}
          />
        </div>

        {/* ── Footer: outstanding balance + CTA ── */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 bg-background rounded-full border shadow-sm">
              <DollarSign className="size-3.5 text-muted-foreground shrink-0" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                Balance
              </span>
              <span
                className={cn(
                  "text-[13px] font-bold truncate leading-none",
                  loan.outstanding_balance > 0
                    ? "text-primary"
                    : "text-emerald-500",
                )}
              >
                {formatCurrency(loan.outstanding_balance)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {loan.status === Status.Draft && (
              <DisburseLoanButton loanId={loan.id} />
            )}
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 bg-background border rounded-full text-xs font-semibold text-muted-foreground transition-all duration-300 relative overflow-hidden",
                styles.hoverText,
                styles.border,
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300",
                  styles.iconBg,
                )}
              />
              <span className="relative z-10 transition-colors">View</span>
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5 relative z-10" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
