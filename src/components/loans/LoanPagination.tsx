"use client";

import { Pagination } from "@/components/shared/Pagination";
import { PaginationMeta } from "@/types/pagination";

interface LoanPaginationProps {
  meta: PaginationMeta;
}

export function LoanPagination({ meta }: LoanPaginationProps) {
  return <Pagination meta={meta} itemLabel="loans" />;
}
