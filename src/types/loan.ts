export interface LoanRequest {
  client_id?: string;
  date_from?: Date;
  date_to?: Date;
  limit?: string;
  page?: string;
  status?: string;
  [property: string]: unknown;
}

export interface LoanResponse {
  data: Loan[];
  meta: PaginationMeta;
  [property: string]: unknown;
}

export interface Loan {
  capital: number;
  client_id: string;
  created_at: string;
  created_by?: string;
  deleted_at?: string | null;
  disbursed_at?: string | null;
  disbursed_by?: null | string;
  disbursement_date: string;
  frequency: Frequency;
  id: string;
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
  [property: string]: unknown;
}

export enum Frequency {
  Biweekly = "biweekly",
  Daily = "daily",
  Monthly = "monthly",
  Weekly = "weekly",
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

export interface PaginationMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
  [property: string]: unknown;
}
