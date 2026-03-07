import { PaginationMeta } from "./pagination";
export type { PaginationMeta };

export interface LoanRequest {
  search?: string;
  date_from?: string;
  date_to?: string;
  limit?: string;
  page?: string;
  status?: string;
  client_id?: string;
}

export interface LoanResponse {
  data: Loan[];
  meta: PaginationMeta;
}

export interface LoanDetailResponse extends Loan {
  client: Client;
  installments: LoanInstallment[];
}

export interface Loan {
  id: string;
  capital: number;
  client_id: string;
  client: Client;
  created_at: string;
  created_by?: string;
  deleted_at?: string | null;
  disbursement_date: string;
  frequency: Frequency;
  interest_rate: number;
  method: Method;
  notes?: null | string;
  outstanding_balance: number;
  status: Status;
  tenant_id: string;
  term: number;
  total_amount: number;
  total_paid: number;
  updated_at: string;
  updated_by?: string;
  disbursed_at?: string;
  disbursed_by?: string;
}

export interface Client {
  address?: string;
  cedula?: string;
  id: string;
  name: string;
  phone: string;
  status: ClientStatus;
}

export enum ClientStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum Frequency {
  Biweekly = "biweekly",
  Daily = "daily",
  Monthly = "monthly",
  Weekly = "weekly",
}

export interface LoanInstallment {
  amount_paid: number;
  capital_amount: number;
  created_at: string;
  due_date: string;
  id: string;
  installment_number: number;
  interest_amount: number;
  loan_id: string;
  paid_at?: string | null;
  status: InstallmentStatus;
  tenant_id: string;
  total_due: number;
  updated_at: string;
}

export enum InstallmentStatus {
  Overdue = "overdue",
  Paid = "paid",
  Partial = "partial",
  Pending = "pending",
}

export enum Method {
  French = "french",
  InterestOnly = "interest_only",
  Simple = "simple",
}

export enum Status {
  Active = "active",
  Cancelled = "cancelled",
  Defaulted = "defaulted",
  Draft = "draft",
  PaidOff = "paid_off",
}

/** Request body for POST /loans */
export interface CreateLoanRequest {
  capital: number;
  client_id: string;
  disbursement_date: string;
  frequency: Frequency;
  interest_rate: number; // decimal (0.05 = 5%)
  method: Method;
  notes?: string;
  term: number;
}

/** Response from POST /loans */
export interface CreateLoanResponse {
  id: string;
  capital: number;
  client_id: string;
  created_at: string;
  created_by?: string;
  deleted_at?: string | null;
  disbursed_at?: string | null;
  disbursed_by?: string | null;
  disbursement_date: string;
  frequency: Frequency;
  interest_rate: number;
  method: Method;
  notes?: string | null;
  outstanding_balance: number;
  status: Status;
  tenant_id: string;
  term: number;
  total_amount: number;
  total_paid: number;
  updated_at: string;
  updated_by?: string;
}
