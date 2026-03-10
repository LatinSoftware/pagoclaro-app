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
  pendingBalance?: number;
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

  events: ClientTimelineEvent[];
  riskScore?: "Low" | "Medium" | "High" | "CRITICAL";
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
