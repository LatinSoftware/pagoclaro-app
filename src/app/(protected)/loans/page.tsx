import { Status, LoanRequest } from "@/types/loan";
import { AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoanFilters } from "@/components/loans/LoanFilters";
import { LoanList } from "@/components/loans/LoanList";
import { LoanListSkeleton } from "@/components/loans/LoanListSkeleton";
import { getLoans } from "@/actions/loans";

import Link from "next/link";
import { Suspense } from "react";

interface LoansPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    client_id?: string;
    page?: string;
    limit?: string;
    date_from?: string;
    date_to?: string;
  }>;
}

async function LoanListData({ filters }: { filters: LoanRequest }) {
  const result = await getLoans(filters);
  const loanData = result.success ? result.data : null;
  const fetchError = !result.success ? result.error : null;

  if (fetchError) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive">
        <AlertCircle size={20} />
        <p className="text-sm font-medium">{fetchError}</p>
      </div>
    );
  }

  return <LoanList loans={loanData?.data || []} meta={loanData?.meta} />;
}

export default async function LoansPage({ searchParams }: LoansPageProps) {
  const params = await searchParams;

  const filters: LoanRequest = {
    search: params.search,
    status: params.status !== "all" ? (params.status as Status) : undefined,
    page: params.page,
    limit: params.limit,
    date_from: params.date_from,
    date_to: params.date_to,
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            Loans Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage active loans, drafts, and cancellations.
          </p>
        </div>
        <Link href="/loans/new">
          <Button className="rounded-lg shadow-sm gap-2">
            <Plus className="size-4" />
            <span className="hidden sm:inline">New Loan</span>
          </Button>
        </Link>
      </header>

      {/* Search & Filter Bar */}
      <LoanFilters />

      {/* Loan List with Suspense */}
      <Suspense key={JSON.stringify(filters)} fallback={<LoanListSkeleton />}>
        <LoanListData filters={filters} />
      </Suspense>
    </div>
  );
}
