"use server";

import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-handler";
import { revalidatePath } from "next/cache";
import { PaymentRequest, PaymentResponse } from "@/types/payment";
import {
  createPaymentSchema,
  type CreatePaymentFormValues,
} from "@/lib/schemas/payment";

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
    payment_date: validated.payment_date,
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
