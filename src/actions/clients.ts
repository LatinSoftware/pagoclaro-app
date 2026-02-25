"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "@/lib/error-handler";

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
