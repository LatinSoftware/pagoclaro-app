"use server";

import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-handler";
import {
  LoanResponse,
  LoanRequest,
  LoanDetailResponse,
  CreateLoanRequest,
  CreateLoanResponse,
} from "@/types/loan";
import {
  createLoanSchema,
  type CreateLoanFormValues,
} from "@/lib/schemas/create-loan";
import { revalidatePath } from "next/cache";

export async function getLoans(
  params: LoanRequest,
): Promise<{ success: boolean; data?: LoanResponse; error?: string }> {
  try {
    const data = await api.get<LoanResponse>("/loans", { params });
    return { success: true, data };
  } catch (error: unknown) {
    return handleApiError(error, "getLoans");
  }
}

export async function getLoanById(
  id: string,
): Promise<{ success: boolean; data?: LoanDetailResponse; error?: string }> {
  try {
    const data = await api.get<LoanDetailResponse>(`/loans/${id}`);
    return { success: true, data };
  } catch (error: unknown) {
    return handleApiError(error, "getLoanById");
  }
}

export async function disburseLoanAction(
  id: string,
): Promise<{ success: boolean; data?: LoanDetailResponse; error?: string }> {
  try {
    const data = await api.patch<LoanDetailResponse, unknown>(
      `/loans/${id}/disburse`,
    );
    return { success: true, data };
  } catch (error: unknown) {
    return handleApiError(error, "disburseLoanAction");
  }
}

export async function createLoanAction(
  formValues: CreateLoanFormValues,
): Promise<{
  success: boolean;
  data?: CreateLoanResponse;
  error?: string;
  fieldErrors?: Record<string, string>;
}> {
  // Server-side validation (source of truth)
  const parsed = createLoanSchema.safeParse(formValues);

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

  // Transform: percentage → decimal for the API
  const requestBody: CreateLoanRequest = {
    capital: validated.capital,
    client_id: validated.client_id,
    disbursement_date: new Date(validated.disbursement_date).toISOString(),
    frequency: validated.frequency,
    interest_rate: validated.interest_rate / 100,
    method: validated.method,
    term: validated.term,
    notes: validated.notes || undefined,
  };

  try {
    const data = await api.post<CreateLoanResponse, CreateLoanRequest>(
      "/loans",
      requestBody,
    );

    revalidatePath("/loans");
    return { success: true, data };
  } catch (error: unknown) {
    return handleApiError(error, "createLoanAction");
  }
}
