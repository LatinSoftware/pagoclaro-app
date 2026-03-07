"use server";

import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-handler";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import { PaymentRequest, PaymentResponse } from "@/types/payment";
import {
  createPaymentSchema,
  type CreatePaymentFormValues,
} from "@/lib/schemas/payment";
import { GetPaymentsRequest, GetPaymentsResponse } from "@/types/payment";

export async function getPayments(
  filters: GetPaymentsRequest,
): Promise<
  | { success: true; data: GetPaymentsResponse }
  | { success: false; error: string }
> {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.status && filters.status !== "all")
      params.append("status", filters.status);
    if (filters.page) params.append("page", filters.page);
    if (filters.limit) params.append("limit", filters.limit);
    if (filters.date_from) params.append("date_from", filters.date_from);
    if (filters.date_to) params.append("date_to", filters.date_to);
    if (filters.loan_id) params.append("loan_id", filters.loan_id);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const data = await api.get<GetPaymentsResponse>(`/payments${queryString}`);

    return { success: true, data };
  } catch (error: unknown) {
    return handleApiError(error, "getPayments");
  }
}

export async function registerPaymentAction(
  formValues: CreatePaymentFormValues,
): Promise<{
  success: boolean;
  data?: PaymentResponse;
  error?: string;
  fieldErrors?: Record<string, string>;
}> {
  // Server-side validation
  const parsed = createPaymentSchema.safeParse(formValues);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]?.toString();
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { success: false, error: "Validation failed", fieldErrors };
  }

  const validated = parsed.data;

  const requestBody: PaymentRequest = {
    amount: validated.amount,
    loan_id: validated.loan_id,
    payment_method: validated.payment_method,
    note: validated.note || undefined,
    payment_date: validated.payment_date
      ? format(validated.payment_date, "yyyy-MM-dd")
      : undefined,
  };

  try {
    const data = await api.post<PaymentResponse, PaymentRequest>(
      "/payments",
      requestBody,
    );

    // Refresh loan details page
    revalidatePath(`/loans/${validated.loan_id}`);

    return { success: true, data };
  } catch (error: unknown) {
    return handleApiError(error, "registerPaymentAction");
  }
}
