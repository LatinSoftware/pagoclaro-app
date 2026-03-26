export type ClientStatus = "active" | "inactive";
export type Gender = "male" | "female" | "other" | "prefer_not_to_say";
export type MaritalStatus =
  | "single"
  | "married"
  | "union"
  | "divorced"
  | "widowed";
export type IncomeSource =
  | "employed"
  | "independent"
  | "business_owner"
  | "informal"
  | "other";

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
  lastPaymentDate?: string;
  // Contact
  email?: string | null;
  secondary_phone?: string | null;
  // Personal
  birth_date?: string | null;
  gender?: Gender | null;
  marital_status?: MaritalStatus | null;
  // Financial
  occupation?: string | null;
  company_name?: string | null;
  monthly_income?: number | null;
  income_source?: IncomeSource | null;
  // Reference
  reference_name?: string | null;
  reference_phone?: string | null;
  reference_relationship?: string | null;
  // Internal metadata
  notes?: string | null;
  is_blacklisted?: boolean;
  blacklist_reason?: string | null;
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
