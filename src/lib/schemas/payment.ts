import { z } from "zod";
import { PaymentMethod } from "@/types/payment";

export const createPaymentSchema = z.object({
  amount: z
    .number({ error: "Amount is required" })
    .positive("Amount must be greater than 0"),
  loan_id: z.uuid("Invalid loan ID"),
  payment_method: z.enum(
    [PaymentMethod.Cash, PaymentMethod.Transfer, PaymentMethod.Other],
    {
      error: "Please select a valid payment method",
    },
  ),
  note: z.string().max(500, "Note is too long").optional(),
  payment_date: z.date().optional(),
});

export type CreatePaymentFormValues = z.infer<typeof createPaymentSchema>;
