"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { handleApiError } from "@/lib/error-handler";
import { ClientProfile } from "@/types/client";
import { cache } from "react";

export async function createClientAction(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    // The api service handles the token when called from the server
    await api.post("/clients", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidatePath("/clients");
    return { success: true };
  } catch (error: unknown) {
    return handleApiError(error, "createClientAction");
  }
}

export const getClientDetail = cache(
  async (
    id: string,
  ): Promise<{ success: boolean; data?: ClientProfile; error?: string }> => {
    try {
      const data = await api.get<ClientProfile>(`/clients/${id}`);
      return { success: true, data };
    } catch (error: unknown) {
      return handleApiError(error, `getClientDetail ${id}`);
    }
  },
);

export async function getClientProfile(
  id: string,
): Promise<{ success: boolean; data?: ClientProfile; error?: string }> {
  try {
    const data = await api.get<ClientProfile>(`/clients/${id}/profile`);
    return { success: true, data };
  } catch (error: unknown) {
    return handleApiError(error, `getClientProfile ${id}`);
  }
}

export async function updateClientBasicInfoAction(
  id: string,
  data: Partial<ClientProfile>,
): Promise<{ success: boolean; error?: string }> {
  try {
    // In a real application, this would be a PATCH or PUT request to the backend:
    // await api.patch(`/clients/${id}/profile`, data);

    console.log(`Mock: Updated client ${id} basic info with`, data);

    // Revalidate the client detail page to show new data
    revalidatePath(`/clients/${id}`);

    return { success: true };
  } catch (error: unknown) {
    return handleApiError(error, `updateClientBasicInfoAction ${id}`);
  }
}

export async function getClientsListAction(params: {
  search?: string;
  page?: number;
  limit?: number;
  status?: "active" | "inactive";
}): Promise<{
  success: boolean;
  data?: {
    data: ClientProfile[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  };
  error?: string;
}> {
  try {
    const data = await api.get<{
      data: ClientProfile[];
      meta: { total: number; page: number; limit: number; totalPages: number };
    }>("/clients", { params });
    return { success: true, data };
  } catch (error: unknown) {
    return handleApiError(error, "getClientsListAction");
  }
}
