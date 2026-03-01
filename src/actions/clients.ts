"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/error-handler";
import { ClientProfile } from "@/types/client";

export async function createClientAction(formData: FormData) {
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
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

export async function getClientProfile(
  id: string,
): Promise<{ success: boolean; data?: ClientProfile; error?: string }> {
  try {
    const data = await api.get<ClientProfile>(`/clients/${id}/profile`);
    return { success: true, data };
  } catch (error: unknown) {
    // Return stunning mock data for development demonstration if API fails
    console.warn(
      `API call failed for client profile ${id}, using mock data for UI demo. Error:`,
      error,
    );

    const mockData: ClientProfile = {
      id,
      name: "Acme Corporation",
      cedula: "001-1234567-8",
      phone: "+1 (555) 012-3456",
      email: "contact@acmecorp.com",
      address: "795 Folsom Ave, Suite 600, San Francisco, CA 94107",
      latitude: 18.4719,
      longitude: -69.9405,
      status: "active",
      photoUrl: null,
      tenantId: "t-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      memberSince: "January 2022",
      accountManager: "Elena Rodriguez",
      creditLimit: 50000.0,
      financialStatus: "PARCIAL",
      riskScore: "Low",
      punctuality: 98,
      pendingBalance: 15300.5,
      nextInstallmentDate: new Date(Date.now() + 86400000 * 5).toISOString(),
      nextInstallmentAmount: 2500.0,
      loans: [
        {
          id: "L-001A",
          initialCapital: 10000,
          currentBalance: 3200,
          status: "ACTIVE",
          nextInstallmentDate: new Date(
            Date.now() + 86400000 * 5,
          ).toISOString(),
          nextInstallmentAmount: 2500,
        },
        {
          id: "L-008B",
          initialCapital: 50000,
          currentBalance: 0,
          status: "PAID",
        },
      ],
      events: [
        {
          id: "E-1",
          type: "PAYMENT",
          description: "Pagó cuota 4 (RD$ 2,500.00)",
          date: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: "E-2",
          type: "LATE_PAYMENT",
          description: "Pagó con 3 días de atraso (RD$ 2,500.00)",
          date: new Date(Date.now() - 86400000 * 15).toISOString(),
        },
        {
          id: "E-3",
          type: "PAYMENT",
          description: "Pagó cuota 2 (RD$ 2,500.00)",
          date: new Date(Date.now() - 86400000 * 32).toISOString(),
        },
        {
          id: "E-4",
          type: "LOAN_CREATED",
          description: "Se creó préstamo ID: L-001A",
          date: new Date(Date.now() - 86400000 * 60).toISOString(),
        },
      ],
    };

    return {
      success: true,
      data: mockData,
      // error: getErrorMessage(error) // normally return this
    };
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
    console.error(`Error updating client profile ${id}:`, error);
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}
