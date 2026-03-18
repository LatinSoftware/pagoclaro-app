import { AlertCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historial de Pagos",
  description: "Consulta y filtra todos los pagos registrados en el sistema.",
};
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { getPayments } from "@/actions/payments";
import { GetPaymentsRequest } from "@/types/payment";

import { CreatePaymentDialog } from "@/components/payments/CreatePaymentDialog";

import { Suspense } from "react";
import { PaginationMeta } from "@/types/pagination";
import { PaymentList } from "@/components/payments/PaymentList";
import { PaymentListSkeleton } from "@/components/payments/PaymentListSkeleton";

interface PaymentsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    loan_id?: string;
    page?: string;
    limit?: string;
    date_from?: string;
    date_to?: string;
  }>;
}

async function PaymentListData({ filters }: { filters: GetPaymentsRequest }) {
  const result = await getPayments(filters);
  const paymentData = result.success ? result.data : null;
  const fetchError = !result.success ? result.error : null;

  if (fetchError) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3 text-destructive">
        <AlertCircle size={20} />
        <p className="text-sm font-medium">{fetchError}</p>
      </div>
    );
  }

  const apiMeta = paymentData?.meta as PaginationMeta;
  return <PaymentList payments={paymentData?.data || []} meta={apiMeta} />;
}

export default async function PaymentsPage({
  searchParams,
}: PaymentsPageProps) {
  const params = await searchParams;

  const filters: GetPaymentsRequest = {
    search: params.search,
    status: params.status !== "all" ? params.status : undefined,
    page: params.page,
    limit: params.limit,
    date_from: params.date_from,
    date_to: params.date_to,
    loan_id: params.loan_id,
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            Payments Management
          </h1>
          <p className="text-sm text-muted-foreground">
            View and filter all registered payments.
          </p>
        </div>
        <CreatePaymentDialog />
      </header>

      {/* Search & Filter Bar */}
      <PaymentFilters />

      {/* Payment List with Suspense */}
      <Suspense
        key={JSON.stringify(filters)}
        fallback={<PaymentListSkeleton />}
      >
        <PaymentListData filters={filters} />
      </Suspense>
    </div>
  );
}
