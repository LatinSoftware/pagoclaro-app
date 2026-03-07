import { AlertCircle } from "lucide-react";
import { PaymentFilters } from "@/components/payments/PaymentFilters";
import { PaymentList } from "@/components/payments/PaymentList";
import { PaymentListSkeleton } from "@/components/payments/PaymentListSkeleton";
import { getPayments } from "@/actions/payments";
import { GetPaymentsRequest } from "@/types/payment";

import { Suspense } from "react";

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

  // Handle meta.total vs meta.total_records depending on the API actually returning The13129090
  // In our types we have PaginationMeta which has `total` and `totalPages`.
  // If the API returns it differently, we handle mapping inside actions or just use what we typed.
  // Assume it matches PaginationMeta as per the types we defined, but API might vary.
  // At least mapping to what PaymentList expects which is `payments` array and `meta` with `page, totalPages, limit, total`

  // For the meta mapping: since API returns data under `data` and meta under `meta`, we just pass them.
  // wait, the API interface given: The13129090 has total_pages and total_records
  // Our interface `PaginationMeta` has `totalPages` and `total`
  // We should safely format it depending on what it really returns:
  const apiMeta = paymentData?.meta as any;
  const safeMeta = apiMeta
    ? {
        page: apiMeta.page,
        limit: apiMeta.limit,
        totalPages: apiMeta.total_pages ?? apiMeta.totalPages ?? 0,
        total: apiMeta.total_records ?? apiMeta.total ?? 0,
      }
    : undefined;

  return <PaymentList payments={paymentData?.data || []} meta={safeMeta} />;
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
