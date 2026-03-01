export type ClientStatus = "active" | "inactive";

export interface Client {
  id: string;
  name: string;
  phone: string;
  cedula: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  status: ClientStatus;
  photoUrl: string | null;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  // Financial info (suggested by design)
  totalRevenue?: number;
  outstandingBalance?: number;
  lastPaymentDate?: string;
  email?: string;
  memberSince?: string;
  accountManager?: string;
  creditLimit?: number;
}

export type FinancialStatus = "AL_DIA" | "PARCIAL" | "EN_MORA";

export interface Loan {
  id: string;
  initialCapital: number;
  currentBalance: number;
  status: "ACTIVE" | "PAID" | "DEFAULT";
  nextInstallmentDate?: string;
  nextInstallmentAmount?: number;
}

export interface ClientTimelineEvent {
  id: string;
  type: "PAYMENT" | "LOAN_CREATED" | "LATE_PAYMENT" | "OTHER";
  description: string;
  date: string;
}

export interface ClientProfile extends Client {
  financialStatus: FinancialStatus;
  pendingBalance: number;
  nextInstallmentDate?: string;
  nextInstallmentAmount?: number;
  loans: Loan[];
  events: ClientTimelineEvent[];
  riskScore?: "Low" | "Medium" | "High";
  punctuality?: number;
}

export interface ClientListResponse {
  data: Client[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ClientFilters {
  search?: string;
  status?: ClientStatus;
  limit?: number;
  page?: number;
}
