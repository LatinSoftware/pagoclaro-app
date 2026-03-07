"use client";

import { Pagination } from "@/components/shared/Pagination";
import { PaginationMeta } from "@/types/pagination";

interface PaymentPaginationProps {
  meta: PaginationMeta;
}

export function PaymentPagination({ meta }: PaymentPaginationProps) {
  return <Pagination meta={meta} itemLabel="payments" />;
}
