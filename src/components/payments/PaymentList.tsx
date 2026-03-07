import { Banknote } from "lucide-react";
import { PaymentDatum } from "@/types/payment";
import { PaginationMeta } from "@/types/pagination";
import { PaymentCard } from "./PaymentCard";
import { PaymentPagination } from "./PaymentPagination";

// ─── Empty state ─────────────────────────────────────────────────────────────

function PaymentListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
      <div className="bg-muted rounded-full p-5 text-muted-foreground">
        <Banknote size={36} />
      </div>
      <div className="space-y-1 max-w-xs">
        <p className="font-semibold text-lg">No payments found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters to find what you&apos;re looking for.
        </p>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

interface PaymentListProps {
  payments: PaymentDatum[];
  meta?: PaginationMeta;
}

export function PaymentList({ payments, meta }: PaymentListProps) {
  if (payments.length === 0) return <PaymentListEmpty />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {payments.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>

      {meta && <PaymentPagination meta={meta} />}
    </div>
  );
}
