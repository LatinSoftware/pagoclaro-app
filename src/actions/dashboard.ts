"use server";

import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-handler";
import { DashboardSummary } from "@/types/dashboard";

export async function getDashboardSummary(): Promise<
  { success: true; data: DashboardSummary } | { success: false; error: string }
> {
  try {
    const data = await api.get<DashboardSummary>("/dashboard/summary");
    return { success: true, data };
  } catch (error: unknown) {
    return handleApiError(error, "getDashboardSummary");
  }
}
