import { z } from "zod";
import { Frequency, Method } from "@/types/loan";

export const editLoanSchema = z.object({
  client_id: z.string().min(1, "Client ID is required").optional(),
  capital: z
    .number({ error: "Capital is required" })
    .min(0, "Capital must be 0 or greater")
    .optional(),
  interest_rate: z
    .number({ error: "Interest rate is required" })
    .min(0, "Interest rate must be 0% or greater")
    .max(100, "Interest rate cannot exceed 100%")
    .optional(),
  term: z
    .number({ error: "Term is required" })
    .int("Term must be a whole number")
    .min(1, "Term must be at least 1")
    .optional(),
  frequency: z
    .enum(Frequency, {
      error: "Select a payment frequency",
    })
    .optional(),
  method: z
    .enum(Method, {
      error: "Select a calculation method",
    })
    .optional(),
  disbursement_date: z
    .string()
    .min(1, "Disbursement date is required")
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Must be a valid date (YYYY-MM-DD)",
    )
    .optional(),
  notes: z.string().optional(),
});

export type EditLoanFormValues = z.infer<typeof editLoanSchema>;
