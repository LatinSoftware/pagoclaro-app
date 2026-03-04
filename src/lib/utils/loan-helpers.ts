import { Loan, Frequency, Method } from "@/types/loan";

export function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 2,
  });
}

export function formatDate(dateStr: string | Date) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getProgressPercent(loan: Loan) {
  if (loan.total_amount === 0) return 0;
  return Math.min(100, Math.round((loan.total_paid / loan.total_amount) * 100));
}

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  [Frequency.Daily]: "Daily",
  [Frequency.Weekly]: "Weekly",
  [Frequency.Biweekly]: "Bi-weekly",
  [Frequency.Monthly]: "Monthly",
};

export const METHOD_LABELS: Record<Method, string> = {
  [Method.French]: "French",
  [Method.Simple]: "Simple",
  [Method.InterestOnly]: "Interest Only",
};
