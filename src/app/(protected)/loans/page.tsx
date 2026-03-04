import { api } from "@/lib/api";
import { LoanResponse, Status, LoanRequest } from "@/types/loan";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoanFilters } from "@/components/loans/LoanFilters";

import { handleApiError } from "@/lib/error-handler";
import Link from "next/link";
import { LoanList } from "@/components/loans/LoanList";

interface LoansPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    client_id?: string;
    page?: string;
    limit?: string;
  }>;
}

// Server Action for fetching loans
async function getLoansAction(filters: LoanRequest) {
  "use server";
  try {
    const data = await api.get<LoanResponse>("/loans", {
      params: filters
    });
    return { success: true as const, data };
  } catch (error) {
    return handleApiError(error, "getLoansAction") as { success: false, error: string };
  }
}

export default async function LoansPage({ searchParams }: LoansPageProps) {
  const params = await searchParams;
  
  const filters: LoanRequest = {
    client_id: params.client_id || params.search,
    status: params.status !== "all" ? params.status as Status : undefined,
    page: params.page,
    limit: params.limit,
  };

  const result = await getLoansAction(filters);
  const loanData = result.success ? result.data : null;
  const fetchError = !result.success ? result.error : null;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Loans Management</h1>
          <p className="text-sm text-muted-foreground">Manage active loans, drafts, and cancellations.</p>
        </div>
        <Link href="/loans/new">
          <Button className="rounded-lg shadow-sm">
            <span className="hidden sm:inline">New Loan</span>
            <span className="sm:hidden">+</span>
          </Button>
        </Link>
      </header>

      {/* Search & Filter Bar */}
      <LoanFilters />

      {/* Error State */}
      {fetchError && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{fetchError}</p>
        </div>
      )}

      {/* Loan List */}
      <LoanList loans={loanData?.data || []} meta={loanData?.meta} />
    </div>
  );
}
