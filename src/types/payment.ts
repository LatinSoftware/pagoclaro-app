import { InstallmentStatus, Status as LoanStatus } from "./loan";

export interface PaymentRequest {
  /**
   * Payment amount. Must be greater than 0.
   */
  amount: number;
  /**
   * Loan identifier where the payment will be applied.
   */
  loan_id: string;
  /**
   * Optional note for the payment.
   */
  note?: string;
  /**
   * Payment effective date. Defaults to today if omitted.
   */
  payment_date?: Date;
  /**
   * Payment method used by the client.
   */
  payment_method: PaymentMethod;
}

export enum PaymentMethod {
  Cash = "cash",
  Other = "other",
  Transfer = "transfer",
}

export interface PaymentResponse {
  allocations: PaymentAllocation[];
  loan_remaining_balance_after: number;
  loan_status_after: LoanStatus;
  payment: Payment;
}

export interface PaymentAllocation {
  /**
   * Amount from the payment applied to this installment.
   */
  amount_applied: number;
  /**
   * Identifier of the installment that received this allocation.
   */
  installment_id: string;
  /**
   * Installment sequence number within the loan (starting at 1).
   */
  installment_number: number;
  /**
   * Installment status after applying this allocation.
   */
  installment_status_after: InstallmentStatus;
}

export interface Payment {
  /**
   * Total payment amount submitted by the user.
   */
  amount: number;
  /**
   * Timestamp when the payment was created.
   */
  created_at: Date;
  /**
   * User who registered the payment.
   */
  created_by?: string;
  /**
   * Unique identifier of the payment.
   */
  id: string;
  /**
   * Loan identifier associated with this payment.
   */
  loan_id: string;
  /**
   * Optional note.
   */
  note?: null | string;
  /**
   * Payment effective date.
   */
  payment_date: Date;
  /**
   * Payment method used.
   */
  payment_method: PaymentMethod;
  /**
   * status
   */
  status: PaymentStatus;
  /**
   * Tenant identifier owning this payment.
   */
  tenant_id: string;
  updated_at?: null | string;
  updated_by?: null | string;
  /**
   * Reason for voiding the payment (only when status=voided).
   */
  void_reason?: null | string;
}

export enum PaymentStatus {
  Posted = "posted",
  Voided = "voided",
}
