import { PaymentStatus } from "@/types/payment";
import { cn } from "@/lib/utils";
import { CheckCircle2, Ban } from "lucide-react";

const STATUS_CONFIG: Record<
  PaymentStatus,
  {
    label: string;
    icon: React.ElementType;
    styles: string;
  }
> = {
  [PaymentStatus.Posted]: {
    label: "Posted",
    icon: CheckCircle2,
    styles:
      "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 group-hover:border-emerald-500/30",
  },
  [PaymentStatus.Voided]: {
    label: "Voided",
    icon: Ban,
    styles:
      "bg-amber-500/10 text-amber-500 border-amber-500/20 group-hover:border-amber-500/30",
  },
};

export function PaymentStatusBadge({
  status,
  className,
}: {
  status: PaymentStatus;
  className?: string;
}) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG[PaymentStatus.Posted];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold transition-colors uppercase tracking-wide",
        config.styles,
        className,
      )}
    >
      <Icon className="size-3.5" />
      <span>{config.label}</span>
    </div>
  );
}
