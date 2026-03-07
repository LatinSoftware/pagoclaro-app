import { Briefcase } from "lucide-react";
import { Loan } from "@/types/loan";
import { PaginationMeta } from "@/types/pagination";
import { LoanCard } from "./LoanCard";
import { LoanPagination } from "./LoanPagination";

// ─── Empty state ─────────────────────────────────────────────────────────────

function LoanListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
      <div className="bg-muted rounded-full p-5 text-muted-foreground">
        <Briefcase size={36} />
      </div>
      <div className="space-y-1 max-w-xs">
        <p className="font-semibold text-lg">No loans found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or create a new loan to get started.
        </p>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

interface LoanListProps {
  loans: Loan[];
  meta?: PaginationMeta;
}

export function LoanList({ loans, meta }: LoanListProps) {
  if (loans.length === 0) return <LoanListEmpty />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </div>

      {meta && <LoanPagination meta={meta} />}
    </div>
  );
}
