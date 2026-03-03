"use server";

import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-handler";
import { LoanResponse, LoanRequest } from "@/types/loan";

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
