"use server";

import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-handler";
import { LoanResponse, LoanRequest, LoanDetailResponse } from "@/types/loan";

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
